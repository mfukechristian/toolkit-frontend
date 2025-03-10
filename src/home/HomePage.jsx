import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomePage.css";

const getCategoryColor = (category) => {
  const colors = {
    "Artificial Intelligence": "#FF6B6B",
    Directory: "#4ECDC4",
    Design: "#45B7D1",
    "Who to Follow": "#96CEB4",
    Inspiration: "#000000",
    "No Code Tool": "#D4A5A5",
    Community: "#9B5DE5",
    Learn: "#00BBF9",
  };
  return colors[category] || "#666666";
};

const HomePage = () => {
  const [sources, setSources] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndCacheSources = async () => {
      try {
        // Check if sources are already cached in local storage
        const cachedSources = localStorage.getItem("cachedSources");
        if (cachedSources) {
          const parsedSources = JSON.parse(cachedSources);
          setSources(parsedSources);
          return;
        }

        // Fetch sources from the API if not cached
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/sources`
        );
        const fetchedSources = response.data;

        // Store fetched sources in local storage
        localStorage.setItem("cachedSources", JSON.stringify(fetchedSources));

        setSources(fetchedSources);
      } catch (error) {
        console.error("Error fetching sources:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAndCacheSources();
  }, []);

  // Extract unique categories from the data
  const categories = Array.from(
    new Set(sources.map((source) => source.category))
  );

  // Filter sources based on selected category
  const filteredSources =
    selectedCategory === null
      ? sources
      : sources.filter((source) => source.category === selectedCategory);

  return (
    <div className="homepage">
      <div className="welcome-message">
        <h1>Welcome to The Toolkit</h1>
        <p>
          A curated library of tools and resources that helped me on my coding
          journey. Whether you're self-taught, a frontend or backend developer,
          an AI enthusiast, or a creator, I hope you find something of value in
          it.
        </p>
      </div>

      {loading ? (
        <div className="loading-message">Loading...</div>
      ) : (
        <>
          {/* Button Container */}
          <div className="button-container">
            <button
              className={`filter-button ${
                selectedCategory === null ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-button ${
                  selectedCategory === category ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Grid Container */}
          <div className="grid-container">
            {filteredSources.map((source) => (
              <div key={source._id} className="card">
                <a href={source.url} target="_blank" rel="noopener noreferrer">
                  <div className="card-image">
                    {source.image ? (
                      <img src={source.image} alt={source.name} />
                    ) : (
                      <div className="placeholder-image">No Image</div>
                    )}
                  </div>
                </a>
                <div className="card-content">
                  <div
                    className="category-chip"
                    style={{
                      backgroundColor: getCategoryColor(source.category),
                    }}
                  >
                    {source.category}
                  </div>
                  <h3 className="card-title">{source.name}</h3>
                  <p className="card-description">{source.description}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
