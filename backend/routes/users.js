import express from 'express';

const router = express.Router();
router.get('/', function(req, res, next) {
  res.json({msg: 'respone of /users'});
});

export default router;