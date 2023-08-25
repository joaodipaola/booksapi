const {v4} = require("uuid");
const fs = require("fs");
const FILE_PATH = require("path").join(__dirname, "books.json");

function findBooks(){
    if(!fs.existsSync(FILE_PATH)) return [];

    const rawData = fs.readFileSync(FILE_PATH);
    return JSON.parse(rawData);
}

function findBook(id){
    return findBooks().find(item => item.id === id);
}

function insertBook(book){
    const books = findBooks();
    book.id = v4();
    books.push(book);
    fs.writeFileSync(FILE_PATH, JSON.stringify(books));
    return book;
}

function updateBook(id, book, overwrite){
    const books = findBooks();
    const index = books.findIndex(item => item.id === id);

    if(index === -1) return {};

    if(overwrite) 
        books[index] = book;
    else{
        for(let key in book){
            books[index][key] = book[key];
        }
    }
    
    fs.writeFileSync(FILE_PATH, JSON.stringify(books));
    return books[index];
}

function deleteBook(id){
    const books = findBooks();
    books.forEach((item, index, array) => {
        if(item.id === id){
            array.splice(index, 1);
        }
    })
    fs.writeFileSync(FILE_PATH, JSON.stringify(books));
    return id;
}

module.exports = {
    findBooks,
    findBook,
    insertBook,
    updateBook,
    deleteBook,
}