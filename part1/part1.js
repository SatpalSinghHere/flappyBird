document.addEventListener("DOMContentLoaded", function () {
    let canvas = document.querySelector('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let c = canvas.getContext('2d');
    //rectangle
    // c.fillStyle = 'rgba(255, 0, 0, 0.5)';
    // c.fillRect(200, 200, 100, 100);

    // //line
    // c.beginPath();
    // c.moveTo(100, 300);
    // c.lineTo(300, 300);
    // c.lineTo(200, 100);
    // c.fillStyle = 'blue';
    // c.stroke();

    // //circle
    // for (let i = 0; i < 5; i++) {
    //     c.beginPath();
    //     c.arc(Math.random() * window.innerWidth,
    //         Math.random() * window.innerHeight,
    //         40, Math.PI * 2, false);
    //     c.fillStyle = 'blue';
    //     c.stroke();
    // }


    // console.log(canvas);
    // let x = 200;
    // let y = 200;
    // let dx = 10;
    // let dy = 10;
    // let radius = 30;
    // function animate() {
    //     requestAnimationFrame(animate);
    //     c.clearRect(0, 0, innerWidth, innerHeight);
    //     c.beginPath();
    //     c.arc(x, y, radius, 0, Math.PI * 2, false);
    //     c.strokeStyle = 'red';
    //     c.stroke();
    //     if (x + radius > innerWidth || x - radius < 0) {
    //         dx = -dx;
    //     }
    //     x += dx;
    //     if (y + radius > innerHeight || y - radius < 0) {
    //         dy = -dy;
    //     }
    //     y += dy;
    // }
    // animate();
    let mouse = {x: undefined, y: undefined};
    document.addEventListener('mousemove', function (event){
        mouse.x = event.x;
        mouse.y = event.y;
    })
    window.addEventListener('resize', function(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    })
    class Circle {
        constructor(x, y, dx, dy, radius, colorOption) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.radius = radius;
            this.color = colorOption;
            this.colors = ['red', 'blue', 'green'];
        }
        draw() {            
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.strokeStyle = this.colors[this.color];
            c.fillStyle = this.colors[this.color];
            c.fill();
            c.stroke();
        }
        update() {            
            this.draw();
            if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
                this.dx = -this.dx;
            }
            this.x += this.dx;
            if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }
            this.y += this.dy;
            console.log(mouse);
            if( mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
                if(this.radius < 50){
                    this.radius += 3;
                }
            }
            else{
                if(this.radius > 5){
                    this.radius -= 3;
                }
            }
        }
    }

    let circleArray = [];
    function init(){
        circleArray = [];
        for(let i = 0; i < 400; i++){
            let x = Math.random() * window.innerWidth;
            let y = Math.random() * window.innerHeight;
            let dx = (Math.random() - 0.5) * 8;        
            let dy = (Math.random() - 0.5) * 8;        
            let radius = Math.random() * 8;
            let colorOption = Math.floor(Math.random() * 3);
            let circle = new Circle(x, y, dx, dy, radius, colorOption);
            circleArray.push(circle);
            
        }
    }

    function animate(){
        requestAnimationFrame(animate);
        c.clearRect(0,0,innerWidth, innerHeight);
        for(let i=0; i< 400; i++){
            circleArray[i].update();
        }
    }
    init();
    animate();
      
})