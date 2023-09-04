"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarHashtag = exports.agregarHashtag = exports.obtenerTiktoksDeHashtag = exports.obtenerHashtags = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const hashtags_schema_1 = require("../models/hashtags.schema");
const obtenerHashtags = (req, res) => {
    hashtags_schema_1.HashtagSchema.find()
        .then((result) => {
        res.send({ status: true, message: 'Hashtags mostrados', result });
        res.end();
    }).catch((error) => {
        res.send(error);
        res.end();
    });
};
exports.obtenerHashtags = obtenerHashtags;
const obtenerTiktoksDeHashtag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashtagId = req.params.id;
        const result = yield hashtags_schema_1.HashtagSchema.aggregate([
            {
                $lookup: {
                    from: 'tiktoks',
                    localField: 'id',
                    foreignField: 'hashtags.id',
                    as: 'tiktoksHashtags',
                },
            },
            {
                $match: {
                    _id: new mongoose_1.default.Types.ObjectId(hashtagId),
                },
            },
            {
                $project: {
                    tiktoksHashtags: true,
                },
            },
        ]).exec();
        res.send(result);
        res.end();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});
exports.obtenerTiktoksDeHashtag = obtenerTiktoksDeHashtag;
const agregarHashtag = (req, res) => {
    let hashtag = new hashtags_schema_1.HashtagSchema(req.body);
    hashtag.save()
        .then((result) => {
        res.send({ status: true, message: 'Hashtag agregado', result });
        res.end();
    }).catch((error) => {
        res.send(error);
        res.end();
    });
};
exports.agregarHashtag = agregarHashtag;
const eliminarHashtag = (req, res) => {
    hashtags_schema_1.HashtagSchema.deleteOne({ _id: new mongoose_1.default.Types.ObjectId(req.params.id) })
        .then((result) => {
        res.send({ status: true, message: 'Hashtag eliminado', result });
        res.end();
    }).catch((error) => {
        res.send(error);
        res.end();
    });
};
exports.eliminarHashtag = eliminarHashtag;
// export const login = (req: Request, res: Response) => {
// }
