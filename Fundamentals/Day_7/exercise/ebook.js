import Book from './book.js';

class EBook extends Book{
    constructor(title, author, price, fileSize) {
        super(title, author, price);
        this.fileSize = fileSize;
    }

    getInfo() {
        return `Title: ${this.title}, Author: ${this.author}, Price: ${this.price}, FileSize: ${this.fileSize}`;
    }
}

export default EBook;