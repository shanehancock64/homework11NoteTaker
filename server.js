const express = require('express');
const fs = require('fs');
const path = require('path');


// Init App & create port==========================================================================================

const app = express();
const PORT = process.env.PORT || 3001;

// Setup Parse & Static Folder=======================================================================================

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('public'));

// Get routes for ALL routes=========================================================================================
//index.html

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname, './public/index.html'));
//   });
;
// Get route=====================================================================================================
app.get("/api/notes", async (req, res) => {
  let parsedData;
  fs.readFile("./db/db.json", "utf-8", async (err, data) => {
    if (err) throw err;
    parsedData = await JSON.parse(data);
    return res.json({
      parsedData,
    });
  });
});
// app.get('/api/notes', (req, res) => {
//   let parsedData;
//     fs.readFile('./db/db.json', 'utf-8', async (err, data) => {
//         if (err) throw err;

//         parsedData = await JSON.parse(data);
        
        
       
//     })
//     res.json({
      
//       parsedData
//   });
// });
// Post routes======================================================================================================

app.post('/api/notes', (req, res) => {
            fs.readFile('./db/db.json', 'utf-8', (err, data) => {
                if (err) throw err;

                const parsedData = JSON.parse(data);
                const newNote = req.body;

                parsedData.push(newNote);

                fs.writeFile('./db/db.json', JSON.stringify(parsedData), (err) => {
                    if (err) throw err;
                    console.log('The file has been saved!');
                });
                res.json(parsedData);



            })
          });
// Delete routes====================================================================================================



// Listener for Port================================================================================================
app.listen(PORT, () => console.log(`My Guy we are listening on Port: ${PORT}`));