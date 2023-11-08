const mongoose = require('mongoose')


const HouseSchema = mongoose.Schema({
    "_id": Number,
    "address": String,
    "county": String,
    "description": String,
    "price": Number,
    "photo": String  
})


const UserSchema=mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index:{unique:true}
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male','Female','Rather Not to Say'],
        default: 'Rather Not to Say'
    },
    role: {
        type: String,
        enum: ['customer','realtor'],
        default: 'customer'
    }
})


const EnquirySchema=mongoose.Schema({
    ename:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    remarks: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: new Date()
    }
})


const Houses=mongoose.model('House',HouseSchema)
const Users=mongoose.model('User',UserSchema)
const Enquiries=mongoose.model('Enquiry',EnquirySchema)


module.exports={Houses,Users,Enquiries}
