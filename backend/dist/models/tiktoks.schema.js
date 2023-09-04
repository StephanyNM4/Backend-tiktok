"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TiktokSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    id: Number,
    titulo: String,
    fecha: String,
    video: String,
    tituloCancion: String,
    likes: Number,
    shares: Number,
    comentarios: (Array),
    hashtags: (Array)
});
exports.TiktokSchema = mongoose_1.default.model('tiktoks', schema);
