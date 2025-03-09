import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomePage.css";

const getCategoryColor = (category) => {
  const colors = {
    AI: "#FF6B6B",
    Directory: "#4ECDC4",
    Design: "#45B7D1",
    "Who to Follow": "#96CEB4",
    Inspiration: "#FFEEAD",
    "No Code Tool": "#D4A5A5",
    Community: "#9B5DE5",
    Learn: "#00BBF9",
  };
  return colors[category] || "#666666";
};

const HomePage = () => {
  const [sources, setSources] = useState([]);

  useEffect(() => {
    const fetchSources = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/sources`
        );
        setSources(response.data);
      } catch (error) {
        console.error("Error fetching sources:", error.message);
      }
    };

    fetchSources();
  }, []);

  return (
    <div className="homepage">
      <div className="grid-container">
        {sources.map((source) => (
          <div key={source._id} className="card">
            <div className="card-image">
              {source.image ? (
                <img src={source.image} alt={source.name} />
              ) : (
                <div className="placeholder-image">No Image</div>
              )}
            </div>
            <div className="card-content">
              <div
                className="category-chip"
                style={{ backgroundColor: getCategoryColor(source.category) }}
              >
                {source.category}
              </div>
              <h3 className="card-title">{source.name}</h3>
              <p className="card-description">{source.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
