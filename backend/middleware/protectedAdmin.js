import jwt from "jsonwebtoken";
import { Vendor } from "../models/vendor.model.js";



const Protectuser = async (req, res, next) => {
    try {
       
        // METHOD 1: Parse cookies manually from header as fallback
        let token;
        console.log("token:",req.cookies)
        // First try standard cookie parser method
        if (req.cookies.jwt && req.cookies.jwt.split('.').length === 3) {
            token = req.cookies.jwt;
            console.log(token)
        }
        
        // If not found, parse raw cookie header
        else if (req.headers.cookie) {
            const cookies = req.headers.cookie.split('; ');
            for (const cookie of cookies) {
                if (cookie.startsWith('jwt=')) {
                    const value = cookie.split('=')[1];
                    if (value.split('.').length === 3) {
                        token = value;
                        break;
                    }
                }
            }
        }

        // console.log("Final extracted token:", token); // Debug log
        
        if (!token) {
            return res.status(401).json({ message: "Not authorized, no valid token found" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("decoded",decoded)
        let user = await Vendor.findById(decoded.userId).select()
        
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        req.user = user;
         req.user = {
      ...user.toObject(), // Convert Mongoose document to plain object
    };
        
  
        next();
    } catch (error) {
        console.log("Authentication error:", error);
        return res.status(401).json({ 
            message: "Not authorized",
            error: error.message 
        });
    }
};

export default Protectuser;