const express = require("express");

const router = express.Router();

router.get('/', function (req, res) {
    res.render("index", {
        BASE_URL: `${process.env.BASE_URL}:${process.env.PORT}/`
    });
});

router.get('/test', (req, res) => {
    res.send("Http server is working...")
})

module.exports = router;