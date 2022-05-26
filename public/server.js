const express = require('express');
const fs = require('fs');

// Init App & create port.
const app = express();
const PORT = process.env.PORT || 3001;

// Setup Parse & Static Folder
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('public'));

app.listen(PORT, () => console.log(`My Guy we are listening on Port: ${PORT}`));

// Create list of routes

// Get routes for ALL routes

// Get routes

app.get('/api/notes', (req, res) => {
    fs.readFile('../db/db.json', 'utf-8', (err, data) => {
        if (err) throw err;

        const parsedData = JSON.parse(data);
        console.log(parsedData);
        res.json({
            message: 'Great Success!!!',
            parseData
        });
    })

});
// Post routes

app.post('/api/notes', (req, res) => {
            fs.readFile('../db/db.json', 'utf-8', (err, data) => {
                if (err) throw err;

                const parsedData = JSON.parse(data);
                const newNote = req.body;

                parsedData.push(newNote);

                fs.writeFile('../db/db.json', JSON.stringify(parsedData), (err) => {
                    if (err) throw err;
                    console.log('The file has been saved!');
                });
                res.json(parsedData);



            })
          });



// Delete routes

