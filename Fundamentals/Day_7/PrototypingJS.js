/**
 * *
 * Reference
 * https://blog.risingstack.com/javascript-prototype-chain-inheritance/#:~:text=()%3B%20%2F%2Fwoof-,The%20Prototype%20Chain,prototype%20chain%2C%20as%20shown%20below.
 * *
 */


/**
 * Constructor
 */
var LivingEntity = function(location){
	this.x = location.x;
	this.y = location.y;
	this.z = location.z;
};

// creating single anonymous function 
LivingEntity.prototype.moveWest = function() {
    this.x--;
}

LivingEntity.prototype.makeSound = function() {
    console.log('Awuuuuuu');
}

// global prototype/variable for this instance
Object.prototype.carlos = 3;

/**
 * New instance
 */
var dog = new LivingEntity({
	x: 5,
	y: 0,
	z: 1
});

dog.makeSound = () => { console.log('Aw Aw Aw') }


/**
 * New Object prototype
 */
var Dragon = function (location){
    LivingEntity.call(this, location);
    this.canFly = true;
}

Dragon.prototype = Object.create(LivingEntity.prototype);
Dragon.prototype.constructor = Dragon;

Dragon.prototype.fly = function (y) {
    this.y += y;
}

/**
 * New instance
 */
var belguim = new Dragon({
    x: 0,
    y: 0,
    z: 0
});

var gennon = new Dragon({
    x: 3,
    y: 10,
    z: 10
});

let locationObject = {
    x: 2,
    y: 2,
    z: 2
};
var belguim2 = new Dragon(locationObject);

/**
 * ************** Run **************
 */
runDragon();


function runDog() {
    
    dog.moveWest();
    dog.makeSound();

    console.log(dog.carlos);
    console.log(dog);
}

function runDragon() {
    console.log(Dragon);

    belguim.fly(2)
    console.log(belguim);

    gennon.fly(18);
    console.log(gennon);

    console.log(belguim2);
}