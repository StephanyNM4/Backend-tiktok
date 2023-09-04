"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuario_controllers_1 = require("../controllers/usuario.controllers");
let router = express_1.default.Router();
router.post('/login', usuario_controllers_1.login);
router.get('/:id/usuario/tiktoks', usuario_controllers_1.tiktoksUsuariosSeguidos);
exports.default = router;
