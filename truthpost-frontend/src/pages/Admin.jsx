import { useEffect, useState } from 'react';
import axios from 'axios';

function Admin() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('/api/articles');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    fetchArticles();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`/api/articles/${id}`, { status });
      setArticles((prevArticles) =>
        prevArticles.map((article) =>
          article._id === id ? { ...article, status } : article
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Article Review Panel
        </h1>
        
        {articles.length === 0 ? (
          <p className="text-center text-gray-400">No articles awaiting review</p>
        ) : (
          <div className="space-y-6">
            {articles.map((article) => (
              <div 
                key={article._id}
                className="p-6 bg-gray-800 rounded-xl border border-gray-700 shadow-xl transition-all duration-300 hover:border-gray-600 animate-fadeIn"
              >
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-blue-300">{article.title}</h2>
                  
                  <p className="text-gray-300 leading-relaxed">{article.content}</p>
                  
                  {article.mediaUrl && (
                    <div className="mt-4 overflow-hidden rounded-lg border border-gray-700">
                      {article.mediaUrl.endsWith(".mp4") ? (
                        <video 
                          controls 
                          className="w-full aspect-video object-cover"
                        >
                          <source src={article.mediaUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <img
                          src={article.mediaUrl}
                          alt="News content"
                          className="w-full max-h-96 object-cover"
                        />
                      )}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-700">
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-semibold ${
                        article.status === 'approved' ? 'text-green-400' : 
                        article.status === 'rejected' ? 'text-red-400' : 'text-yellow-400'
                      }`}>
                        {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                      </span>
                    </div>

                    {article.status === 'pending' && (
                      <div className="flex space-x-3">
                        <button
                          onClick={() => updateStatus(article._id, 'approved')}
                          className="px-5 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateStatus(article._id, 'rejected')}
                          className="px-5 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg font-medium hover:from-red-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Admin;