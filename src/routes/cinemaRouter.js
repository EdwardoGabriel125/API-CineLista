import { Router } from "express";
import {loggarFilmePagina, editarFilmePagina,buscarFilmePagina ,getAllMovies, postAMovie, getAMovie, putAMovie, deleteAMovie} from "../controllers/cinemaController.js";
import {regrasValidacaoCinema} from "../validators/cinemaValidator.js";
import {verificarAuth} from "../middlewares/authMiddleWare.js";
const router = Router();

router.get("/all", getAllMovies);

router.get("/novo", verificarAuth, loggarFilmePagina);

router.get("/buscar", buscarFilmePagina);

router.get("/editar/:id", verificarAuth, editarFilmePagina);

router.post("/logmovie", verificarAuth, regrasValidacaoCinema, postAMovie);

router.get("/get", getAMovie);

router.put("/editar/:id", verificarAuth, regrasValidacaoCinema, putAMovie);

router.delete("/delete/:id", verificarAuth, deleteAMovie);

export default router;