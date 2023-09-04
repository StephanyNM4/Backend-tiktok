"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tiktoks_controllers_1 = require("../controllers/tiktoks.controllers");
let router = express_1.default.Router();
//(coleccion tiktoks) get todos los tiktoks
//http://localhost:8088/tiktoks/
router.get('/', tiktoks_controllers_1.obtenerTiktoks);
//(coleccion tiktoks) put agregar tiktok (likes, shares en 0 y comentarios y hashtags arreglos vacios)
//http://localhost:8088/tiktoks/agregar
router.put('/agregar', tiktoks_controllers_1.agregar);
//(coleccion tiktoks) get comentarios del tiktok
//http://localhost:8088/tiktoks/:id/tiktok/comentarios
router.get('/:id/tiktok/comentarios', tiktoks_controllers_1.obtenerComentarios);
//(coleccion tiktoks) put nuevo comentario
//http://localhost:8088/tiktoks/:id/tiktok/nuevo-comentario
router.put('/:id/tiktok/nuevo-comentario', tiktoks_controllers_1.nuevoComentario);
exports.default = router;
