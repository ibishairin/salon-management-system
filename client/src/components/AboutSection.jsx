const AboutSection = () => {
  const stats = [
    { number: "10K+", label: "Happy Customers" },
    { number: "50+", label: "Expert Stylists" },
    { number: "100+", label: "Services Offered" },
    { number: "4.9", label: "Average Rating" }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About SalonPro</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're revolutionizing the salon experience with cutting-edge technology and personalized service.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-600 mb-6">
              To provide exceptional beauty services through innovative technology, making salon experiences more accessible, personalized, and enjoyable for everyone.
            </p>
            
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Why Choose Us
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span>AI-powered recommendations tailored to your preferences</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span>Seamless online booking and management</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span>Professional stylists with extensive training</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-600 mr-2">✓</span>
                <span>Flexible scheduling and easy rescheduling</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl p-8 text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h4 className="text-2xl font-bold text-gray-900 mb-2">Award Winning</h4>
            <p className="text-gray-600">
              Recognized as the best salon management system of 2024
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
