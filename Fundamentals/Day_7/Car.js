// OOP
class Car {
    constructor (name, year) {
        this.name = name;
        this.year = year;
    }

    getname() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }
}

// Prototype
function doSomething() {}
doSomething.prototype.foo = "bar";
console.log(doSomething.prototype);
