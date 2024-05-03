/**
 * OOP
 */

class Book {
    constructor (title, author, price) {
        this.title = title,
        this.author = author,
        this.price = price
    }

    setTitle(title) {
        this.title = title;
    }

    getTitle() {
        return this.title;
    }

    setAuthor (author) {
        this.author = author;
    }

    getAuthor () {
        return this.author;
    }

    setPrice (price) {
        this.price = price;
    }

    getPrice() {
        return this.price;
    }

    getAll() {
        console.log(`Title: ${this.title}, Author: ${this.author}, Price${this.price}`);
    }
}

class EBook extends Book {
    constructor (title, author, price, link) {
        super(title, author, price);
        this.link = link;
    }

    getLink() {
        return this.link;
    }

    setLink(link) {
        this.link = link;
    }

    displayEbook() {
        console.log(`Title: ${this.title}, Link: ${this.link}`);
    }
}

// Run
// let attackOnTitanObj = new AttackOnTitanBook('Attack on Titan', 'Carlos', '$20');
// attackOnTitanObj.getAll();



/**
 * Prototype
 */

let attackOnTitan = new EBook("Attack on Titan.", "www.google.com");
attackOnTitan.displayEbook();