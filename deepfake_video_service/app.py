import os
import tempfile
import shutil
import torch
from fastapi import FastAPI, File, UploadFile, HTTPException, Form, Query
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from huggingface_hub import hf_hub_download
import cv2
from PIL import Image
import numpy as np
import time
import sys
import json
import pandas as pd
from datetime import datetime
from typing import Optional, List
import uvicorn
from pydantic import BaseModel

# Add a custom path for model imports
if "model" not in sys.path:
    sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import your prediction functions
from model.pred_func import (
    load_genconvit,
    df_face,
    pred_vid,
    real_or_fake,
    set_result,
    store_result
)
from model.config import load_config

app = FastAPI(
    title="Deepfake Detection with GenConViT",
    description="API for detecting deepfakes using GenConViT model",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create a logs list to store processing logs
logs = []

def add_log(message):
    """Add a log entry with timestamp"""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    logs.append(f"[{timestamp}] {message}")
    return f"[{timestamp}] {message}"

# Models dictionary to cache loaded models
models_cache = {}

class PredictionResult(BaseModel):
    prediction: str
    confidence: float
    processing_time: float
    model_type: str
    frames_analyzed: int
    logs: List[str]
    
class ModelInfo(BaseModel):
    model_type: str = "both"

def load_model_from_huggingface(model_type="both"):
    """Load the model weights from Hugging Face Hub based on selection"""
    # Check if model already loaded in cache
    if model_type in models_cache:
        return models_cache[model_type]
    
    config = load_config()
    add_log("Starting model weights download from Hugging Face Hub")
    
    os.makedirs("weight", exist_ok=True)
    
    add_log("Downloading model weights from Hugging Face Hub...")
    ed_path = hf_hub_download(
        repo_id="Deressa/GenConViT",
        filename="genconvit_ed_inference.pth",
    )
    vae_path = hf_hub_download(
        repo_id="Deressa/GenConViT",
        filename="genconvit_vae_inference.pth",
    )
    
    shutil.copy(ed_path, "weight/genconvit_ed_inference.pth")
    shutil.copy(vae_path, "weight/genconvit_vae_inference.pth")
    add_log("Model weights downloaded successfully")

    add_log("Loading model...")
    if model_type == "ed":
        model = load_genconvit(
            config,
            "genconvit",
            "genconvit_ed_inference",
            None,
            fp16=False
        )
        add_log("Loaded ED Model only")
    elif model_type == "vae":
        model = load_genconvit(
            config,
            "genconvit",
            None,
            "genconvit_vae_inference",
            fp16=False
        )
        add_log("Loaded VAE Model only")
    else:
        model = load_genconvit(
            config,
            "genconvit",
            "genconvit_ed_inference",
            "genconvit_vae_inference",
            fp16=False
        )
        add_log("Loaded both ED and VAE Models")

    # Cache the model
    models_cache[model_type] = (model, config)
    return model, config

def is_video(file_path):
    """Check if a file is a valid video file"""
    try:
        cap = cv2.VideoCapture(file_path)
        if not cap.isOpened():
            return False
        ret, frame = cap.read()
        cap.release()
        return ret
    except:
        return False

def extract_faces_from_frames(video_path, num_frames=15):
    """Extract faces from video frames"""
    cap = cv2.VideoCapture(video_path)
    
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    frames_to_extract = min(num_frames, total_frames)
    interval = max(1, total_frames // frames_to_extract)
    
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    face_frames = []
    
    for i in range(0, total_frames, interval):
        if len(face_frames) >= frames_to_extract:
            break
            
        cap.set(cv2.CAP_PROP_POS_FRAMES, i)
        ret, frame = cap.read()
        if not ret:
            continue
            
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, 1.1, 4)
        
        if len(faces) > 0:
            face_frames.append(frame)
    
    cap.release()
    return face_frames[:frames_to_extract]

def process_video(video_file_path, model, config, num_frames=30):
    """Process a video file and return prediction"""
    start_time = time.time()
    try:
        add_log(f"Processing video")
        add_log("Extracting faces from frames")
            
        df = df_face(video_file_path, num_frames, "genconvit")
        add_log(f"Extracted {len(df)} face frames")

        if len(df) >= 1:
            add_log("Preprocessing frames...")
            add_log("Analyzing with GenConViT...")

            y, y_val = pred_vid(df, model)
            prediction = real_or_fake(y)
            confidence = float(y_val)
            add_log(f"Prediction: {prediction} with confidence {confidence:.4f}")
        else:
            prediction = "Unable to detect faces"
            confidence = 0.0
            add_log("No faces detected in video")

        processing_time = time.time() - start_time
        add_log(f"Processing completed in {processing_time:.2f} seconds")
        return prediction, confidence, df, processing_time

    except Exception as e:
        add_log(f"Error processing video: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing video: {str(e)}")

@app.get("/")
async def root():
    return {"message": "GenConViT Deepfake Detection API"}

@app.get("/info")
async def info():
    return {
        "app": "GenConViT Deepfake Detection API",
        "version": "1.0.0",
        "description": "API for detecting deepfakes using GenConViT model",
        "author": "Safal Immanuel Sabari",
        "endpoints": [
            {"path": "/", "method": "GET", "description": "API root"},
            {"path": "/info", "method": "GET", "description": "API information"},
            {"path": "/detect", "method": "POST", "description": "Detect deepfakes in a video"},
            {"path": "/load_model", "method": "POST", "description": "Load a specific model type"}
        ]
    }

@app.post("/load_model")
async def load_model_endpoint(model_info: ModelInfo):
    """Endpoint to preload a specific model"""
    model_type = model_info.model_type
    if model_type not in ["both", "ed", "vae"]:
        raise HTTPException(status_code=400, detail="Invalid model type. Choose from 'both', 'ed', or 'vae'")
    
    try:
        model, config = load_model_from_huggingface(model_type=model_type)
        return {"status": "success", "message": f"Model {model_type} loaded successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load model: {str(e)}")

@app.post("/detect", response_model=PredictionResult)
async def detect_deepfake(
    file: UploadFile = File(...),
    model_type: str = Form("both"),  # Set default model type to "both"
    num_frames: int = Form(30)       # Set default number of frames to 30
):
    """Detect if a video contains deepfakes"""
    # Clear previous logs
    global logs
    logs = []
    
    # Validate model type
    if model_type not in ["both", "ed", "vae"]:
        raise HTTPException(status_code=400, detail="Invalid model type. Choose from 'both', 'ed', or 'vae'")
    
    # Validate num_frames
    if num_frames < 1:
        raise HTTPException(status_code=400, detail="Number of frames must be at least 1")
    
    # Ensure the file is a video
    if not file.filename.lower().endswith(('.mp4', '.avi', '.mov', '.wmv')):
        raise HTTPException(status_code=400, detail="Uploaded file must be a video (mp4, avi, mov, or wmv)")
    
    # Create a temporary file to store the uploaded video
    with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[1]) as tmp_file:
        tmp_file_path = tmp_file.name
        # Write the uploaded file to the temporary file
        content = await file.read()
        tmp_file.write(content)
    
    try:
        # Check if it's a valid video file
        if not is_video(tmp_file_path):
            os.unlink(tmp_file_path)
            raise HTTPException(status_code=400, detail="The uploaded file is not a valid video")
        
        # Load model
        add_log(f"Loading {model_type} model...")
        model, config = load_model_from_huggingface(model_type=model_type)
        
        # Process the video
        prediction, confidence, df, processing_time = process_video(
            tmp_file_path, model, config, num_frames
        )
        
        # Remove the temporary file
        os.unlink(tmp_file_path)
        add_log("Temporary video file removed")
        
        # Return results
        return PredictionResult(
            prediction=prediction,
            confidence=float(confidence),
            processing_time=processing_time,
            model_type=model_type,
            frames_analyzed=num_frames,
            logs=logs
        )
    
    except Exception as e:
        # Ensure temporary file is deleted in case of error
        if os.path.exists(tmp_file_path):
            os.unlink(tmp_file_path)
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/logs")
async def get_logs():
    """Get the processing logs"""
    return {"logs": logs}

# Mount static files for the frontend if needed
# app.mount("/static", StaticFiles(directory="static"), name="static")

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8003, reload=True)