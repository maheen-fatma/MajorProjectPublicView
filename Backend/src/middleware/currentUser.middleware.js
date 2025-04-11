import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

export const currentUserJWT = asyncHandler (async(req,res,next)=>{
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")[1]
    //if(!token) throw new ApiError(401, "Unauthorized request. Token not found")
    if (!token) {
        req.user = null; // Allow request to continue without authentication
        return next();
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    if(!user) throw new ApiError(404, "User not found")
    req.user = user
    next()
})