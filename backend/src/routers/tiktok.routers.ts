import express from 'express';
import { agregar, obtenerComentarios, obtenerTiktoks, 
        nuevoComentario } from '../controllers/tiktoks.controllers';

let router = express.Router();

//(coleccion tiktoks) get todos los tiktoks
//http://localhost:8088/tiktoks/
router.get('/', obtenerTiktoks);

//(coleccion tiktoks) put agregar tiktok (likes, shares en 0 y comentarios y hashtags arreglos vacios)
//http://localhost:8088/tiktoks/agregar
router.put('/agregar', agregar);

//(coleccion tiktoks) get comentarios del tiktok
//http://localhost:8088/tiktoks/:id/tiktok/comentarios
router.get('/:id/tiktok/comentarios', obtenerComentarios);

//(coleccion tiktoks) put nuevo comentario
//http://localhost:8088/tiktoks/:id/tiktok/nuevo-comentario
router.put('/:id/tiktok/nuevo-comentario', nuevoComentario)


export default router;
