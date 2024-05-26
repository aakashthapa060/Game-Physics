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
let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;

canvas.width = screenWidth;
canvas.height = screenHeight;

window.addEventListener("resize", () => {
    canvas.width = screenWidth;
    canvas.height = screenHeight;

})

let ctx = canvas.getContext('2d');


class Circle{
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

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width, canvas.height)


}

animate()


