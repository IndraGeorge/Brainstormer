import express from 'express';
import { setIdea } from '../controllers/post.controller';
import { getIdea } from '../controllers/get.controller';
const router = express.Router();

router.get('/', getIdea);

router.post('/', setIdea);

module.exports = router;
