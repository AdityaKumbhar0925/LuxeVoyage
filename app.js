//env
if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}



//PACKAGES IMPORT
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const cusError = require("./utils/cusError.js");
const session = require("express-session"); 
const MongoStore = require('connect-mongo');
const listingRoutes = require("./routes/listingRoutes.js");
const reviewRoutes = require("./routes/reviewRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const flash = require("connect-flash");
const passport = require("passport");
const localStratergy = require("passport-local");
const User = require("./models/user.js");


const port = 8080;


app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.json());
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.set("view engine", "ejs");

const dbURL = process.env.ATLASDB_URL;

const store = MongoStore.create({
    mongoUrl: dbURL,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600
});

store.on("error", () => {
    console.log("ERROR IN MONGO SESSION STORE", err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() +  7 * 24 * 60 * 60 * 1000, //since this is in miliseconds and we have set the limit for 7 days
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}

// app.get("/", (req, res) => {
//     res.send("Root working properly");
// });





//cookies, sessions and flash
app.use(session(sessionOptions));
app.use(flash());

//passport
app.use(passport.initialize());
app.use(passport.session());    
passport.use(new localStratergy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});


// app.get("/demouser", async (req, res) => {
//     let fakeUser = new User({
//         email: "student@gmail.com",
//         username: "Bunny"
//     });

//     let registeredUser = await User.register(fakeUser, "helloworld");
//     res.send(registeredUser);
// });

//routing
app.use("/listings", listingRoutes);
app.use("/listings/:id/reviews", reviewRoutes);
app.use("/", userRoutes);


///MONGOOSE INIT
main().then(() => {
    console.log("Connection Successful with MDB");
})
.catch((err) => {
    console.log(err);
});

async function main() {
    mongoose.connect(dbURL);
}


// SERVER INIT
app.listen(port, (req, res) => {
    console.log("Server is listening");
});



//ERROR HANDLING IMPORTANT!!!!
app.all("*", (req, res, next) => {
    next(new cusError(404, "Page not Found!"));
});

app.use((err, req, res, next) => {
    let {status=500, message="Some Error Occurred"} = err;
     res.status(status).render("error.ejs", {message});
});
