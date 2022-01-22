const express = require('express')
const router = express.Router()

const DB = require("../database/connection.js")

const Prevention = require("sqlstring")


router.get("/", (req, res) =>{
  DB.query(`SELECT * FROM posts`, (err, blogPost)=>{

    if(err){

        console.log(err)
    }else{

        res.render("home.ejs", {blogPost})
    }


  })
})

router.get("/create", (req, res) =>{

  res.render("create.ejs")

})

router.post("/create", (req, res) =>{

  const post = req.body

  DB.query(`INSERT INTO posts (title, image_url, content)
   VALUES (${Prevention.escape(post.title)}, ${Prevention.escape(post.image_url)}, 
   ${Prevention.escape(post.content)})`, (err, result)=>{
      if(err){

          console.log(err)
      }else{

        res.redirect("/")
      
      }


  })
  
})


router.get("/show/:post_id", (req, res) =>{

    const post_id = req.params.post_id

    DB.query(`SELECT * FROM posts WHERE post_id = "${post_id}" LIMIT 1`, (err, blog)=>{
        if(err){

            console.log(err)
        }else{
  
          res.render("show.ejs", {blog})
        }

  
    })
    
  })

  router.get("/edit/:post_id", (req, res) =>{

    const post_id = req.params.post_id

    const posts = req.body

    DB.query(`SELECT * FROM posts WHERE post_id = "${post_id}" LIMIT 1`, (err, blog)=>{
        if(err){

            console.log(err)
        }else{
  
          res.render("edit.ejs", {blog})
        
        }

  
    })
    
  })


  router.put("/edit/:post_id", (req, res) =>{

    const post = req.body
    const post_id = req.params.post_id

    DB.query(`UPDATE posts SET title=${Prevention.escape(post.title)}, image_url=${Prevention.escape(post.image_url)},
    content=${Prevention.escape(post.content)}
    WHERE post_id= "${post_id}"`, (err, result)=>{
        if(err){
console.log(err)
   
        }else{

              console.log("Updated")
              console.log(post)
             
         res.redirect("/")
        }

  
    })
    
  })

  router.get("/delete/:post_id", (req, res) =>{

    const post_id = req.params.post_id

    DB.query(`DELETE FROM posts WHERE post_id = "${post_id}"`, (err, result)=>{
        if(err){
console.log(err)   
        }else{
              console.log("Blog post delete!")
         res.redirect("/")
        }

  
    })
    
  })

  
module.exports = router