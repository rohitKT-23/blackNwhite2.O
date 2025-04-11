FROM python:3.10-slim

WORKDIR /app

# Install system dependencies including git (needed for installing grad-cam from GitHub)
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    ffmpeg \
    libsm6 \
    libxext6 \
    libxrender-dev \
    libgl1-mesa-glx \
    libglib2.0-0 \
    libboost-all-dev \
    python3-dev \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements.txt and install Python dependencies
COPY requirements.txt .

# Upgrade pip and install dependencies
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy the app source code
COPY . .

# Expose Streamlit port
EXPOSE 8003

# Default command to run your app
CMD ["streamlit", "run", "app.py", "--server.port=8003", "--server.address=0.0.0.0"]
