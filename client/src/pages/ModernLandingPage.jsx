import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const ModernLandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { name: "Hair Artistry", price: "₹800+", duration: "45-90 min", description: "Precision cuts, coloring, and styling" },
    { name: "Beauty Treatments", price: "₹1200+", duration: "60-120 min", description: "Facials, masks, and skincare" },
    { name: "Wellness Spa", price: "₹1500+", duration: "90-180 min", description: "Massages and relaxation therapies" },
    { name: "Nail Studio", price: "₹500+", duration: "30-90 min", description: "Manicures, pedicures, nail art" }
  ];

  const whyChoose = [
    { title: "Master Stylists", description: "Award-winning professionals with years of experience", icon: "👨‍🎨" },
    { title: "Premium Products", description: "Only the finest, cruelty-free products used", icon: "🌿" },
    { title: "Personalized Care", description: "Customized treatments for your unique needs", icon: "💎" },
    { title: "Modern Tech", description: "Advanced booking and management system", icon: "📱" }
  ];

  const testimonials = [
    { name: "Alexandra Chen", text: "The most luxurious salon experience I've ever had. Attention to detail is incredible.", rating: 5 },
    { name: "Marcus Williams", text: "Professional staff, amazing atmosphere, and outstanding results every time.", rating: 5 },
    { name: "Sophia Rodriguez", text: "I've been coming here for years. They never disappoint!", rating: 5 }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-black/90 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-light tracking-wider">
              LUXE<span className="font-bold">SALON</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-white/80 hover:text-white transition">Services</a>
              <a href="#about" className="text-white/80 hover:text-white transition">About</a>
              <a href="#testimonials" className="text-white/80 hover:text-white transition">Reviews</a>
              <Link 
                to="/login" 
                className="border border-white/30 px-4 py-2 rounded-full text-white/90 hover:border-white hover:text-white transition"
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-white/90 transition"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80"></div>
        
        {/* Background Video/Image Placeholder */}
        <div className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-br from-purple-900/20 via-black to-black flex items-center justify-center">
            <div className="text-8xl opacity-10">✨</div>
          </div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight">
            Where Beauty
            <span className="block font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Meets Art
            </span>
          </h1>
          <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto font-light">
            Experience the pinnacle of luxury salon services. Our expert stylists and 
            cutting-edge techniques ensure you leave feeling extraordinary.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/register" 
              className="bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-white/90 transform hover:scale-105 transition"
            >
              Reserve Your Session
            </Link>
            <Link 
              to="/login" 
              className="border border-white/50 px-8 py-4 rounded-full text-white/90 hover:border-white hover:text-white transition"
            >
              Member Access
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-4">Our Services</h2>
            <p className="text-white/60 text-lg">Curated treatments for the discerning client</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition"></div>
                <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:border-white/20 transition">
                  <h3 className="text-2xl font-light mb-2">{service.name}</h3>
                  <p className="text-white/70 text-sm mb-4">{service.description}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-purple-400 font-medium">{service.price}</span>
                    <span className="text-white/50">{service.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section id="about" className="py-24 px-6 bg-gradient-to-b from-transparent to-purple-900/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-light mb-8">
                Why Choose
                <span className="block font-bold">LUXESALON</span>
              </h2>
              <div className="space-y-6">
                {whyChoose.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="text-3xl">{item.icon}</div>
                    <div>
                      <h3 className="text-xl font-medium mb-1">{item.title}</h3>
                      <p className="text-white/70">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-12 text-center">
                <div className="text-6xl mb-4">💎</div>
                <h3 className="text-2xl font-light mb-2">Premium Experience</h3>
                <p className="text-white/70">Every visit is transformed into a luxurious escape</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-16">Client Voices</h2>
          
          <div className="space-y-12">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-12">
                <div className="flex justify-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-2xl">⭐</span>
                  ))}
                </div>
                <p className="text-xl text-white/90 mb-8 italic font-light">
                  "{testimonial.text}"
                </p>
                <p className="text-white/70">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-light mb-6">
            Ready to
            <span className="block font-bold">Transform?</span>
          </h2>
          <p className="text-xl text-white/80 mb-12">
            Join the exclusive circle of clients who expect nothing but the best
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/register" 
              className="bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-white/90 transform hover:scale-105 transition"
            >
              Become a Client
            </Link>
            <Link 
              to="/login" 
              className="border border-white/50 px-8 py-4 rounded-full text-white/90 hover:border-white hover:text-white transition"
            >
              Member Portal
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-light tracking-wider mb-4">
                LUXE<span className="font-bold">SALON</span>
              </h3>
              <p className="text-white/60">Where luxury meets perfection</p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2 text-white/60">
                <li><Link to="/login" className="hover:text-white transition">Sign In</Link></li>
                <li><Link to="/register" className="hover:text-white transition">Register</Link></li>
                <li><a href="#services" className="hover:text-white transition">Services</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Contact</h4>
              <ul className="space-y-2 text-white/60">
                <li>📍 Premium Location</li>
                <li>📞 +1 234 567 8900</li>
                <li>✨ info@luxesalon.com</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Hours</h4>
              <ul className="space-y-2 text-white/60">
                <li>Mon-Fri: 9AM - 8PM</li>
                <li>Sat-Sun: 10AM - 6PM</li>
                <li>By Appointment</li>
              </ul>
            </div>
          </div>
          <div className="text-center text-white/40 pt-8 border-t border-white/10">
            <p>&copy; 2024 LUXESALON. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ModernLandingPage;
