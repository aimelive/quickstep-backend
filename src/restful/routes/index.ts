import express from "express";

const routes = express.Router();

routes.get("/", (req, res) => {
  res.json({
    message: "Welcome to Quick step App backend!",
  });
});

routes.get("*", (req, res) => {
  res.json({
    message: "Invalid path URL!",
  });
});

export default routes;
