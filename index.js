const { response } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

const connectionString = "mongodb+srv://admin:pass123@cluster0.ssfeh.mongodb.net/Countries?retryWrites=true&w=majority"
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

    "Country (or dependency)" : String,
    "Population (2020)" : Number,
    "Yearly Change" : String,
    "Net Change" : Number
})

const model = mongoose.model("listCountries", mySchema, "listCountries")
app.get("/",(req,res)=>{
    
    const country= req.query["country"]
    
    if(country !== undefined){
        model.find({"Country (or dependency)": country},(err,data)=>{
            if (err) {
                console.log("Error getting data")
            }else{
                res.json(data)
            }
        })
    }else{
        res.status(400).json({"Error":"Error the key should be country"})
    }
})
app.listen(port, ()=>{
    console.log("Server is listening");
})