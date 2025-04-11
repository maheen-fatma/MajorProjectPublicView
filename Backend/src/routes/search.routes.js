import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { searchPost, searchUser } from "../controllers/search.controller.js";
const router = Router()
router.use(verifyJWT);

router.route("/post").get(searchPost)
router.route("/user").get(searchUser)
export default router