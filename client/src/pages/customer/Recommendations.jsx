import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getServiceRecommendations } from "../../services/recommendationService";

const Recommendations = () => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [preferences, setPreferences] = useState(null);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const res = await getServiceRecommendations();
      setRecommendations(res.data.recommendations);
      setPreferences(res.data.customerPreferences);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load recommendations");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading recommendations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Service Recommendations</h1>
      <p className="text-gray-600 mb-6">Personalized suggestions based on your preferences and booking history</p>

      {/* Customer Preferences Card */}
      {preferences && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-purple-800 mb-2">Your Preferences</h3>
          <div className="flex gap-6 text-sm text-purple-700">
            <p>Average Budget: <span className="font-semibold">${preferences.avgBudget?.toFixed(2) || 0}</span></p>
            <p>Services Booked: <span className="font-semibold">{preferences.bookedServicesCount || 0}</span></p>
          </div>
        </div>
      )}

      {/* Recommendations List */}
      {recommendations.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg">No recommendations available yet.</p>
          <p className="text-gray-500 mt-2">Book some services to get personalized recommendations!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((rec, index) => (
            <div
              key={rec.service._id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{rec.service.name}</h3>
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    #{index + 1}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{rec.service.description}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-purple-600">${rec.service.price}</span>
                  <span className="text-gray-500 text-sm">{rec.service.duration} mins</span>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-blue-700">
                    <span className="font-semibold">Why:</span> {rec.reason}
                  </p>
                </div>

                <button
                  onClick={() => navigate(`/customer/book?service=${rec.service._id}`)}
                  className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommendations;
