import { Link } from "react-router-dom";
import { useState } from "react";
import AboutSection from "../components/AboutSection";

const LandingPage = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular Customer",
      content: "Amazing service! The booking system is so easy to use and the stylists are incredibly professional.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "First-time Client",
      content: "I loved the personalized recommendations. Found exactly what I was looking for!",
      rating: 5
    },
    {
      name: "Emily Davis",
      role: "Loyal Customer",
      content: "The best salon management system I've ever used. Seamless experience from booking to payment.",
      rating: 5
    }
  ];

  const features = [
    {
      icon: "✨",
      title: "Easy Booking",
      description: "Book appointments online in seconds with our intuitive booking system"
    },
    {
      icon: "💇‍♀️",
      title: "Expert Stylists",
      description: "Professional stylists trained in the latest hair and beauty trends"
    },
    {
      icon: "🎯",
      title: "Personalized Service",
      description: "Get AI-powered recommendations based on your preferences and history"
    },
    {
      icon: "💳",
      title: "Secure Payments",
      description: "Multiple payment options with secure transaction processing"
    },
    {
      icon: "📅",
      title: "Flexible Scheduling",
      description: "Easy rescheduling and cancellation options for your convenience"
    },
    {
      icon: "⭐",
      title: "Quality Guaranteed",
      description: "Premium services with quality assurance and customer satisfaction"
    }
  ];

  const services = [
    {
      name: "Hair Styling",
      description: "Professional cuts, styling, and treatments",
      price: "From ₹500",
      icon: "💇‍♀️"
    },
    {
      name: "Beauty Services",
      description: "Facials, makeup, and skincare treatments",
      price: "From ₹800",
      icon: "✨"
    },
    {
      name: "Spa & Wellness",
      description: "Relaxing massages and wellness therapies",
      price: "From ₹1000",
      icon: "🌸"
    },
    {
      name: "Nail Care",
      description: "Manicures, pedicures, and nail art",
      price: "From ₹300",
      icon: "💅"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                SalonPro
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-purple-600 transition">Features</a>
              <a href="#services" className="text-gray-700 hover:text-purple-600 transition">Services</a>
              <a href="#testimonials" className="text-gray-700 hover:text-purple-600 transition">Testimonials</a>
              <Link 
                to="/login" 
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Transform Your
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {" "}Beauty Experience
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Book appointments, discover personalized services, and manage your beauty routine with our intelligent salon management system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition"
              >
                Start Free Trial
              </Link>
              <Link 
                to="/login" 
                className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-50 transition"
              >
                Sign In
              </Link>
            </div>
          </div>
          
          {/* Hero Image Placeholder */}
          <div className="mt-16 relative">
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 text-center">
              <div className="text-6xl mb-4">💇‍♀️✨💅</div>
              <p className="text-gray-600 text-lg">Professional Salon Management System</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose SalonPro?</h2>
            <p className="text-xl text-gray-600">Experience the future of salon management</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Premium beauty and wellness services</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:border-purple-300 transition">
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                <p className="text-purple-600 font-semibold">{service.price}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/register" 
              className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Real experiences from real customers</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex mb-4">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">⭐</span>
                ))}
              </div>
              <p className="text-gray-700 text-lg mb-6 italic">
                "{testimonials[activeTestimonial].content}"
              </p>
              <div>
                <p className="font-semibold text-gray-900">{testimonials[activeTestimonial].name}</p>
                <p className="text-gray-600">{testimonials[activeTestimonial].role}</p>
              </div>
            </div>
            
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition ${
                    index === activeTestimonial ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Salon Experience?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have discovered the perfect salon management solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
              className="bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
            >
              Get Started Free
            </Link>
            <Link 
              to="/login" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                SalonPro
              </h3>
              <p className="text-gray-400">
                Modern salon management system for exceptional beauty experiences.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#services" className="hover:text-white transition">Services</a></li>
                <li><Link to="/register" className="hover:text-white transition">Sign Up</Link></li>
                <li><Link to="/login" className="hover:text-white transition">Sign In</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <p className="text-gray-400 mb-4">
                Stay updated with our latest services and offers.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition">📧</a>
                <a href="#" className="text-gray-400 hover:text-white transition">📱</a>
                <a href="#" className="text-gray-400 hover:text-white transition">💬</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SalonPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
