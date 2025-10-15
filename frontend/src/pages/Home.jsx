import React, { useState } from 'react';
import { Mail, Globe, BookOpen, Users, ArrowRight, Sparkles, Gamepad2, Clock, MessageSquare, MapPin, Trophy, Book, Languages, Phone, Instagram } from 'lucide-react';

import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useToast } from '../hooks/use-toast';
import { mockEmailSignup } from '../utils/mock';
import ReactCountryFlag from 'react-country-flag';

const languageData = [
	{
		name: 'Swahili',
		speakers: '200M+',
		countries: [
			{ name: 'Tanzania', code: 'TZ' },
			{ name: 'Kenya', code: 'KE' },
			{ name: 'Uganda', code: 'UG' },
			{ name: 'DR Congo', code: 'CD' },
			{ name: 'Mozambique', code: 'MZ' },
			{ name: 'Comoros', code: 'KM' },
      {name: 'Rwanda', code: 'RW' },
			// add more as needed
		],
		region: 'East Africa',
	},

   {
		name: 'Hausa',
		speakers: '85M+',
		countries: [
			{ name: 'Nigeria', code: 'NG' },
			{ name: 'Niger', code: 'NE' },
			{ name: 'Ghana', code: 'GH' },
			{ name: 'Cameroon', code: 'CM' },
		],
		region: 'West Africa',
	  },

    {
		name: 'Amharic',
		speakers: '57M+',
		countries: [{ name: 'Ethiopia', code: 'ET' }],
		region: 'Ethiopia',
	  },

  {
		name: 'Yoruba',
		speakers: '50M+',
		countries: [
			{ name: 'Nigeria', code: 'NG' },
			{ name: 'Benin', code: 'BJ' },
			{ name: 'Togo', code: 'TG' },
		],
		region: 'West Africa',
	  },

    {
		name: 'Igbo',
		speakers: '45M+',
		countries: [{ name: 'Nigeria', code: 'NG' }],
		region: 'Nigeria',
	  },

    {
    name: 'Moroccan Arabic (Darija)',
    speakers: '35M+',
    countries: [{ name: 'Morocco', code: 'MA' }],
    region: 'North Africa',

    },


	  {
		name: 'Oromo',
		speakers: '37M+',
		countries: [{ name: 'Ethiopia', code: 'ET' }],
		region: 'Ethiopia',
	  },
	
	
	  {
		name: 'Zulu',
		speakers: '28M+',
		countries: [{ name: 'South Africa', code: 'ZA' }],
		region: 'South Africa',
	  },

    {
		name: 'Somali',
		speakers: '21M+',
		countries: [
			{ name: 'Somalia', code: 'SO' },
			{ name: 'Djibouti', code: 'DJ' },
			{ name: 'Ethiopia', code: 'ET' },
			{ name: 'Kenya', code: 'KE' },
		],
		region: 'Horn of Africa',
	  },
    {
		name: 'Xhosa',
		speakers: '19M+',
		countries: [{ name: 'South Africa', code: 'ZA' }],
		region: 'South Africa',
	  },

    {
		name: 'Shona',
		speakers: '15M+',
		countries: [{ name: 'Zimbabwe', code: 'ZW' }],
		region: 'Zimbabwe',
	  },

   {
    name: 'Kinyarwanda',
    speakers: '13M+',
    countries: [{ name: 'Rwanda', code: 'RW' }],
    region: 'Rwanda',
   },
  
   {
		name: 'Akan',
		speakers: '11M+',
		countries: [{ name: 'Ghana', code: 'GH' }],
		region: 'Ghana',
	 },

   {name:'Tunisian Arabic',
    speakers: '11M+',
    countries: [{ name: 'Tunisia', code: 'TN' }],
    region: 'North Africa'
    },
	
	 {
		name: 'Tigrinya',
		speakers: '9M+',
		countries: [
			{ name: 'Eritrea', code: 'ER' },
			{ name: 'Ethiopia', code: 'ET' },
		],
		region: 'Eritrea/Ethiopia',
	  },
	
    {
    name: 'Luganda (Ganda)',
    speakers: '7M+',
    countries: [{ name: 'Uganda', code: 'UG' }],
    region: 'Uganda',
    },
	
	
];

// Collect all language names for animation
const africanLanguages = languageData.map(l => l.name);

