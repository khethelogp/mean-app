const express =  require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./models");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connected to DB");
}).catch((err) => {
    console.log("could not connect to the db!", err);
    process.exit();
});


// simple routes
app.get('/', (req, res) => {
    res.json({message: 'Hello world!!'});
});

require("./routes/tutorial.routes.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT} :)`);
});