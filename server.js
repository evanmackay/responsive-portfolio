const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const exphbs = require("express-handlebars")
const bodyParser = require("body-parser")
const apiRoutes = require("./routes/api-routes")

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars")

app.use(express.static("public"));

app.use(apiRoutes)

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
