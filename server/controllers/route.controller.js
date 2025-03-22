const Route = require("../models/route.model");

const saveRoute = async (req, res) => {
  try {
    const {
      userId,
      currentLocation,
      destinationLocation,
      currentLocationName,
      destinationLocationName,
    } = req.body;
    const existing = await Route.findOne({
      userId,
      currentLocation,
      destinationLocation,
    });
    if (existing) {
      return res.status(400).json({
        message: "Route already exists",
      });
    }
    if (currentLocation.length !== 2 || destinationLocation.length !== 2) {
      return res.status(400).json({
        message: "Invalid coordinates",
      });
    }
    const newRoute = new Route({
      userId: userId,
      currentLocation: currentLocation,
      currentLocationName: currentLocationName,
      destinationLocation: destinationLocation,
      destinationLocationName: destinationLocationName,
    });

    await newRoute.save();
    res.status(200).json({
      message: "Route saved successfully",
      route: newRoute,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error saving route",
      error: err,
    });
  }
};

const deleteRoute = async (req, res) => {
  try {
    const routeId = req.params.routeId;
    const route = await Route.findByIdAndDelete(routeId);
    if (!route) {
      return res.status(404).json({
        message: "Route not found",
      });
    }

    res.status(200).json({
      message: "Route deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting route",
      error: err,
    });
  }
};

const getRoutes = async (req, res) => {
  try {
    const routes = await Route.find({
      userId: req.user._id,
    });

    return res.status(200).json({
      message: "Routes retrieved successfully",
      routes: routes,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching routes",
      error: err,
    });
  }
};

module.exports = {
  saveRoute,
  deleteRoute,
  getRoutes,
};
