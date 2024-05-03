class Book {
    constructor(title, author, price) {
        this.title = title;
        this.author = author;
        this.price = price;
    }


    getInfo() {
        return `Title: ${this.title}, Author: ${this.autor}, Price: ${this.price}`;
    }
}

export default Book;