import { Router } from "express";
import {regrasValidacaoUser} from "../validators/userValidator.js";
import * as userController from "../controllers/usersController.js"

const router = Router()

router.get("/login", userController.loginPage);

router.get("/logout", userController.logout);

router.get("/register", userController.registerPage);

router.post("/register", regrasValidacaoUser, userController.createAUser);

router.post("/login", regrasValidacaoUser, userController.loginAUser);

router.get("/delete", userController.deletePage);

router.delete("/delete", userController.deleteAUser);

export default router;