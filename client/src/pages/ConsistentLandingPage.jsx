import { Link } from "react-router-dom";
import { useState } from "react";

const ConsistentLandingPage = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "Easy Online Booking",
      description: "Book appointments anytime, anywhere with our simple booking system",
      icon: "📅",
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Expert Stylists",
      description: "Professional stylists with years of experience and training",
      icon: "💇‍♀️",
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Premium Services",
      description: "Wide range of beauty and wellness services to choose from",
      icon: "✨",
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Personalized Care",
      description: "Customized treatments based on your preferences and needs",
      icon: "�",
      color: "bg-orange-100 text-orange-600"
    },
    {
      title: "Flexible Scheduling",
      description: "Easy rescheduling and cancellation options for your convenience",
      icon: "�",
      color: "bg-pink-100 text-pink-600"
    },
    {
      title: "Loyalty Rewards",
      description: "Earn points and discounts with every visit",
      icon: "🎁",
      color: "bg-indigo-100 text-indigo-600"
    }
  ];

  const services = [
    { name: "Hair Services", price: "₹500-2500", icon: "✂️" },
    { name: "Beauty Treatments", price: "₹800-3000", icon: "💄" },
    { name: "Spa & Wellness", price: "₹1000-5000", icon: "🌿" },
    { name: "Nail Services", price: "₹300-1500", icon: "💅" }
  ];

  const stats = [
    { number: "10K+", label: "Happy Customers" },
    { number: "50+", label: "Expert Stylists" },
    { number: "100+", label: "Services" },
    { number: "4.9", label: "Rating" }
  ];

  const testimonials = [
    { name: "Sarah Johnson", role: "Regular Customer", text: "Amazing service! The booking system is so easy to use and the stylists are incredibly professional." },
    { name: "Michael Chen", role: "Salon Owner", text: "This management system has transformed our business. Everything is so organized now." },
    { name: "Emily Davis", role: "Stylist", text: "I love how easy it is to manage my schedule and see client preferences." }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold mr-3">
                S
              </div>
              <span className="text-xl font-bold text-gray-800">Salon</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition">Features</a>
              <a href="#services" className="text-gray-600 hover:text-gray-900 transition">Services</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition">Testimonials</a>
              <Link 
                to="/login" 
                className="text-gray-600 hover:text-gray-900 font-medium transition"
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Book Your Perfect
              <span className="text-purple-600"> Salon Experience</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Easy online booking, personalized services, and expert stylists - 
              all designed to give you the perfect salon experience every time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/register" 
                className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
              >
                Book Now
              </Link>
              <Link 
                to="/login" 
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Sign In
              </Link>
            </div>
          </div>
          
          {/* Hero Visual */}
          <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl mb-2">{service.icon}</div>
                  <h3 className="font-semibold text-gray-800">{service.name}</h3>
                  <p className="text-purple-600 font-medium">{service.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl font-bold text-purple-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Our Salon</h2>
            <p className="text-xl text-gray-600">Experience the best in beauty and wellness services</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition cursor-pointer ${
                  activeFeature === index ? 'ring-2 ring-purple-600' : ''
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center text-2xl mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Easy Booking Experience
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Simple, intuitive interface designed for your convenience
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-3">✓</span>
                  Quick online appointment booking
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-3">✓</span>
                  View available time slots instantly
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-3">✓</span>
                  Choose your preferred stylist
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-3">✓</span>
                <span>Secure online payment</span>
                </li>
              </ul>
              <Link 
                to="/register" 
                className="inline-block mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
              >
                Book Your Appointment
              </Link>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8">
              {/* Available Services Preview */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-800">Popular Services</h3>
                  <span className="text-purple-600 font-medium">Available Today</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">Hair Cut & Style</span>
                    <span className="text-xs text-purple-600 font-medium">₹600</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">Beard Trim & Shape</span>
                    <span className="text-xs text-purple-600 font-medium">₹300</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">Facial Treatment</span>
                    <span className="text-xs text-purple-600 font-medium">₹1200</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg shadow-sm p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">50+</div>
                  <div className="text-sm text-gray-600">Services</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">4.9⭐</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600">Real feedback from salon owners and professionals</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready for Your Perfect Salon Day?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Book your appointment today and experience the difference
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Book Appointment
            </Link>
            <Link 
              to="/login" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold mr-3">
                  S
                </div>
                <span className="text-xl font-bold">Salon</span>
              </div>
              <p className="text-gray-400">Your destination for beauty, wellness, and relaxation</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/register" className="hover:text-white transition">Features</Link></li>
                <li><Link to="/login" className="hover:text-white transition">Pricing</Link></li>
                <li><a href="#testimonials" className="hover:text-white transition">Testimonials</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Salon. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ConsistentLandingPage;
