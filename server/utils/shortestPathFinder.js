require('dotenv').config();
const axios = require('axios');

const ORS_API_KEY = process.env.ORS_API_KEY;

async function findRoutesORS(source, destination, medium, speed) {
  if (!source || !destination || source.length !== 2 || destination.length !== 2) {
    throw new Error('Invalid source or destination coordinates');
  }

  const url = `https://api.openrouteservice.org/v2/directions/${medium}-${speed}/geojson`;

  const body = {
    coordinates: [source, destination],
    preference: 'fastest',
    alternative_routes: {
      target_count: 3,
      share_factor: 0.6,
      weight_factor: 1.6
    },
    instructions: false
  };

  try {
    const response = await axios.post(url, body, {
      headers: {
        Authorization: ORS_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    const features = response.data.features;

    if (!features || features.length === 0) {
      throw new Error('No routes found');
    }

    const routes = features.map((feature, index) => ({
      routeId: `route_${index + 1}`,
      geometry: feature.geometry.coordinates, // [ [lng, lat], ... ]
      distance: feature.properties.summary.distance, // in meters
      duration: feature.properties.summary.duration  // in seconds
    }));

    return routes;
  } catch (err) {
    console.error('Error fetching routes from ORS:', err.response?.data || err.message);
    throw new Error('Failed to get routes from ORS.');
  }
}

module.exports = { findRoutesORS };
