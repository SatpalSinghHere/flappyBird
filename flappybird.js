document.addEventListener("DOMContentLoaded", function () {
    let canvas = document.querySelector('canvas');
    canvas.width = 500;
    canvas.height = 550;

    let c = canvas.getContext('2d');

    let mouse = { x: undefined, y: undefined };
    document.addEventListener('mousemove', function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    })
    // window.addEventListener('resize', function(){
    //     canvas.width = window.innerWidth;
    //     canvas.height = window.innerHeight;

    // })

    // Random Number between min and max
    function randomIntFromRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }


    //physics
    let g = 0.8;
    // const friction = 0.8;


    //load images
    let birdImage = new Image();
    birdImage.src = './bird-png.png';

    let lowerPipeImage = new Image();
    lowerPipeImage.src = './lower-pipe-png.png';

    let upperPipeImage = new Image();
    upperPipeImage.src = './upper-pipe-png.png';

    //bird class
    class birdObj {
        constructor(image, x, y, width, height) {
            this.image = image;
            this.x = x;
            this.y = y;
            this.dy = 1;
            this.width = width;
            this.height = height;
        }
        draw() {
            c.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
        fall() {
            this.draw();
            if (this.y + this.height > canvas.height || this.y + 30 < 0) {
                start = false;
                gameOver = true;
                openpopup(`Game Over<br>Your Score is ${score}`);
            }

            if (start == true) {
                this.y += this.dy;
                this.dy += g;
            }

        }
    }

    //instanciate objects
    let bird1 = new birdObj(birdImage, 100, 200, 65, 65);
    bird1.draw();
    //placing pipes
    let upperPipeArray = [];
    let lowerPipeArray = [];
    setInterval(function () {
        if (start == true) {
            let lowerPipeY = randomIntFromRange(150, 500);
            let upperPipeY = randomIntFromRange(lowerPipeY - 200, lowerPipeY - 150);
            lowerPipeArray.push(new lowerPipeObj(lowerPipeImage, 500, lowerPipeY, 100, 600));
            upperPipeArray.push(new upperPipeObj(upperPipeImage, 500, upperPipeY - 600, 100, 600));
            console.log(lowerPipeArray, upperPipeArray);
        }
    }, 2000);

    //pipe class
    let score = 0;
    class lowerPipeObj {
        constructor(image, x, y, width, height) {
            this.image = image;
            this.x = x;
            this.y = y;
            this.dx = 2.5;
            this.width = width;
            this.height = height;
            this.passed = false;
        }
        draw() {
            c.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
        move() {
            this.draw();

            if (this.x + this.width < -800) {
                lowerPipeArray.shift();
            }

            if (start == true) {
                this.x -= this.dx;
            }

            if (this.x == 165) {
                score++;
                document.querySelector("#score").innerHTML = score;
            }

        }
    }
    class upperPipeObj {
        constructor(image, x, y, width, height) {
            this.image = image;
            this.x = x;
            this.y = y;
            this.dx = 2.5;
            this.width = width;
            this.height = height;
            this.passed = false;
        }
        draw() {
            c.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
        move() {
            this.draw();

            if (this.x + this.width < -800) {
                upperPipeArray.shift();
            }

            if (start == true) {
                this.x -= this.dx;
            }

        }
    }

    //game start/stop
    let start = false;
    let gameOver = false
    // spacebar
    document.addEventListener('keydown', function (event) {

        if (event.keyCode === 32) {
            if (!start && !gameOver) {
                start = true;
                bird1.dy = -10;
                animate();
            }
            else if (start && !gameOver) {
                bird1.dy = -10;
            }
        }

        if (event.keyCode === 13) {
            start = false;
        }
    })
    document.addEventListener('click', function (event) {

        if (!start && !gameOver) {
            start = true;
            bird1.dy = -10;
            animate();
        } else if (start && !gameOver) {
            bird1.dy = -10;
        }
    })


    function animate() {
        if (start == true) {
            requestAnimationFrame(animate);
            c.clearRect(0, 0, innerWidth, innerHeight);
            // c.font = "30px Arial";
            // c.textAlign = "center";
            // c.fillText("Enter space to Start", canvas.width / 2, canvas.height / 2);
            bird1.fall();
            for (let i = 0; i < lowerPipeArray.length; i++) {
                lowerPipeArray[i].move();
                upperPipeArray[i].move();
            }
            for (let i = 0; i < lowerPipeArray.length; i++) {
                if ((bird1.x + bird1.width) - 3 >= lowerPipeArray[i].x && bird1.x + 10 <= lowerPipeArray[i].x + lowerPipeArray[i].width && (bird1.y + bird1.height) - 25 >= lowerPipeArray[i].y) {
                    start = false;
                    gameOver = true;
                    openpopup(`Game Over<br>Your Score is ${score}`);
                }
            }
            for (let i = 0; i < upperPipeArray.length; i++) {
                if ((bird1.x + bird1.width) - 3 >= upperPipeArray[i].x && bird1.x + 10 <= upperPipeArray[i].x + upperPipeArray[i].width && bird1.y + 15 <= upperPipeArray[i].y + 600) {
                    start = false;
                    gameOver = true;
                    openpopup(`Game Over<br>Your Score is ${score}`);
                }
            }
        }
        console.log(start, gameOver);
    }

    animate();

    // popup window
    function openpopup(message) {
        let popup = document.querySelector("#popup");
        let overlay = document.querySelector("#overlay");
        let h1 = document.createElement("h1");
        h1.innerHTML = message;
        popup.append(h1);
        popup.classList.add("active");
        overlay.classList.add("active");

    }
    function closepopup() {
        let popup = document.querySelector("#popup");
        let overlay = document.querySelector("#overlay");
        let h1 = document.querySelector("#popup h1");
        h1.remove();
        popup.classList.remove("active");
        overlay.classList.remove("active");
    }

    let close = document.querySelector("#close");

    close.onclick = function () { closepopup(); }


    document.querySelector("#restart").onclick = function restart() {
        c.clearRect(0, 0, innerWidth, innerHeight);
        c.font = "30px Arial";
        c.textAlign = "center";
        c.fillText("Enter space to Start", canvas.width / 2, canvas.height / 2);
        upperPipeArray = [];
        lowerPipeArray = [];
        score = 0;
        document.querySelector("#score").innerHTML = score;
        bird1.y = 200;
        bird1.dy = 0;
        gameOver = false;

    }

})