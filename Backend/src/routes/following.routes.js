import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { fetchFollowers, fetchFollowing, followToggle, isFollowing } from "../controllers/following.controller.js";
const router = Router()
router.use(verifyJWT);

router.route("/followToggle/:followed").post(followToggle)
router.route("/is-following/:followed").post(isFollowing)
router.route("/fetchFollowers/:userId").get(fetchFollowers)
router.route("/fetchFollowing/:userId").get(fetchFollowing)
export default router