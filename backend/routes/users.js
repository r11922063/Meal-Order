import express from 'express';

const router = express.Router();
router.get('/', function(req, res, next) {
  console.log('user')
  res.json({msg: 'respone of /users'});
});

export default router;