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

router.get("/show/:post_id", (req, res) =>{

    const post_id = req.params.post_id

    DB.query(`SELECT * FROM posts WHERE post_id = "${post_id}" LIMIT 1`, (err, getPost)=>{
        if(err){

            console.log(err)
        }else{
  
          res.render("show.ejs", {getPost})
        }

  
    })
    
  })

  router.get("/edit/:post_id", (req, res) =>{

    const post_id = req.params.post_id

    const posts = req.body

    DB.query(`SELECT * FROM posts WHERE post_id = "${post_id}" LIMIT 1`, (err, getPost)=>{
        if(err){

            console.log(err)
        }else{
  
          res.render("edit.ejs", {getPost})
        }

  
    })
    
  })

module.exports = router