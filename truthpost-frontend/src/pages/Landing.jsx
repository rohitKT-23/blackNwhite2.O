import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Animated background elements with images */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 rounded-full blur-3xl opacity-50 -top-48 -left-48 animate-float overflow-hidden">
          <img 
            src="https://source.unsplash.com/random/800x800?tech" 
            alt="background" 
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="absolute w-96 h-96 rounded-full blur-3xl opacity-50 -bottom-48 -right-48 animate-float-delayed overflow-hidden">
          <img 
            src="https://source.unsplash.com/random/800x800?data" 
            alt="background" 
            className="w-full h-full object-cover opacity-50"
          />
        </div>
      </div>

      <div className="relative z-10 text-center max-w-4xl space-y-8 animate-fadeIn">
        <h1 className="text-7xl md:text-8xl font-bold bg-gradient-to-r from-gray-100 via-gray-300 to-gray-500 bg-clip-text text-transparent">
          BLACKNWHITE
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-8">
          {/* Feature Cards */}
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700 hover:border-gray-500 transition-all">
            <h3 className="text-xl font-semibold text-gray-200 mb-4">AI-Powered Verification</h3>
            <p className="text-gray-400">Advanced algorithms analyze content for authenticity, ensuring every piece of information maintains absolute integrity.</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700 hover:border-gray-500 transition-all">
            <h3 className="text-xl font-semibold text-gray-200 mb-4">Dual-Analysis System</h3>
            <p className="text-gray-400">Comprehensive examination of both text and media content, providing transparent credibility scores for complete transparency.</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700 hover:border-gray-500 transition-all">
            <h3 className="text-xl font-semibold text-gray-200 mb-4">Factual Community</h3>
            <p className="text-gray-400">Join a network committed to precision, combating information overload with curated, verified content in its purest form.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 justify-center mt-12">
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Login
          </button>
          
          <button
            onClick={() => navigate('/Register')}
            className="px-8 py-3 border-2 border-gray-600 text-gray-300 rounded-full font-semibold hover:border-gray-400 hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            Sign Up
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 8s ease-in-out infinite 2s;
        }
      `}</style>
    </div>
  );
}

export default Landing;