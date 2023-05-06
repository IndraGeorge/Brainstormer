import express from 'express';
import { setIdea, getIdea } from '../controllers/post.controller';
const router = express.Router();

router.get('/', getIdea);

router.post('/', setIdea);

module.exports = router;
