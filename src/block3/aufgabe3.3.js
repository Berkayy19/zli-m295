import express, {response} from 'express';
import * as fs from "node:fs";
const app = express();
const port = 3000;

app.get('/now', (req, res) => {
    const currentTime = new Date().toISOString();

    res.send(currentTime);
});

app.get('/zli', (req, res) => {
    res.redirect('https://www.zli.ch');
});

app.get('/name', (req, res) => {
    const names =["Max", "Moritz", "Anna", "Lena", "Paul", "Laura", "Tim", "Sophie", "Ben", "Lisa",
        "Jonas", "Emma", "Leon", "Mia", "Lukas", "Nina", "Felix", "Sarah", "Tom", "Julia"];
    const randomName = names[Math.floor(Math.random() * names.length - 1)];
    res.send(`Zufälliger Name: ${randomName}`);
})

app.get('/html', (req, res) => {
    res.readFile('./test.html', 'utf8', (err, data) => {
        res.send(data)
    })
})

app.get('/image', (req, res) => {
    fs.readFile('./image.jpg', function(err, image){
        res.writeHead(200, {'Content-Type': 'image/jpg'});
        res.end(image);
    })
})

app.get('/teapot', (req, res) => {
    res.status(418).send('Im a teapot');
})

app.get('/user-agent', async (req, res) => {
    const userAgent = req.headers['user-agent'];
    res.send(userAgent);
})

app.get('/secret', (req, res) => {
    res.status(403).send('Forbidden')
})

app.get('xml', (req, res) => {
    res.set('Content-Type', 'application/xml');
    res.send('<message>Hello, this is an XML response!</message>');
})

app.get('me', (req, res) => {
    res.json({
        name: "Berkay Cinoglu",
        age: 18,
        Wohnort: "Kloten",
        Augenfarbe: "Braun"
    });
})

app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});

