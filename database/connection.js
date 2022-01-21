const mysql = require('mysql')

const DB = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database:'blog'
})


DB.connect((err)=>{

    if(!err){

        console.log("connected to database")
        DB.query(`SELECT 1 FROM posts`, (err, result)=>{

            if(err){
                console.log("creating table posts")
                DB.query(`CREATE TABLE posts(
                    post_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
                    title VARCHAR(100) NOT NULL,
                    image_url TEXT NOT NULL,
                    content VARCHAR(500) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`)
                    console.log("table created")
            } else{

                console.log("Table posts already exists")
            }
        })

    } else {
        console.log("Database connection could not be established")
    }
})

module.exports = DB