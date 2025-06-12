import express, {response} from 'express';
import * as fs from "node:fs";
const app = express();
const port = 3000;

app.get('/now', (req, res) => {
    const tz = req.query.tz || 'UTC';
    try {
        const now = new Date().toLocaleString('sv-SE', { timeZone: tz });
        res.status(200).type('text/plain').send(now);
    } catch (e) {
        res.status(400).type('text/plain').send('Invalid timezone');
    }
});

app.post('/names', (req, res) => {
    let names = ["berkay"]
    const name = req.body.name;
    if (!name) {
        return res.status(400).type('text/plain').send('Name is required');
    }
    names.push(name);
    res.status(201).type('application/json').json({ names });
});

app.delete('/names', (req, res) => {
    let names = ["berkay"]
    const name = req.body.name;
    if (!name) {
        return res.status(400).type('text/plain').send('Name is required');
    }
    names = names.filter(n => n !== name);
    res.status(204).send();
});

app.get('/secret2', (req, res) => {
    const auth = req.get('Authorization');
    if (auth === 'Basic aGFja2VyOjEyMzQ=') {
        res.status(200);
    } else {
        res.status(401);
    }
});

app.get('/chuck', async (req, res) => {
    const name = req.query.name || 'Chuck Norris';
    try {
        const response = await fetch('https://api.chucknorris.io/jokes/random')
        const {value} = await response.json()
        const joke = value.replace(/Chuck Norris/g, name)
        res.status(200).json({joke})
    } catch {
        res.status(500).send('Error fetching joke')
    }
});



app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});

