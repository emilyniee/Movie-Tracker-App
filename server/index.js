const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'movieReviewSystem',
});

app.post('/create', (req,res) => {
    const name = req.body.name;
    const type = req.body.type;
    const date = req.body.date;
    const review = req.body.review;

    db.query(
        'INSERT INTO movies (name, type, date, review) VALUES (?,?,?,?)', 
        [name, type, date, review], 
        (err, result) => {
            if (err){
                console.log(err)
            }else {
                res.send("Values inserted")
            }
        }
    );
});

app.get('/movies', (req,res) => {
    db.query('SELECT * FROM movies', (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.send (result)
        }
    })
})

app.put('/update', (req,res) => {
    const id = req.body.id;
    const date = req.body.date;
    db.query(
        'UPDATE movies SET date = ? WHERE id = ?', 
        [date, id], 
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send (result)
            }
        }
    );
})

app.delete('/delete/:id', (req,res) => {
    const id = req.params.id;
    db.query(
        "DELETE FROM movies WHERE id = ?",
        id,
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send (result)
            }
        }
    );
});

app.listen(3001, ()=>{
    console.log("your server is running on port 3001")
});