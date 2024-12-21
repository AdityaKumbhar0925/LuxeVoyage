const mongoose = require("mongoose");
const initData = require("../init/data.js");
const Listing = require("../models/listing.js");



///MONGOOSE INIT
main().then(() => {
    console.log("Connection Successful with MDB");
})
.catch((err) => {
    console.log(err);
});

async function main() {
    mongoose.connect('mongodb://127.0.0.1:27017/luxevoyage');
}

async function initDB(){
    await Listing.deleteMany({});
    initData.data = initData.data.map((el) => ({...el,owner: "67605e7f5b1fd3a554e2dd78"}));
    await Listing.insertMany(initData.data);
    console.log("Data was initialzed!");
}

initDB();