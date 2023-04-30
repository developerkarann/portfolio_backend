const mongoose = require('mongoose');

// const mongo_url = "mongodb+srv://karanpal03040:myportfolio@cluster0.fzxwelk.mongodb.net/portfolio_data?retryWrites=true&w=majority";
const mongo_url = process.env.DATABASE;

const mongoConnection = ()=>{
    mongoose.connect(mongo_url).then(()=>{
        console.log("Database connected")
    }).catch((error)=>{
        console.log(error.message)
    })
}

module.exports = mongoConnection;