const Home = () => {
	const [email, setEmail] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [overlay, setOverlay] = useState({ open: false, language: null });
	const [contactOverlay, setContactOverlay] = useState(false);
	const { toast } = useToast();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!email || !/\S+@\S+\.\S+/.test(email)) {
			toast({
				title: 'Invalid Email',
				description: 'Please enter a valid email address',
				variant: 'destructive',
			});
			return;
		}

		setIsLoading(true);
		try {
			await mockEmailSignup(email);
			toast({
				title: 'Welcome to Nubian!',
				description: "You'll be notified when we launch!",
			});
			setEmail('');
		} catch (error) {
			toast({
				title: 'Error',
				description: 'Something went wrong. Please try again.',
				variant: 'destructive',
			});
		} finally {
			setIsLoading(false);
		}
	};

	const openOverlay = (language) => setOverlay({ open: true, language });
	const closeOverlay = () => setOverlay({ open: false, language: null });
	const openContactOverlay = () => setContactOverlay(true);
	const closeContactOverlay = () => setContactOverlay(false);

       return (
	       <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-emerald-50 overflow-hidden">
			{/* Header */}
			<header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-amber-100">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-2">
							<img src="/logo.png" alt="Nubian Logo" className="h-16 w-auto" />
						</div>
						<Button 
							variant="outline" 
							className="border-amber-600 text-amber-600 hover:bg-amber-50"
							onClick={openContactOverlay}
						>
							Contact Us
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
								Coming{' '}
								<span className="bg-gradient-to-r from-amber-600 via-yellow-400 to-yellow-300 bg-clip-text text-transparent">
									Soon
								</span>
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

					       {/* Right Side - African Map with Flags and animated language labels */}
					       <div className="relative h-[500px] flex items-center justify-center">
						       <div className="relative w-full h-full flex items-center justify-center">
							       {/* Africa Flag Map Image */}
							       <img 
								       src="/map-of-africa.png" 
								       alt="Africa Map with Flags" 
								       className="max-w-full max-h-full object-contain"
								       style={{filter: 'drop-shadow(0 10px 40px rgba(0,0,0,0.15))'}}
							       />
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
						{languageData.map((lang, index) => (
							<div
								key={lang.name}
								className="language-card bg-white rounded-xl p-6 border-2 border-gray-100 hover:border-amber-300 transition-all duration-300 hover:shadow-lg"
								style={{ animationDelay: `${index * 0.1}s` }}
							>
								<div className="text-center">
									<div
										className="w-12 h-12 bg-gradient-to-br from-amber-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 cursor-pointer"
										onClick={() => openOverlay(lang)}
										title={`Show all countries for ${lang.name}`}
									>
										<ReactCountryFlag
											countryCode={lang.countries[0].code}
											svg
											style={{
												width: '2em',
												height: '2em',
												borderRadius: '50%',
												boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
											}}
										/>
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
							Learn Through{' '}
							<span className="bg-gradient-to-r from-amber-600 to-emerald-600 bg-clip-text text-transparent">
								Experience
							</span>
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
					<h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Start Your Journey?</h2>
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
							<img src="/logo.png" alt="Nubian Logo" className="h-12 w-auto" />
						</div>
						<p className="text-gray-400 text-sm text-center md:text-left">
							© 2025 Nubian. Empowering Africa through language education.
						</p>
					</div>
				</div>
			</footer>

			{/* Overlay */}
			{overlay.open && (
				<div
					className="overlay"
					style={{
						position: 'fixed',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						background: 'rgba(0,0,0,0.45)',
						zIndex: 1000,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
					onClick={closeOverlay}
				>
					<div
						className="overlay-content"
						style={{
							background: '#fff',
							borderRadius: 16,
							padding: 32,
							minWidth: 320,
							boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
							position: 'relative',
						}}
						onClick={(e) => e.stopPropagation()}
					>
						<button
							onClick={closeOverlay}
							style={{
								position: 'absolute',
								top: 12,
								right: 16,
								background: 'none',
								border: 'none',
								fontSize: 22,
								cursor: 'pointer',
							}}
							aria-label="Close"
						>
							×
						</button>
						<h2 style={{ marginBottom: 18 }}>
							{overlay.language.name} is spoken in:
						</h2>
						<ul style={{ listStyle: 'none', padding: 0 }}>
							{overlay.language.countries.map((country) => (
								<li key={country.code} style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
									<ReactCountryFlag
										countryCode={country.code}
										svg
										style={{
											width: '2em',
											height: '2em',
											borderRadius: '50%',
											marginRight: 12,
										}}
									/>
									<span style={{ fontSize: 18 }}>{country.name}</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			)}

			{/* Contact Us Overlay */}
			{contactOverlay && (
				<div
					className="overlay"
					style={{
						position: 'fixed',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						background: 'rgba(0,0,0,0.5)',
						zIndex: 1000,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
					onClick={closeContactOverlay}
				>
					<div
						className="overlay-content"
						style={{
							background: '#fff',
							borderRadius: 16,
							padding: 40,
							minWidth: 360,
							maxWidth: 450,
							boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
							position: 'relative',
						}}
						onClick={(e) => e.stopPropagation()}
					>
						<button
							onClick={closeContactOverlay}
							style={{
								position: 'absolute',
								top: 12,
								right: 16,
								background: 'none',
								border: 'none',
								fontSize: 28,
								cursor: 'pointer',
								color: '#999',
							}}
							aria-label="Close"
						>
							×
						</button>
						<h2 style={{ marginBottom: 8, fontSize: 24, fontWeight: 'bold', color: '#111' }}>
							Contact Us
						</h2>
						<p style={{ marginBottom: 24, color: '#666', fontSize: 14 }}>
							Get in touch with us through any of these channels
						</p>
						<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
							{/* Email */}
							<a
								href="mailto:nubian1@gmail.com"
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: 12,
									padding: 14,
									background: '#f8f9fa',
									borderRadius: 10,
									textDecoration: 'none',
									color: '#111',
									transition: 'all 0.2s',
									border: '2px solid transparent',
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.background = '#fff';
									e.currentTarget.style.borderColor = '#d97706';
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.background = '#f8f9fa';
									e.currentTarget.style.borderColor = 'transparent';
								}}
							>
								<Mail className="w-5 h-5 text-amber-600" />
								<div>
									<div style={{ fontSize: 14, fontWeight: 600 }}>Email</div>
									<div style={{ fontSize: 12, color: '#666' }}>info@nubian.com</div>
								</div>
							</a>

						{/* Instagram */}
						<a
							href="https://www.instagram.com/nubian_africa/"
							target="_blank"
							rel="noopener noreferrer"
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: 12,
								padding: 14,
								background: '#f8f9fa',
								borderRadius: 10,
								textDecoration: 'none',
								color: '#111',
								transition: 'all 0.2s',
								border: '2px solid transparent',
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.background = '#fff';
								e.currentTarget.style.borderColor = '#d97706';
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.background = '#f8f9fa';
								e.currentTarget.style.borderColor = 'transparent';
							}}
						>
							<Instagram className="w-5 h-5 text-amber-600" />
							<div>
								<div style={{ fontSize: 14, fontWeight: 600 }}>Instagram</div>
								<div style={{ fontSize: 12, color: '#666' }}>@nubian_africa</div>
							</div>
							</a>
							{/* Phone */}
							<a
								href="tel:+250791762646"
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: 12,
									padding: 14,
									background: '#f8f9fa',
									borderRadius: 10,
									textDecoration: 'none',
									color: '#111',
									transition: 'all 0.2s',
									border: '2px solid transparent',
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.background = '#fff';
									e.currentTarget.style.borderColor = '#d97706';
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.background = '#f8f9fa';
									e.currentTarget.style.borderColor = 'transparent';
								}}
							>
								<Phone className="w-5 h-5 text-amber-600" />
								<div>
									<div style={{ fontSize: 14, fontWeight: 600 }}>Phone</div>
									<div style={{ fontSize: 12, color: '#666' }}>+250 791 762 646</div>
								</div>
							</a>
							{/* WhatsApp */}
							<a
								href="https://wa.me/250791762646"
								target="_blank"
								rel="noopener noreferrer"
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: 12,
									padding: 14,
									background: '#f8f9fa',
									borderRadius: 10,
									textDecoration: 'none',
									color: '#111',
									transition: 'all 0.2s',
									border: '2px solid transparent',
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.background = '#fff';
									e.currentTarget.style.borderColor = '#d97706';
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.background = '#f8f9fa';
									e.currentTarget.style.borderColor = 'transparent';
								}}
							>
								<MessageSquare className="w-5 h-5 text-amber-600" />
								<div>
									<div style={{ fontSize: 14, fontWeight: 600 }}>WhatsApp</div>
									<div style={{ fontSize: 12, color: '#666' }}>+250 791 762 646</div>
								</div>
							</a>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Home;