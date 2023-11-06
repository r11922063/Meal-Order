import express from 'express';

const router = express.Router();
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'build'))
});

export default router;