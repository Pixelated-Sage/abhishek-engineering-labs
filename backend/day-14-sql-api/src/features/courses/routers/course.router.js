import {Router} from 'express';
import getCourses from '../controllers/getCourses.controller.js';
import getCourseById from '../controllers/getCourseById.controller.js';
import getCoursesByQuery from '../controllers/getCourseByQuery.controller.js';


const router = Router();


router.get("",getCourses);
router.get("/find",getCoursesByQuery);
router.get("/:id", getCourseById);

export default router;