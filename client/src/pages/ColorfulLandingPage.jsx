import { Link } from "react-router-dom";
import { useState } from "react";

const ColorfulLandingPage = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    { 
      id: 1, 
      name: "Hair Magic", 
      color: "from-pink-500 to-rose-500",
      icon: "🎨",
      features: ["Cuts & Styling", "Coloring", "Treatments"],
      price: "From ₹599"
    },
    { 
      id: 2, 
      name: "Face Glow", 
      color: "from-purple-500 to-indigo-500",
      icon: "✨",
      features: ["Facials", "Masks", "Skincare"],
      price: "From ₹799"
    },
    { 
      id: 3, 
      name: "Body Bliss", 
      color: "from-blue-500 to-cyan-500",
      icon: "🌊",
      features: ["Massages", "Spa", "Relaxation"],
      price: "From ₹999"
    },
    { 
      id: 4, 
      name: "Nail Art", 
      color: "from-green-500 to-emerald-500",
      icon: "💅",
      features: ["Manicure", "Pedicure", "Design"],
      price: "From ₹399"
    }
  ];

  const stats = [
    { number: "15K+", label: "Happy Clients", emoji: "😊" },
    { number: "50+", label: "Expert Artists", emoji: "👩‍🎨" },
    { number: "99%", label: "Satisfaction", emoji: "⭐" },
    { number: "5★", label: "Average Rating", emoji: "🌟" }
  ];

  const team = [
    { name: "Sarah", role: "Hair Expert", emoji: "💇‍♀️", color: "bg-pink-500" },
    { name: "Mike", role: "Color Specialist", emoji: "🎨", color: "bg-purple-500" },
    { name: "Emma", role: "Beauty Pro", emoji: "✨", color: "bg-blue-500" },
    { name: "Alex", role: "Nail Artist", emoji: "💅", color: "bg-green-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                S
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                StyleHub
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-700 hover:text-purple-600 font-medium transition">Services</a>
              <a href="#team" className="text-gray-700 hover:text-purple-600 font-medium transition">Team</a>
              <a href="#stats" className="text-gray-700 hover:text-purple-600 font-medium transition">About</a>
              <Link 
                to="/login" 
                className="text-purple-600 hover:text-purple-700 font-medium transition"
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-white rounded-full px-4 py-2 shadow-md mb-6">
              <span className="text-2xl mr-2">🎉</span>
              <span className="text-sm font-medium text-gray-700">Welcome to Your Beauty Paradise</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Look Amazing,
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Feel Incredible
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your beauty routine with our expert stylists, premium services, and personalized care. 
              Your journey to confidence starts here!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register" 
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-xl transform hover:scale-105 transition"
              >
                Book Your Transformation 🚀
              </Link>
              <Link 
                to="/login" 
                className="bg-white text-purple-600 border-2 border-purple-200 px-8 py-4 rounded-full font-bold text-lg hover:border-purple-400 transition"
              >
                Member Access
              </Link>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className={`bg-gradient-to-br ${service.color} rounded-2xl p-6 text-white transform hover:scale-105 transition cursor-pointer`}
                  onClick={() => setSelectedService(service)}
                >
                  <div className="text-4xl mb-2">{service.icon}</div>
                  <h3 className="font-bold mb-1">{service.name}</h3>
                  <p className="text-sm opacity-90">{service.price}</p>
                </div>
              ))}
            </div>
            
            {selectedService && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-2xl p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className={`text-6xl mb-4 bg-gradient-to-br ${selectedService.color} bg-clip-text text-transparent`}>
                    {selectedService.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{selectedService.name}</h3>
                  <ul className="text-gray-600 mb-4">
                    {selectedService.features.map((feature, i) => (
                      <li key={i} className="mb-1">✨ {feature}</li>
                    ))}
                  </ul>
                  <p className="text-purple-600 font-bold">{selectedService.price}</p>
                  <button 
                    onClick={() => setSelectedService(null)}
                    className="mt-4 text-gray-500 hover:text-gray-700"
                  >
                    Close ✕
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{stat.emoji}</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-1">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section id="services" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Our Services
              </span>
            </h2>
            <p className="text-xl text-gray-600">Everything you need to look and feel your best</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
                <div className="p-6">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                  <ul className="text-gray-600 mb-4 space-y-1">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-600 font-bold">{service.price}</span>
                    <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm hover:shadow-lg transition">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Meet Our Experts
              </span>
            </h2>
            <p className="text-xl text-gray-600">Talented professionals dedicated to your beauty</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className={`w-20 h-20 ${member.color} rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4`}>
                  {member.emoji}
                </div>
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl p-12 text-white">
            <h2 className="text-4xl font-bold mb-4">
              Ready for Your Glow Up? ✨
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of happy clients who trust us with their beauty journey
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register" 
                className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold hover:shadow-xl transition"
              >
                Start Your Journey
              </Link>
              <Link 
                to="/login" 
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-purple-600 transition"
              >
                Member Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="text-xl font-bold">StyleHub</span>
          </div>
          <p className="text-gray-400 mb-4">Your Beauty, Our Passion 💖</p>
          <div className="flex justify-center space-x-6 text-gray-400">
            <Link to="/login" className="hover:text-white transition">Sign In</Link>
            <Link to="/register" className="hover:text-white transition">Register</Link>
            <a href="#services" className="hover:text-white transition">Services</a>
          </div>
          <p className="text-gray-500 mt-8 text-sm">&copy; 2024 StyleHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ColorfulLandingPage;
