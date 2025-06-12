import express, {response} from 'express';
import { randomUUID } from 'node:crypto';
import * as fs from "node:fs";
const app = express();
const port = 3000;
app.use(express.json());

let books = [
    {
        "isbn": "978-3-16-148410-0",
        "title": "Die Entdeckung der Langsamkeit",
        "year": 1983,
        "author": "Sten Nadolny"
    },
    {
        "isbn": "978-0-7432-7356-5",
        "title": "Der Schwarm",
        "year": 2004,
        "author": "Frank Schätzing"
    }]

let lends = [
    {
    "id": "f3d4b6e8-2c9e-4e0c-85a1-b24a2b9b6e7e",
    "customer_id": "12345",
    "isbn": "a89de472-70f4-4f9a-9b7a-fcb176c772db",
    "borrowed_at": "2025-06-12T10:45:00.123Z",
    "returned_at": null
    }
]
app.get('/books', (req, res) => {
    res.send(books);
})

app.get('/books/:isbn', (req, res) => {
    const { isbn } = req.params;
    const book = books.find(b => b.isbn === isbn);
    if (!book) {
        res.status(404).send("Book not found");
    } else{
        res.send(book);
    }
})

app.post('/books', (req, res) => {
    const { isbn, title, year, author } = req.body;
    const book = {
        isbn,
        title,
        year,
        author
    }
    books.push(book);
    res.send(books);

})

app.put('/books/:isbn', (req, res) => {
    const { isbn } = req.params;
    const { title, year, author } = req.body;
    const book = books.find(b => b.isbn === isbn);
    if (!book) {
        res.status(404).send("Book not found");
    } else{
        book.title = title;
        book.year = year;
        book.author = author;
    }
})

app.delete('/books/:isbn', (req, res) => {
    const book = books.find(b => b.isbn === req.params.isbn)
    if (!book) {
        return res.status(404).json({ error: 'Book not found' })
    }
    books.splice(books.indexOf(book), 1)
    res.sendStatus(204)
})

app.patch('/books/:isbn', (req, res) => {
    const { isbn } = req.params;
    const { title, year, author } = req.body;
    const book = books.find(b => b.isbn === isbn);

    if (!book) {
        res.status(404).send("Book not found");
    } else{
        if (title){
            book.title = title
        } else{
            book.title = book.title;
        }
        if (year){
            book.year = year
        } else{
            book.year = book.year;
        }
        if (author){
            book.author = author
        } else{
            book.author = book.author;
        }
    }
    res.json(book)
})

app.get('/lends', (req, res) => res.send(
    res.json(lends)
))

app.get('/lends/:id', (req, res) => {
    const { id } = req.params;
    const lend = lends.find(l => l.id === id);
    if (!lend) {
        res.status(404).send("Lend not found");
    } else{
        res.send(lend);
    }
})

app.post('/lends', (req, res) => {
    const { customer_id, borrowed_at } = req.body;

    const returned_at = "Not returned yet"
    let id = randomUUID();
    while (true) {
        const found = lends.find(l => l.id === id);
        if (!found) break;
        id = randomUUID();
    }

    let isbn = randomUUID();
    while (true) {
        const found = lends.find(l => l.isbn === isbn);
        if (!found) break;
        isbn = randomUUID();
    }

    const lend = {
        id,
        customer_id,
        isbn,
        borrowed_at,
        returned_at
    }
    lends.push(lend);
    res.send(lends);
})

app.delete('/lends/:id', (req, res) => {
    const { id } = req.params;

    const lend = lends.find(l => l.id === id);

    if (!lend) {
        return res.status(404).send({ error: 'Lend not found' });
    }

    if (lend.returned_at) {
        return res.status(400).send({ error: 'Book already returned' });
    }

    lend.returned_at = new Date().toISOString();

    res.send(lend);
});



app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});
