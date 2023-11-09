import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
// swagger docs
import * as swaggerUi from "swagger-ui-express";
import { readFile } from "fs/promises";
const swaggerFile = JSON.parse(
  await readFile(new URL("./docs/swagger.json", import.meta.url))
);


import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// TODO: Add neccessary routesr
app.use("/api/v1", indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled rejection：", promise, "Reason：", reason);
});

export default app;
