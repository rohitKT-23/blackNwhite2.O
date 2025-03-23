import { useEffect, useState } from 'react';
import axios from 'axios';

function News() {
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

  const approvedArticles = articles.filter(article => article.status === 'approved');

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Latest News
        </h1>
        
        {approvedArticles.length === 0 ? (
          <p className="text-center text-gray-400">No approved articles available</p>
        ) : (
          <div className="space-y-6">
            {approvedArticles.map((article) => (
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

                  <div className="pt-4 border-t border-gray-700">
                    <span className="text-sm font-semibold text-green-400">
                      Verified Status: {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                    </span>
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

export default News;