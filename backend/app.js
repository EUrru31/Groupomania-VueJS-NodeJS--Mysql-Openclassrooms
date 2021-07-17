const express = require("express");
const helmet = require("helmet");
const app = express();
const path = require("path");

//const saucesRoutes = require("./routes/sauces");
const userRoutes = require("./routes/users");
require("dotenv").config();

app.use(helmet());

// Autorisation des requètes
// Accès à l'API depuis n'importe quelle origine
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

// app.use("/images", express.static(path.join(__dirname, "images")));

// app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
