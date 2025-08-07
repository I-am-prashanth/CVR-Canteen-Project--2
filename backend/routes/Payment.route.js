import express from "express";
import { findToken, generateToken, getkey, getProducts, topay, verifyPayment } from "../controller/patment.controller.js";

const router=express.Router()

router.post("/topay",topay);
router.post("/generateToken/:id",generateToken);
router.post("/getprod",getProducts);
router.get("/getKey",getkey);
router.post("/verify",verifyPayment);
router.post("/gettoken",findToken);

export default router;