import express from 'express';

const app = express();
const port = 3000;

app.get('/public', (_request, response) => {
    response.send('Hello World!');
});

app.get('/private', (request, response) => {
    if (!request.headers['authorization']) {
        response.set('WWW-Authenticate', 'Basic realm="ZLI Server"');
        return response.sendStatus(401);
    }
    const credentials = request.headers['authorization'].replace('Basic ', '');
    const [username, password] = Buffer.from(credentials, 'base64').toString().split(":");

    if(username === "zli" && password === "zli1234") {
        response.send('Super, du bist eingeloggt');
    } else {
        response.sendStatus(401);
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});