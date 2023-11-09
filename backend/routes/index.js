import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    status: "ok",
    date: new Date().toUTCString(),
  });
});

router.get("/healthcheck", function (req, res, next) {
  res.status(200).json({
    status: "ok",
  });
});

export default router;
