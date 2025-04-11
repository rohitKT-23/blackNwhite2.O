import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 md:p-8">
      {/* Main content container with proper spacing */}
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center py-8">
        {/* Logo */}
        <div className="mt-6 mb-6">
  <div className="bg-white rounded-full p-3 shadow-md">
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L4 5V11C4 16.52 7.82 21.74 12 23C16.18 21.74 20 16.52 20 11V5L12 2Z" fill="#000000"/>
    </svg>
  </div>
</div>

        
        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 text-center">
          Real-Time Deepfakes Detection
        </h1>
        
        {/* Subtitle */}
        <p className="text-gray-400 text-center max-w-2xl mb-12">
          The ultimate platform for content verification and fact-checking in a world of information overload
        </p>
        
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mb-12">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="bg-blue-600 rounded-lg p-2 w-10 h-10 flex items-center justify-center mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">AI-Powered Verification</h3>
            <p className="text-gray-400">Advanced algorithms analyze content for authenticity, ensuring every piece of information maintains absolute integrity.</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="bg-purple-600 rounded-lg p-2 w-10 h-10 flex items-center justify-center mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 3H15M3 9V15M9 21H15M21 9V15M12 12C12.5523 12 13 11.5523 13 11C13 10.4477 12.5523 10 12 10C11.4477 10 11 10.4477 11 11C11 11.5523 11.4477 12 12 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Dual-Analysis System</h3>
            <p className="text-gray-400">Comprehensive examination of both text and media content, providing transparent credibility scores for complete transparency.</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="bg-cyan-600 rounded-lg p-2 w-10 h-10 flex items-center justify-center mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 20C18 16.6863 15.3137 14 12 14C8.68629 14 6 16.6863 6 20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Factual Community</h3>
            <p className="text-gray-400">Join a network committed to precision, combating information overload with curated, verified content in its purest form.</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold flex items-center justify-center"
          >
            <span>Login</span>
            <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 5L20 12L13 19M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <button
            onClick={() => navigate('/Register')}
            className="px-8 py-3 bg-transparent border border-gray-600 text-gray-300 rounded-full font-semibold"
          >
            Sign Up
          </button>
        </div>
        
        {/* Testimonial */}
        <div className="w-full max-w-3xl text-center">
          <div className="flex items-center justify-center mb-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-400 ml-2">Trusted by 10,000+ users</span>
          </div>
          <p className="text-gray-400 italic">
            "BLACK-N-WHITE has transformed how we verify information in our newsroom. It's an essential tool for any organization committed to factual accuracy."
          </p>
        </div>
      </div>
      
      {/* Footer */}
      <div className="text-gray-600 text-sm mt-4">
        © 2025 BLACK-N-WHITE
      </div>
    </div>
  );
}

export default Landing;