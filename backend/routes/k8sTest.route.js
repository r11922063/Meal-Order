import express from 'express';

const router = express.Router();
const test = async (req, res, next) => {
    res.json({hi: "hi"});
}

router.get('/', test);

export default router;