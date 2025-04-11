# Use a lightweight base Python image
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# System dependencies for OpenCV, dlib, face-recognition etc.
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    g++ \
    git \
    curl \
    libglib2.0-0 \
    libgl1-mesa-glx \
    libsm6 \
    libxext6 \
    libxrender-dev \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Copy the requirements first to utilize Docker cache
COPY requirements.txt .

# Upgrade pip and install dependencies
RUN pip install --upgrade pip --no-cache-dir && \
    pip install --default-timeout=1000 --no-cache-dir -r requirements.txt uvicorn

# Copy rest of the app
COPY . .

# Expose app port
EXPOSE 8000

# Default command
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

