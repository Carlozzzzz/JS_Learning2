import MyCustomError from './customErrors.js';

console.log("sample exercise");

const tryCatchButton = document.querySelector("#tryCatchButton");


tryCatchButton.addEventListener("click", function() {
    try {
        testFunction()
    } catch(error) {
        console.log(error);
    }

});



// functions
function testFunction() {
    console.log("This is test function");
    throw new MyCustomError("this is an build in error.");
}