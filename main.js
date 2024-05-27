// Utility Function
let mouse = {
    x: innerWidth /2,
    y: innerHeight/2
}
window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
let colorArray = [
    "#ef476f",
    "#ffd166",
    "#06da0",
    "#118ab2",
    "#073b4c"
]

function randomColor(colors){
    let randomNum = Math.floor(Math.random() * colors.length);
    return colors[randomNum];
}

// Canvas
let canvas = document.querySelector("#canvas");

let screenWidth = 1000;
let screenHeight = 600;

canvas.width = screenWidth;
canvas.height = screenHeight;

window.addEventListener("resize", () => {
    canvas.width = screenWidth;
    canvas.height = screenHeight;

})

let ctx = canvas.getContext('2d');

// Utility Classes
class Player{
    constructor(x,y,radius,color,velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y, this.radius, 0, Math.PI * 2,false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update(){
        this.draw()
    }

}


class Projectile{
    constructor(x,y,radius,color,velocity,force){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity
        this.force = force
        this.counter = 0;

    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y, this.radius, 0, Math.PI * 2,false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update(){
        this.velocity.y += this.force.gravity;

        // Apply friction to both x and y velocities
        this.velocity.x *= this.force.friction;
        this.velocity.y *= this.force.friction;


        if(this.y + this.velocity.y > (canvas.height - this.radius) || this.y < this.radius){
            this.velocity.y = -this.velocity.y;
            this.velocity.y = 0;

        } 
        if(this.x > (canvas.width - this.radius) || this.x < this.radius){
            this.velocity.x = -this.velocity.x ;


        }
        this.x += this.velocity.x ;
        this.y += this.velocity.y;


        this.draw()

    }

}

// Utility Variables
// Player
let radius = 30;
let playerCoordinate = {
    x: radius,
    y: canvas.height - 30
}

let player = new Player(playerCoordinate.x,playerCoordinate.y, radius,"red", {x:0,y:0});


// Projectiles
let projectiles = [];
// let projectile = new Projectile(playerCoordinate.x,playerCoordinate.y,10,"blue", {x:0,y:0});
window.addEventListener("click", (e) => {
    let projectileCoordinate = {
        x: playerCoordinate.x,
        y: playerCoordinate.y
    }
    const angle = Math.atan2(e.clientY - playerCoordinate.y, e.clientX - playerCoordinate.x);
    console.log(angle)
    let velocity = {
        x: Math.cos(angle) * 20,
        y: Math.sin(angle) * 20
    }

    let force = {
        gravity: 0.2,
        friction: 0.99
    }
    projectiles.push(new Projectile(projectileCoordinate.x, projectileCoordinate.y,10,"blue", velocity, force))
})
// Animation Loop
function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width, canvas.height)

    player.update()

    projectiles.forEach((projectile,index) => {
        projectile.update();
    })
}

animate()


