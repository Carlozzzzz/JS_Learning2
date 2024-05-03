function sampleTryCatch() {
    try {
        let a = "ASDASD";
        let b = 2;
        a.toLowerCase();
        console.log(a, b);
        b.toLowerCase();
    } catch (error) {
        console.log(error);
    } finally {
        console.log("Always output this.");
    }
}

// sampleTryCatch()



/**
 * Custom Error
 */

class CustomError extends Error{
    constructor(msg) {
        super(msg);
    }
}

try {
    let obj = new CustomError("Sample");
    
    if(10 != 20) 
        throw new CustomError("10 is not equal to 20");
} catch (error) {
    console.log(error);
}

function f() {
    const err = new Error();

    Object.assign(err, {
        name: "ServiceError",
        code: "service/some-string-code",
        message: "Some message"
    });

    throw err;
}

try {
    f();
} catch (err) {
    console.log(err instanceof Error);
}