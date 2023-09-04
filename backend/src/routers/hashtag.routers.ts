import express from 'express';
import { obtenerHashtags, obtenerTiktoksDeHashtag, agregarHashtag, eliminarHashtag } from '../controllers/hashtags.controllers';

let router = express.Router();

//(coleccion hashtags) get todos los hashtags
//http://localhost:8088/hashtags/
router.get('/', obtenerHashtags);

//(coleccion hashtags) get tiktok segun el hashtag (cruce )
//http://localhost:8088/hashtags/:id/hashtag/tiktoks
router.get('/:id/hashtag/tiktoks', obtenerTiktoksDeHashtag);


//(coleccion hashtags) put agregar hashtag (se agrega uno con videos en 0)
//http://localhost:8088/hashtags/agregar
router.put('/agregar', agregarHashtag);

//http://localhost:8088/hashtags/:id/hashtag/eliminar
router.delete('/:id/hashtag/eliminar', eliminarHashtag);

export default router;
