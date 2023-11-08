const express=require('express')
const allRouter=express.Router()
const multer=require('multer')
let getFields=multer()
const {Houses, Users, Enquiries} = require("../models/allschemas");


allRouter.get("/", async (request, response) => {
    try {
        const housesData = await Houses.find({});
        response.send(housesData);
    } catch (error) {
        response.status(500).send(error);
    }
});



//To store the user data.
allRouter.post("/signup", getFields.none(),async (request, response) => {
    const newuser=new Users(request.body)
    try {
        let user=await newuser.save()
        user = user.toObject();
        response.send(user);
    } catch (error) {
        if(error.code == "11000"){ //duplicate
        response.send(error);
        }else{
        response.status(500).send(error);
        }
    }
});


//To authenticate the user
allRouter.post("/login", getFields.none(),async (request, response) => {
   
    let user=await Users.findOne({email:request.body.email,password:request.body.password})
    try {
        if(user)
            response.send(user);
        else
            response.send('Authentication Failed')
    } catch (error) {
        response.status(500).send(error);
    }
});

//To store the enquiry data.
allRouter.post("/register", getFields.none(),async (request, response) => {
    const newEnquiry=new Enquiries(request.body)
    try {
        let enquiry=await newEnquiry.save()
        enquiry = enquiry.toObject();
        response.send(enquiry);
    } catch (error) {
        response.status(500).send(error);
    }
});

allRouter.get("/allenquiries", async (request, response) => {
    try {
        const allenquiriesData = await Enquiries.find({});
        response.send(allenquiriesData);
    } catch (error) {
        response.status(500).send(error);
    }
});

allRouter.get("/user", async (request, response) => {
    const userData = await Users.find({});
    try {
      response.send(userData);
    } catch (error) {
      response.status(500).send(error);
    }
});



module.exports=allRouter
