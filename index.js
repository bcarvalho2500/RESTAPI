const { response } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

const connectionString = "mongodb+srv://admin:mongodbpassword@cluster0.kwtze.mongodb.net/Cluster0?retryWrites=true&w=majority"
mongoose.connect(connectionString,
    {
        useNewUrlParser : true,
        useUnifiedTopology : true
    },
    (err,response)=>{
        if(err){
            console.log(err)
            console.log("There was an error connecting to MongoDB")
        }else{
            console.log("Connection to MongoDB was successful")
        }
    }
    );

const mySchema = new mongoose.Schema({

    zipcode : Number
})

const model = mongoose.model("BostonAirBnB", mySchema, "BostonAirBnB")
app.get("/",(req,res)=>{
    
    const zipcode = req.query['zipcode']
    if(zipcode !== undefined){
        model.find({"zipcode": zipcode},(err,data)=>{
            if (err) {
                console.log("Error getting data")
            }else{
                res.json(data)
            }
        })
    }else{
        res.status(400).json({"Error":"Error the code should be zipcode"})
    }
})
app.listen(port, ()=>{
    console.log("Server is listening");
})