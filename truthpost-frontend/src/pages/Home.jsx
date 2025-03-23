import { useState } from 'react';
import axios from 'axios';

function Home() {
  const [formData, setFormData] = useState({ title: '', content: '', media: null });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, media: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('content', formData.content);
    if (formData.media) formDataToSend.append('media', formData.media);
  
    try {
      const res = await axios.post('/api/articles', formDataToSend);
      console.log("Backend Response:", res.data); // Log backend response
      setResult({
        text: res.data.textAnalysis,
        media: res.data.mediaAnalysis,
        finalStatus: res.data.finalStatus,
      });
    } catch (error) {
      console.error(error);
      alert('Submission failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          News Submission
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Article Title"
              onChange={handleChange}
              className="w-full p-4 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300 placeholder-gray-400"
            />
            
            <textarea
              name="content"
              placeholder="News Content"
              rows="5"
              onChange={handleChange}
              className="w-full p-4 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-300 placeholder-gray-400"
            ></textarea>
            
            <div className="space-y-2">
              <label className="block">
                <span className="sr-only">Choose media file</span>
                <input
                  type="file"
                  name="media"
                  accept="image/*,video/mp4"
                  onChange={handleFileChange}
                  className="w-full text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-700 file:text-white hover:file:bg-gray-600 transition-colors duration-300"
                />
              </label>
              <p className="text-sm text-gray-400">Supported formats: JPG, PNG, MP4</p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transform transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Submit for Review
          </button>
        </form>

        {result && (
  <div className="mt-8 p-6 bg-gray-800 rounded-lg border border-gray-700 animate-fadeIn">
    <h2 className="text-xl font-semibold mb-4 text-blue-400">Analysis Results</h2>
    
    <div className="space-y-3 text-gray-300">
      <div className="flex items-center space-x-3">
        <span className="text-2xl">📄</span>
        <div>
          <p className="font-medium">Text Analysis:</p>
          <p>
            {result.text?.label ? 
              `${result.text.label} (${(result.text.confidence * 100).toFixed(2)}% confidence)` : 
              'Not scanned'}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <span className="text-2xl">🖼</span>
        <div>
          <p className="font-medium">Media Analysis:</p>
          <p>
            {result.media?.label ? 
              `${result.media.label} (${(result.media.confidence * 100).toFixed(2)}% confidence)` : 
              'No Media'}
          </p>
        </div>
      </div>
    </div>

    <div className={`mt-6 pt-4 border-t ${result.finalStatus === 'approved' ? 'border-green-800' : 'border-red-800'}`}>
      <p className={`text-lg font-bold ${result.finalStatus === 'approved' ? 'text-green-400' : 'text-red-400'}`}>
        {result.finalStatus === 'approved' ? '✅ Approved' : '❌ Rejected'}
      </p>
    </div>
  </div>
)}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Home;
