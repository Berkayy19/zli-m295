import express from 'express';
const app = express();
const port = 3000;

app.get('/now', (req, res) => {
    const currentTime = new Date().toISOString();

    res.status(200)
        .header('Content-Type', 'application/json')
        .json({ currentTime: currentTime });
});

app.get('/zli', (req, res) => {
    res.redirect('https://www.zli.ch');
});

app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});