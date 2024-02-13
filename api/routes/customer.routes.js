import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import CustomerController from "../controllers/CustomerController.js";

const route = express.Router();

route.use(
  cors({
    origin: `${process.env.FRONT_URL}`,
    credentials: true,
    optionsSuccessStatus: 200,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
route.use(
  bodyParser.json({
    extended: true,
  })
);
route.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
route.use(cookieParser());

// mobile api routes Start

route.post("/customerauth", CustomerController.login);

route.post("/forgotpassword", CustomerController.forgetPassword);

// mobile api routes End

// Web api routes Start

route.get("/", CustomerController.getCustomer);

route.get("/details", CustomerController.editCustomer);

route.post("/add", CustomerController.insertCustomer);

route.put("/update", CustomerController.updateCustomer);

route.delete("/multidelete", CustomerController.deleteMultipleCustomers);

route.get("/country", CustomerController.getCountry);

route.get("/state", CustomerController.getStateByCountryId);

route.get("/autocomplete", CustomerController.searchByCourseName);

// Web api routes Start

export default route;
