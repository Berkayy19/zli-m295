import express, {response} from 'express';
import * as fs from "node:fs";
const app = express();
const port = 3000;

const books = [
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

app.post('books', (req, res) => {
    const { isbn, title, year, author } = req.body;
    const book = {
        isbn,
        title,
        year,
        author
    }
    books.push(book);
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

app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});
