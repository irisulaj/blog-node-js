const express = require('express')
const router = express.Router()

const DB = require("../database/connection.js")

router.get("/", (req, res) =>{
  DB.query(`SELECT * FROM posts`, (err, getPosts)=>{

    if(err){

        console.log(err)
    }else{

        res.render("home.ejs", {getPosts})
    }


  })
})

module.exports = router