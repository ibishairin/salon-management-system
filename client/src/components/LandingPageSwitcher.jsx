import { useState } from "react";

const LandingPageSwitcher = ({ children }) => {
  const [showSwitcher, setShowSwitcher] = useState(false);
  const [currentPage, setCurrentPage] = useState('modern');

  const landingPages = {
    professional: {
      name: 'Professional',
      component: 'LandingPage',
      description: 'Clean, corporate design'
    },
    modern: {
      name: 'Modern Luxury',
      component: 'ModernLandingPage', 
      description: 'Dark, elegant aesthetic'
    },
    colorful: {
      name: 'Colorful Fun',
      component: 'ColorfulLandingPage',
      description: 'Bright, vibrant design'
    }
  };

  const switchLandingPage = (pageType) => {
    setCurrentPage(pageType);
    // In a real app, this would update the route or state
    // For now, we'll just show an alert
    alert(`Switching to ${landingPages[pageType].name} landing page!\n\nTo implement this switch:\n1. Update App.jsx to import the desired component\n2. Change the route: <Route path="/" element={<${landingPages[pageType].component} />} />`);
  };

  return (
    <>
      {/* Floating Switcher Button */}
      <button
        onClick={() => setShowSwitcher(!showSwitcher)}
        className="fixed bottom-6 right-6 z-50 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition"
        title="Switch Landing Page"
      >
        🎨
      </button>

      {/* Switcher Panel */}
      {showSwitcher && (
        <div className="fixed bottom-20 right-6 z-50 bg-white rounded-lg shadow-xl p-4 w-64">
          <h3 className="font-bold text-gray-800 mb-3">Choose Landing Page</h3>
          <div className="space-y-2">
            {Object.entries(landingPages).map(([key, page]) => (
              <button
                key={key}
                onClick={() => switchLandingPage(key)}
                className={`w-full text-left p-3 rounded-lg transition ${
                  currentPage === key 
                    ? 'bg-purple-100 border-2 border-purple-500' 
                    : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                }`}
              >
                <div className="font-medium text-gray-800">{page.name}</div>
                <div className="text-sm text-gray-600">{page.description}</div>
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowSwitcher(false)}
            className="w-full mt-3 text-gray-500 hover:text-gray-700 text-sm"
          >
            Close ✕
          </button>
        </div>
      )}

      {/* Main Content */}
      {children}
    </>
  );
};

export default LandingPageSwitcher;
