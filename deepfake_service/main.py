from fastapi import FastAPI, File, UploadFile
from PIL import Image
from transformers import AutoImageProcessor, AutoModelForImageClassification
import torch
import io

# Initialize FastAPI
app = FastAPI()

# Load processor and model
processor = AutoImageProcessor.from_pretrained("dima806/deepfake_vs_real_image_detection")
model = AutoModelForImageClassification.from_pretrained("dima806/deepfake_vs_real_image_detection")

@app.get("/ping")
def ping():
    return {"message": "Deepfake detection service is running with dima806 model!"}

@app.post("/predict-image")
async def predict_image(image: UploadFile = File(...)):
    try:
        # Read image bytes
        image_data = await image.read()
        image_bytes = io.BytesIO(image_data)

        # Open with PIL and convert to RGB
        pil_image = Image.open(image_bytes).convert("RGB")

        # Preprocess the image
        inputs = processor(images=pil_image, return_tensors="pt")

        # Perform inference
        with torch.no_grad():
            outputs = model(**inputs)
            logits = outputs.logits
            probabilities = torch.nn.functional.softmax(logits, dim=1)[0]

        # Map class labels
        class_names = model.config.id2label
        result = {class_names[i]: float(probabilities[i]) for i in range(len(probabilities))}

        # Debug
        print("Model result:", result)

        return {"result": result}

    except Exception as e:
        return {"error": str(e)}

# For local testing
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)