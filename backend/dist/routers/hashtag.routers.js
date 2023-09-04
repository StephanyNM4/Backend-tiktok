"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hashtags_controllers_1 = require("../controllers/hashtags.controllers");
let router = express_1.default.Router();
//(coleccion hashtags) get todos los hashtags
//http://localhost:8088/hashtags/
router.get('/', hashtags_controllers_1.obtenerHashtags);
//(coleccion hashtags) get tiktok segun el hashtag (cruce )
//http://localhost:8088/hashtags/:id/hashtag/tiktoks
router.get('/:id/hashtag/tiktoks', hashtags_controllers_1.obtenerTiktoksDeHashtag);
//(coleccion hashtags) put agregar hashtag (se agrega uno con videos en 0)
//http://localhost:8088/hashtags/agregar
router.put('/agregar', hashtags_controllers_1.agregarHashtag);
//http://localhost:8088/hashtags/:id/hashtag/eliminar
router.delete('/:id/hashtag/eliminar', hashtags_controllers_1.eliminarHashtag);
exports.default = router;
