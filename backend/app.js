import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import http from 'http';
import 'dotenv/config';
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"
import SendMail from './models/mail.model.js';

import indexRouter from './routes/index.js'
import usersRouter from './routes/users.js'
import settlementRouter from './routes/Settlement.route.js'
import allMealsRouter from './routes/allMeals.route.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const server = http.createServer(app);


app.use(cors());
app.set('port', process.env.PORT);
server.listen(process.env.PORT, () => {
  console.log(`server listen on ${process.env.PORT}`);
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

// Router set up
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/allMeals', allMealsRouter);
app.use('/settlement', settlementRouter);


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// SendMail({to: 'r11922125@csie.ntu.edu.tw', subject: 'nodemailer test', text: 'Hi, this is nodemail test.'})

export default app;