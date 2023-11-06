import express from 'express';
import { query } from "../models/db.model.js";

const router = express.Router();
router.get('/', function(req, res, next) {
    console.log("In router");
    query(`SHOW DATABASES`, []);
    
    res.json({msg: 'respone of /allMeals'});
});

export default router;