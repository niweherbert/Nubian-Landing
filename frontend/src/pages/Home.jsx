import { useState } from 'react';
import { Mail, Globe, BookOpen, Users, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useToast } from '../hooks/use-toast';
import { mockEmailSignup } from '../utils/mock';

const Home = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      await mockEmailSignup(email);
      toast({
        title: "Success! 🎉",
        description: "You'll be notified when we launch!"
      });
      setEmail('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-emerald-50 overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="w-8 h-8 text-amber-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-emerald-600 bg-clip-text text-transparent">
                AfriLearn
              </span>
            </div>
            <Button variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50">
              Learn More
            </Button>
          </div>
        </div>
      </header>

      {/* 3D Floating Animation Elements */}
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full mb-6 animate-bounce-subtle">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Something Amazing is Coming</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Coming <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-emerald-600 bg-clip-text text-transparent">Soon</span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto">
              Unlock the beauty of African languages with our revolutionary EdTech platform
            </p>
            
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Join thousands of learners ready to explore Swahili, Yoruba, Amharic, and more through interactive lessons and cultural immersion.
            </p>
          </div>

          {/* Email Signup Form */}
          <div className="max-w-md mx-auto mb-20">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 border-2 border-gray-200 focus:border-amber-500 focus:ring-amber-500"
                />
              </div>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="h-12 px-8 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                {isLoading ? 'Joining...' : 'Notify Me'}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </form>
            <p className="text-sm text-gray-500 text-center mt-3">
              Be the first to know when we launch. No spam, ever.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="feature-card bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-amber-100 hover:border-amber-300 transition-all duration-300 hover:shadow-xl">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 transform hover:rotate-6 transition-transform duration-300">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Interactive Lessons</h3>
              <p className="text-gray-600">
                Learn through engaging, culturally-rich content designed by native speakers.
              </p>
            </div>

            <div className="feature-card bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-emerald-100 hover:border-emerald-300 transition-all duration-300 hover:shadow-xl">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center mb-4 transform hover:rotate-6 transition-transform duration-300">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cultural Immersion</h3>
              <p className="text-gray-600">
                Experience the richness of African cultures while mastering the language.
              </p>
            </div>

            <div className="feature-card bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-orange-100 hover:border-orange-300 transition-all duration-300 hover:shadow-xl">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4 transform hover:rotate-6 transition-transform duration-300">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Community Learning</h3>
              <p className="text-gray-600">
                Connect with fellow learners and native speakers from across the continent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Globe className="w-6 h-6 text-amber-500" />
              <span className="text-xl font-bold">AfriLearn</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 AfriLearn. Empowering Africa through language education.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;