const axios = require("axios");

const fetchRoutes = async (start, end, mode) => {
  console.log({
    start: start,
    end: end,
    mode: mode,
  });

  const body = {
    coordinates: [
      [start[0], start[1]],
      [end[0], end[1]],
    ],
    alternative_routes: {
      target_count: 3,
      weight_factor: 1.4,
      share_factor: 0.6,
    },
  };

  const url = `https://api.openrouteservice.org/v2/directions/${mode}`;

  try {
    const response = await axios.post(url, body, {
      headers: {
        Authorization: process.env.ORS_API_KEY,
        "Content-Type": "application/json",
        Accept:
          "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error in fetchRoutes:",
      error.response?.data || error.message
    );
    throw error;
  }
};

module.exports = fetchRoutes;
