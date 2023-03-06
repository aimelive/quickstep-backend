import dotenv from "dotenv";
import { account, accountDefinitions } from "./restful/account";
import { movement, movementDefinitions } from "./restful/movements";
import { notification } from "./restful/notifications";
import { profile, profileDefinitions } from "./restful/profile";

dotenv.config();

const paths = { ...account, ...profile, ...movement, ...notification };

const definitions = {
  ...accountDefinitions,
  ...profileDefinitions,
  ...movementDefinitions,
};

const host =
  process.env.NODE_ENV === "production"
    ? process.env.BASE_URL?.split("https://")[1]
    : process.env.BASE_URL?.split("http://")[1];

const config = {
  swagger: "2.0",
  info: {
    title: "Quick step API Documentation",
    version: "1.0.0",
    description:
      "Real-time live location tracking app in Flutter - Backend API",
  },
  host,
  basePath: "/api/v1",
  schemes: process.env.NODE_ENV === "production" ? ["https"] : ["http"],
  securityDefinitions: {
    JWT: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
    },
  },
  paths,
  // consumes: ["multipart/form-data"],
  definitions,
};

export default config;
