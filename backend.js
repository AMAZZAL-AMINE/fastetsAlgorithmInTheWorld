const filename = "contact.txt";
const fs = require('fs');
const readline = require('readline');

//hna tankriyi wahd l object dyal readline (interface)
const rl = readline.createInterface({
    input: fs.createReadStream(filename), //hna tan3tiwh file dyalna li kanbghiw n9raw menh
    crlfDelay: Infinity
});

let usernames = [];

//hna tanqraw ster b ster o tanpushiwh l array dyalna
rl.on('line', (line) => {
    usernames.push(line);
});

const express = require('express');
const app = express();
const cors = require('cors'); //hna tan3tiwh l package dyal cors li katkhlina n3mlu request mn front end l backend
const port = 3000;
app.use(cors()); 

app.get('/', (req, res) => {
    res.send('lmashakil f mixico');
});

app.get('/usernames', (req, res) => {
    const { page, limit } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    //check if set letter query
    if (req.query.letter) {
        const letter = req.query.letter;
        res.json(usernames.filter(username => username[0].toLowerCase() === letter));
    }else 
        res.json(usernames.slice(startIndex, endIndex));
});

app.listen(port, () => {
    console.log(`lbdaya bdat f mixico ohohoho :  http://localhost:${port}`);
});

rl.on('close', () => {
    console.log("kslik lmjnon");
});
