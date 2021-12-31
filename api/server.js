const express = require('express');
const { range } = require('express/lib/request');
const app = express();
const mysql = require('mysql');
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Koneksi Database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'media_social'

});

// SQL Syntax
// Create
app.post('/posts',(req, res) => {
    let sql = "INSERT INTO posts SET post_date=NOW()"
              +", username='"+req.body.username
              +"', post='"+req.body.post+"'";
    
    db.query(sql, (err, results) => {
        if(err) throw err;
        res.json({"status": 200,
                  "message": "data berhasil disimpan",
                  "data":null});
    });
});    

// Retrive
// Seluruh Data
app.get('/posts',(req, res) => {
    let sql = "SELECT post_id, username, post, DATE_FORMAT(post_date, '%W %D %M %Y %H:%i') as post_date FROM posts";
    
    db.query(sql, (err, results) => {
        if(err) throw err;
        res.json({"status": 200,
                  "message": "data berhasil diambi",
                  "data":results});
    });
});

// Seluruh Data Berdasarkan ID
app.get('/posts/id/:id',(req, res) => {
    let sql = "SELECT a.postId, a.username, a.post, DATE_FORMAT(a.post_date, '%W %D %M %Y %H:%i') as post_date, c.image FROM posts a LEFT JOIN users c ON c.username=a.username WHERE a.postId='"+req.params.id+"'";
    
    db.query(sql, (err, results) => {
        if(err) throw err;
        res.json({"status": 200,
                  "message": "data berhasil diambil",
                  "data":results});
    });
});

app.put('/users/username' ,(req,res) => {
    const Name = req.body.name
    const Image = req.body.image
    const Bio = req.body.bio

    db.query (
        "UPDATE users SET name='"+ req.body.name +"', image='"+ req.body.image+"', bio='"+req.body.bio+"' WHERE username='"+req.body.username+"'",
        (err,result) => {
            console.log(err);
        }
    )
})

// Seluruh Data Berdasarkan Username
app.get('/posts/username/:username',(req, res) => {
    let sql = "SELECT a.postId, a.username, a.post, DATE_FORMAT(a.post_date, '%W %D %M %Y %H:%i') as post_date, c.image FROM posts a LEFT JOIN users c ON c.username=a.username WHERE a.username='"+req.params.username+"'";
    
    db.query(sql, (err, results) => {
        if(err) throw err;
        res.json({"status": 200,
                  "message": "data berhasil diambil",
                  "data":results});
    });
});

// Seluruh Data Berdasarkan Username
app.get('/home/:username',(req, res) => {
    let home = "SELECT a.postId, a.username, a.post, DATE_FORMAT(a.post_date, '%W %D %M %Y %H:%i') "
                +"as post_date, a.likes, a.comments, c.image "
                +"FROM posts a LEFT JOIN users c ON c.username=a.username "
                +"WHERE a.username='"+req.params.username+"' ORDER BY postId DESC";
    
    db.query(home, (err, results) => {
        if(err) throw err;
        res.json({"status": 200,
                  "message": "data berhasil diambil",
                  "data":results});
                  console.log(results);
    });

});


app.get('/likes/:username',(req, res) => {
    let home = "SELECT postId, likeId "
    +"FROM likes "
    +"WHERE username='"+req.params.username+"'";
    
    db.query(home, (err, results) => {
        if(err) throw err;
        res.json({"status": 200,
        "message": "data berhasil diambil",
        "data":results});
        console.log(results);
    });
    
});

app.get('/profile/:username',(req, res) => {
    let home = "SELECT * "
    +"FROM users "
    +"WHERE username='"+req.params.username+"'";
    
    db.query(home, (err, results) => {
        if(err) throw err;
        res.json({"status": 200,
        "message": "data berhasil diambil",
        "data":results});
        console.log(results);
    });
    
});

app.get('/image/:username',(req, res) => {
    let home = "SELECT image "
    +"FROM users "
    +"WHERE username='"+req.params.username+"'";
    
    db.query(home, (err, results) => {
        if(err) throw err;
        res.json({"status": 200,
        "message": "data berhasil diambil",
        "data":results});
        console.log(results);
    });
    
});

app.get('/comment/:username',(req, res) => {
    let home = "SELECT postId, comment "
    +"FROM comment "
    +"WHERE username='"+req.params.username+"'";
    
    db.query(home, (err, results) => {
        if(err) throw err;
        res.json({"status": 200,
        "message": "data berhasil diambil",
        "data":results});
        console.log(results);
    });
    
});
/*
// Seluruh Data Berdasarkan Username
app.get('/home/:username',(req, res) => {
    let home = "SELECT post_id, username, post, DATE_FORMAT(post_date, '%W %D %M %Y %H:%i') "
                +"as post_date "
                +"FROM posts WHERE username='"+req.params.username+"' ORDER BY post_date";
    
    db.query(home, (err, results) => {
        if(err) throw err;
        res.json({"status": 200,
                  "message": "data berhasil diambil",
                  "data":results});
                  console.log(results);
    });

});
*/
app.get('/auth',(req, res) => {
    let home = "SELECT username,password "
                +"FROM users ";
    
    db.query(home, (err, results) => {
        if(err) throw err;
        res.json({"status": 200,
                  "message": "data berhasil diambil",
                  "data":results});
    });

});

app.post('/register',(req,res) => {

    const Username = req.body.Username
    const Password = req.body.Password
    const Name = req.body.Name
    const Image = req.body.Image
    const Bio = req.body.Bio
    

    db.query(
        "INSERT INTO users (username , password , name , image , bio ) VALUES (? , ? , ? , ? ,?)",
        [Username,Password,Name,Image,Bio],
        (err,result) => {
            console.log(err);
        }
    )
})

app.get('/regis/:username',(req, res) => {
    let home = "SELECT username "
                +"FROM users "
                +"WHERE username='"+req.params.username+"'";
    
    db.query(home, (err, results) => {
        if(err) throw err;
        res.json({"status": 200,
                  "message": "data berhasil diambil",
                  "data":results});
                  console.log(results[0]);
    });

});

// Update
app.put('/posts/id/:id',(req, res) => {
    let sql = "UPDATE posts SET post='"+req.body.post+"' "
              +"WHERE postId='"+req.params.id+"'";
    
    db.query(sql, (err, results) => {
        if(err) throw err;
        res.json({"status": 200,
                  "message": "data berhasil diupdate",
                  "data":null});
    });
});

// Delet
app.delete('/posts/id/:id',(req, res) => {
    let sql = "DELETE FROM posts WHERE postId='"+req.params.id+"'";
    
    db.query(sql, (err, results) => {
        if(err) throw err;
        res.json({"status": 200,
                  "message": "data berhasil dihapus",
                  "data":null});
    });
});

app.use('/images', express.static('../images'));

app.listen(port, () => {
    console.log(`cli-nodejs-api listening at http://localhost:${port}`)
});