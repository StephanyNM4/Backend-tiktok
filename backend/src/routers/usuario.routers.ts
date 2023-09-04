import express from 'express';
import { login, tiktoksUsuariosSeguidos} from '../controllers/usuario.controllers';

let router = express.Router();

router.post('/login', login);
router.get('/:id/usuario/tiktoks', tiktoksUsuariosSeguidos);


export default router;