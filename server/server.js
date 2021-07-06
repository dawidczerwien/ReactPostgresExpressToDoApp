const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./database_connection');

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Test");
})

// upload new todo

app.post('/todo', async (req, res) => {
    try {
        //const { descr } = req.body;
        const query = await pool.query("INSERT INTO todo(descr) VALUES($1)", [req.body.descr]);
        res.json({ message: "Succes! new todo inserted" });
    } catch (error) {
        console.error(error.message);
    }
});

// get all todo's
app.get('/todo', async (req, res) => {
    try {
        const query = await pool.query("SELECT * FROM todo");
        res.json(query.rows);
    } catch (error) {
        console.error(error.message);
    }
});

//get specific todo

app.get('/todo/:id', async (req, res) => {
    try {
        const query = await pool.query("SELECT * FROM todo WHERE todo_id=$1", [req.params.id]);
        res.json(query.rows);
    } catch (error) {
        console.error(error.message);
    }
})

// update specific todo

app.put('/todo/:id', async (req, res) => {
    try {
        const query = await pool.query("UPDATE todo set descr = $2 WHERE todo_id = $1", [req.params.id, req.body.descr]);
        res.json({ message: "Succes! todo updated" });
    } catch (error) {
        console.error(error.message);
    }
})

//delete specifit todo

app.delete('/todo/:id', async (req, res) => {
    try {
        const query = await pool.query("DELETE FROM todo WHERE todo_id = $1", [req.params.id]);
        res.json({
            message: "Succes! todo deleted"
        })
    } catch (error) {
        console.error(error.message);
    }
})

// run server

app.listen(3000, async function () {
    console.log('Example app listening on port 3000!');
});
