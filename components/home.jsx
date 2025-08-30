import React, { useState } from 'react';
import { ChevronRight, MessageSquare, Users, Zap, Shield, Clock, Send, Star, MapPin, Bot } from 'lucide-react';

function App() {
  const [issue, setIssue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState('');

  const handleSubmitIssue = async (e) => {
    e.preventDefault();
    if (!issue.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate AI response with realistic delay
    setTimeout(() => {
      const responses = [
        "Thank you for bringing this to my attention. I've reviewed the infrastructure data and will coordinate with the public works department to address the pothole on Main Street within 48 hours. I've also allocated emergency funds for temporary road safety measures.",
        "I understand your concern about the park lighting. I've already initiated a safety audit and will have LED lighting installed by next week. In the meantime, I've increased patrol frequency in that area.",
        "Your waste management suggestion is excellent. I'm implementing a new smart collection schedule that will optimize routes and reduce missed pickups by 75%. The pilot program starts this Monday.",
        "I've analyzed traffic patterns and agree this intersection needs attention. I'm fast-tracking the installation of smart traffic signals and pedestrian safety features. Construction begins next month."
      ];
      
      setResponse(responses[Math.floor(Math.random() * responses.length)]);
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">AI Mayor</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#demo" className="text-gray-300 hover:text-white transition-colors">Demo</a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-all duration-300 hover:scale-105">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Meet Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                AI Mayor
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Revolutionary AI-powered local governance that responds to citizen concerns instantly, 
              analyzes city data in real-time, and provides transparent, efficient solutions.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-xl">
              Try Demo Below
              <ChevronRight className="inline ml-2 h-5 w-5" />
            </button>
            <button className="border-2 border-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300">
              Watch Video
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-gray-300">Always Available</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-purple-400 mb-2">&lt;2min</div>
              <div className="text-gray-300">Average Response</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="text-3xl font-bold text-green-400 mb-2">98%</div>
              <div className="text-gray-300">Issue Resolution</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Smart Governance, Real Solutions
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our AI Mayor combines advanced language processing with real-time city data 
              to provide intelligent, actionable responses to every citizen concern.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
              <MessageSquare className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-4">Instant Responses</h3>
              <p className="text-gray-300">Get immediate, intelligent responses to any local issue or concern, powered by advanced AI understanding.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
              <Zap className="h-12 w-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-4">Real-Time Data</h3>
              <p className="text-gray-300">Analyzes live city infrastructure, budget, and resource data to provide accurate, feasible solutions.</p>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
              <Users className="h-12 w-12 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-4">Community-Focused</h3>
              <p className="text-gray-300">Prioritizes citizen welfare and community needs in every decision and recommendation.</p>
            </div>

            <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
              <Shield className="h-12 w-12 text-orange-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-4">Transparent</h3>
              <p className="text-gray-300">Every decision includes clear reasoning, budget implications, and timeline for implementation.</p>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
              <Clock className="h-12 w-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-4">24/7 Availability</h3>
              <p className="text-gray-300">Never wait for office hours. Your AI Mayor is always ready to address urgent concerns.</p>
            </div>

            <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
              <MapPin className="h-12 w-12 text-pink-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-4">Location-Aware</h3>
              <p className="text-gray-300">Understands local context, regulations, and resources specific to your municipality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Try It Now
            </h2>
            <p className="text-xl text-gray-300">
              Submit any local issue and watch your AI Mayor respond with actionable solutions
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <form onSubmit={handleSubmitIssue} className="mb-6">
              <div className="mb-4">
                <label htmlFor="issue" className="block text-lg font-medium text-white mb-3">
                  What issue would you like the AI Mayor to address?
                </label>
                <textarea
                  id="issue"
                  value={issue}
                  onChange={(e) => setIssue(e.target.value)}
                  className="w-full h-32 px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
                  placeholder="e.g., There's a large pothole on Main Street that's causing traffic issues and could damage vehicles..."
                />
              </div>
              <button
                type="submit"
                disabled={!issue.trim() || isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white px-6 py-4 rounded-xl text-lg font-semibold transition-all duration-300 hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    AI Mayor is thinking...
                  </>
                ) : (
                  <>
                    Submit to AI Mayor
                    <Send className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </form>

            {response && (
              <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-lg rounded-2xl p-6 border border-green-400/30 animate-fade-in">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-3">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white mb-2">AI Mayor Response:</h4>
                    <p className="text-gray-200 leading-relaxed">{response}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-20 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Simple, transparent, and effective governance powered by artificial intelligence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Submit Your Issue</h3>
              <p className="text-gray-300">Describe any local concern, from infrastructure to public services, in natural language.</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">AI Analysis</h3>
              <p className="text-gray-300">Our AI Mayor analyzes your concern against real city data, budgets, and resources.</p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-pink-500 to-orange-500 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Get Solutions</h3>
              <p className="text-gray-300">Receive detailed, actionable responses with timelines, budgets, and implementation plans.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials/Examples */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Real Issues, Real Solutions
            </h2>
            <p className="text-xl text-gray-300">
              See how our AI Mayor has helped communities solve everyday problems
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-300 mb-4 italic">
                "I reported a broken streetlight and got an immediate response with a repair timeline. 
                The light was fixed within 24 hours, exactly as promised."
              </p>
              <div className="text-white font-semibold">Sarah Chen</div>
              <div className="text-gray-400 text-sm">Downtown Resident</div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-300 mb-4 italic">
                "The AI Mayor helped coordinate snow removal for our neighborhood and even suggested 
                alternative routes during the cleanup. Impressive problem-solving!"
              </p>
              <div className="text-white font-semibold">Michael Rodriguez</div>
              <div className="text-gray-400 text-sm">Suburban District</div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-300 mb-4 italic">
                "Asked about park maintenance and received a comprehensive plan with budget breakdown 
                and community input opportunities. Finally, transparent governance!"
              </p>
              <div className="text-white font-semibold">Jennifer Wu</div>
              <div className="text-gray-400 text-sm">Parks Committee</div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-300 mb-4 italic">
                "The AI Mayor identified traffic pattern improvements that reduced congestion by 30%. 
                Data-driven solutions that actually work!"
              </p>
              <div className="text-white font-semibold">David Thompson</div>
              <div className="text-gray-400 text-sm">Business Owner</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="px-6 py-20 bg-gradient-to-r from-blue-600/20 to-purple-600/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your City?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the future of local governance. Implement AI Mayor in your municipality 
            and provide citizens with the responsive, intelligent service they deserve.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-xl">
              Schedule Demo
            </button>
            <button className="border-2 border-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300">
              Learn More
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-400 mb-2">Enterprise Ready</div>
              <div className="text-gray-300">Secure, scalable, compliant</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400 mb-2">Easy Integration</div>
              <div className="text-gray-300">Deploy in days, not months</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400 mb-2">Proven Results</div>
              <div className="text-gray-300">Used by forward-thinking cities</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Bot className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">AI Mayor</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-400">
            <p>&copy; 2025 AI Mayor. Revolutionizing local governance through artificial intelligence.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;