const express = require("express");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const Article = require("../models/Article");

const router = express.Router();

// Multer Storage Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in uploads/ folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

const upload = multer({ storage });

// 📝 Submit article with AI analysis
router.post("/", upload.single("media"), async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("File Info:", req.file);

    const { title, content } = req.body;
    const mediaUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const newArticle = new Article({
      title,
      content,
      mediaUrl,
      status: "pending",
      createdAt: new Date(),
    });
    await newArticle.save();

    let textResult = {};
    try {
      const textScan = await axios.post("http://localhost:8001/predict-text", { text: content });
      textResult = textScan.data;
      console.log("Text Analysis Response:", textResult); // Log text analysis response
    } catch (err) {
      console.error("Error during text scan:", err.message);
      return res.status(500).json({ error: "Error during text scan" });
    }

    let mediaResult = { label: "No Media", confidence: 0 };

    if (req.file) {
      const fileExt = req.file.originalname.split('.').pop().toLowerCase();
      const formData = new FormData();
      const fileStream = fs.createReadStream(req.file.path);

      try {
        if (["jpg", "jpeg", "png"].includes(fileExt)) {
          formData.append("image", fileStream);
          const imageScan = await axios.post("http://localhost:8002/predict-image", formData, {
            headers: { ...formData.getHeaders() },
          });
          mediaResult = {
            label: imageScan.data.label || "unknown",
            confidence: imageScan.data.confidence || 0,
          };
          console.log("Image Analysis Response:", imageScan.data); // Log image analysis response
        } else if (["mp4", "mov", "avi"].includes(fileExt)) {
          formData.append("file", fileStream);
          const videoScan = await axios.post("http://localhost:8003/detect", formData, {
            headers: { ...formData.getHeaders() },
          });
          mediaResult = {
            label: videoScan.data.deepfake_detected ? "deepfake" : "real",
            confidence: videoScan.data.confidence,
          };
          console.log("Video Analysis Response:", videoScan.data); // Log video analysis response
        }
      } catch (err) {
        console.error("Error during media scan:", err.message);
        return res.status(500).json({ error: "Error during media scan" });
      }
    }

    let status = "approved";
    const textLabel = textResult.label ? textResult.label.toLowerCase() : "unknown";
    const mediaLabel = mediaResult.label.toLowerCase();

    if (textLabel === "fake news" || mediaLabel === "deepfake") {
      status = "rejected";
    }

    newArticle.status = status;
    await newArticle.save();

    const response = {
      message: "Article submitted successfully",
      articleId: newArticle._id,
      textAnalysis: textResult,
      mediaAnalysis: mediaResult,
      finalStatus: status,
    };

    console.log("Sending response to frontend:", response); // Log final response
    res.json(response);
  } catch (error) {
    console.error("Error processing article:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 📌 Fetch all articles
router.get("/", async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔍 Trigger AI Scan (Placeholder)
router.get("/scan/:id", async (req, res) => {
  const { id } = req.params;
  res.json({ message: `Scan triggered for article ${id}` });
});

// ✅ Update article status
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const article = await Article.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
