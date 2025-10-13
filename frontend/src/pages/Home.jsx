import { useState } from 'react';
import { Mail, Globe, BookOpen, Users, ArrowRight, Sparkles, Gamepad2, Clock, MessageSquare, MapPin, Trophy, Book, Languages } from 'lucide-react';
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
        title: "Welcome to AfriLearn!",
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

  const languages = [
    { name: 'Swahili', speakers: '200M+', region: 'East Africa' },
    { name: 'Yoruba', speakers: '50M+', region: 'West Africa' },
    { name: 'Amharic', speakers: '57M+', region: 'Ethiopia' },
    { name: 'Hausa', speakers: '85M+', region: 'West Africa' },
    { name: 'Zulu', speakers: '28M+', region: 'South Africa' },
    { name: 'Igbo', speakers: '45M+', region: 'Nigeria' },
    { name: 'Shona', speakers: '15M+', region: 'Zimbabwe' },
    { name: 'Somali', speakers: '21M+', region: 'Horn of Africa' },
    { name: 'Tigrinya', speakers: '9M+', region: 'Eritrea/Ethiopia' },
    { name: 'Oromo', speakers: '37M+', region: 'Ethiopia' },
    { name: 'Xhosa', speakers: '19M+', region: 'South Africa' },
    { name: 'Akan', speakers: '11M+', region: 'Ghana' }
  ];

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

      {/* Hero Section with 3D African Map */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Side - Text Content */}
            <div className="animate-fade-in">
              <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full mb-6 animate-bounce-subtle">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Something Amazing is Coming</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Coming <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-emerald-600 bg-clip-text text-transparent">Soon</span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-gray-600 mb-4">
                Unlock the beauty of African languages with our revolutionary EdTech platform
              </p>
              
              <p className="text-lg text-gray-500 mb-8">
                Master African languages through interactive games, cultural history, and real-life scenarios.
              </p>

              {/* Email Signup Form */}
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-8">
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
              <p className="text-sm text-gray-500">
                Join the waitlist - Be the first to explore African languages
              </p>
            </div>

            {/* Right Side - 3D African Map */}
            <div className="relative h-[500px] flex items-center justify-center">
              <div className="africa-map-container">
                <div className="africa-map">
                  {/* Map pins for different regions */}
                  <div className="map-pin pin-1" title="West Africa">
                    <MapPin className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="map-pin pin-2" title="East Africa">
                    <MapPin className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="map-pin pin-3" title="Southern Africa">
                    <MapPin className="w-6 h-6 text-amber-600" />
                  </div>
                  <div className="map-pin pin-4" title="North Africa">
                    <MapPin className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl mb-4">
              <Languages className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">12+ African Languages</h2>
            <p className="text-xl text-gray-600">Learn from the most spoken languages across the continent</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {languages.map((lang, index) => (
              <div 
                key={lang.name}
                className="language-card bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-amber-300 transition-all duration-300 hover:shadow-lg"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Globe className="w-6 h-6 text-amber-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{lang.name}</h3>
                  <p className="text-sm font-semibold text-amber-600 mb-1">{lang.speakers}</p>
                  <p className="text-xs text-gray-500">{lang.region}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with 3D Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Learn Through <span className="bg-gradient-to-r from-amber-600 to-emerald-600 bg-clip-text text-transparent">Experience</span>
            </h2>
            <p className="text-xl text-gray-600">Immersive features designed for effective language learning</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Interactive Games */}
            <div className="feature-card-3d group">
              <div className="feature-card-3d-inner">
                <div className="feature-card-3d-front">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 mx-auto transform group-hover:rotate-12 transition-transform duration-300">
                    <Gamepad2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Interactive Games</h3>
                  <p className="text-gray-600">
                    Master vocabulary and grammar through fun, engaging games designed by language experts.
                  </p>
                </div>
              </div>
            </div>

            {/* Cultural History */}
            <div className="feature-card-3d group">
              <div className="feature-card-3d-inner">
                <div className="feature-card-3d-front">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 mx-auto transform group-hover:rotate-12 transition-transform duration-300">
                    <Book className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Cultural History</h3>
                  <p className="text-gray-600">
                    Dive deep into African cultures, traditions, and stories while learning the language.
                  </p>
                </div>
              </div>
            </div>

            {/* Real-Life Situations */}
            <div className="feature-card-3d group">
              <div className="feature-card-3d-inner">
                <div className="feature-card-3d-front">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 mx-auto transform group-hover:rotate-12 transition-transform duration-300">
                    <MessageSquare className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Real-Life Scenarios</h3>
                  <p className="text-gray-600">
                    Practice conversations for markets, meetings, travel, and everyday situations.
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Lessons */}
            <div className="feature-card-3d group">
              <div className="feature-card-3d-inner">
                <div className="feature-card-3d-front">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 mx-auto transform group-hover:rotate-12 transition-transform duration-300">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Structured Lessons</h3>
                  <p className="text-gray-600">
                    Progress through expertly designed lessons from beginner to advanced levels.
                  </p>
                </div>
              </div>
            </div>

            {/* Cultural Immersion */}
            <div className="feature-card-3d group">
              <div className="feature-card-3d-inner">
                <div className="feature-card-3d-front">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center mb-6 mx-auto transform group-hover:rotate-12 transition-transform duration-300">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Cultural Immersion</h3>
                  <p className="text-gray-600">
                    Experience authentic African cultures through music, art, and storytelling.
                  </p>
                </div>
              </div>
            </div>

            {/* Community Learning */}
            <div className="feature-card-3d group">
              <div className="feature-card-3d-inner">
                <div className="feature-card-3d-front">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 mx-auto transform group-hover:rotate-12 transition-transform duration-300">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Community Hub</h3>
                  <p className="text-gray-600">
                    Connect with learners worldwide and practice with native speakers daily.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-100 to-emerald-100">
        <div className="max-w-4xl mx-auto text-center">
          <Trophy className="w-16 h-16 text-amber-600 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of learners waiting to explore the richness of African languages
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 border-2 border-amber-300 focus:border-amber-500 bg-white"
            />
            <Button 
              type="submit" 
              disabled={isLoading}
              className="h-14 px-8 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Get Early Access
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Globe className="w-6 h-6 text-amber-500" />
              <span className="text-xl font-bold">AfriLearn</span>
            </div>
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2025 AfriLearn. Empowering Africa through language education.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;