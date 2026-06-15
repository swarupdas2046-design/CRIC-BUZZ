import express from "express";
import homeRoute from "./home/route.js";
import seriesRoute from "./series/route.js";
import matchRoute from "./match/route.js";


const router = express.Router();

router.use("/home", homeRoute);
router.use("/series", seriesRoute);
router.use("/matches", matchRoute);


export default router;
