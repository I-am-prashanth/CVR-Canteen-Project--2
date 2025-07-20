import express from "express";
import { generateToken, topay } from "../controller/patment.controller.js";

const router=express.Router()

router.post("/topay",topay);
router.post("/generateToken/:id",generateToken);

export default router;