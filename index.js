import express from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "LLM Maps API is running" });
});

// Places Search using OpenStreetMap / Nominatim
app.get("/places/search", async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({
      error: "Missing required query parameter: q",
    });
  }

  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: query,
          format: "json",
          addressdetails: 1,
          limit: 5,
        },
        headers: {
          "User-Agent": "llm-maps-backend/1.0",
        },
      }
    );

    const results = response.data.map((place) => ({
      name: place.display_name,
      lat: parseFloat(place.lat),
      lng: parseFloat(place.lon),
      address: place.address || null,
      map_url: `https://www.google.com/maps?q=${place.lat},${place.lon}`,
      directions_url: `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lon}`,
    }));

    return res.json({
      query,
      count: results.length,
      results,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Failed to fetch place data",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});