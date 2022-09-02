import { Router } from "express";
import videoController from "../controllers/video.controller.js";
import checkToken from "../middlewares/checkToken.js";
import validation from "../middlewares/validation.js";

const router = Router();

router.get('/videos', videoController.GET)
router.get("/admin/videos", checkToken, videoController.GET);
router.post("/admin/videos", checkToken, validation, videoController.POST);
router.put("/admin/videos/:videoId", checkToken,validation, videoController.PUT);
router.delete("/admin/videos/:videoId", checkToken, validation, videoController.DELETE);




export default router;
