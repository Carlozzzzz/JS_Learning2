import Book from './book.js';
import EBook from './ebook.js';

const book = new Book("Minime", "Carlos123", "200.00");
const eBook = new EBook("Magasi", "Binibini", "30.00", "3mb");

console.log(book.getInfo());
console.log(eBook.getInfo());