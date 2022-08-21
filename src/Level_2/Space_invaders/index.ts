/* eslint-disable space-unary-ops */
/* eslint-disable indent */
/* eslint-disable default-case */
const canvas = (<HTMLCanvasElement>document.querySelector('canvas'));
console.log(canvas);

const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

class Player {
    position: { x: number, y: number };

    velocity: { x: number, y: number };

    width: number;

    height: number;

    rotation: number;

    private image: HTMLImageElement;

    constructor() {
        this.velocity = {
            x: 0,
            y: 0,
        };

        this.rotation = 0;
        const image = new Image();
        image.src = './img/spaceship.png';
        image.onload = () => {
            const scale = 0.20;
            this.image = image;
            this.width = image.width * scale;
            this.height = image.height * scale;
            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 20,
            };
        };
    }

    draw() {
        // (<CanvasRenderingContext2D>c).fillStyle = 'red';
        // c?.fillRect(this.position.x, this.position.y, this.width, this.height);

        c?.save();
        c?.translate(player.position.x + player.width / 2, player.position.y + player.height / 2);

        c?.rotate(this.rotation);
        c?.translate(- player.position.x - player.width / 2, - player.position.y - player.height / 2);

        c?.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);

        c?.restore();
    }

    update() {
        if (this.image) {
            this.draw();
            this.position.x += this.velocity.x;
        }
    }
}

class Projectile {
    radius: number;

    position: { x: number, y: number };

    velocity: { x: number, y: number };

    constructor(postion: { x: number, y: number }, velocity: { x: number, y: number }) {
        this.position = postion;
        this.velocity = velocity;

        this.radius = 3;
    }

    draw() {
        c?.beginPath();
        c?.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        (<CanvasRenderingContext2D>c).fillStyle = 'red';
        c?.fill();
        c?.closePath();
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

class Invader {
    position: { x: number, y: number };

    velocity: { x: number, y: number };

    width: number;

    height: number;

    private image: HTMLImageElement;

    constructor(position: { x: number, y: number }) {
        this.velocity = {
            x: 0,
            y: 0,
        };

        const image = new Image();
        image.src = './img/invaders.gif';

        image.onload = () => {
            const scale = 0.15;
            this.image = image;
            this.width = image.width * scale;
            this.height = image.height * scale;
            this.position = {
                x: position.x,
                y: position.y,
            };
        };
    }

    draw() {
        // (<CanvasRenderingContext2D>c).fillStyle = 'red';
        // c?.fillRect(this.position.x, this.position.y, this.width, this.height);
        c?.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    update(velocity: { x: number, y: number }) {
        if (this.image) {
            this.draw();
            this.position.x += velocity.x;
            this.position.y += velocity.y;
        }
    }
}

class Grid {
    position: { x: number, y: number };

    velocity: { x: number, y: number };

    invaders: Invader[] = [];

    constructor() {
        this.position = {
            x: 0,
            y: 0,
        };
        this.velocity = {
            x: 3,
            y: 0,
        };
        this.invaders = [];

        const rows = Math.floor(Math.random() * 5 + 1);
        const cols = Math.floor(Math.random() * 7 + 3);

        for (let i = 0; i < cols; i++) {
            for (let y = 0; y < rows; y++) {
                this.invaders.push(new Invader({ x: i * 65, y: y * 65 }));
            }
        }
    }

    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}

const player = new Player();

const projectiles: Projectile[] = [];

const grids = [new Grid()];

const keys = {
    q: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
    z: {
        pressed: false,
    },
    s: {
        pressed: false,
    },
    space: {
        pressed: false,
    },
};

function animate() {
    requestAnimationFrame(animate);
    (<CanvasRenderingContext2D>c).fillStyle = 'black';
    c?.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    projectiles.forEach((projectile, index) => {
        if (projectile.position.y + projectile.radius <= 0) {
            setTimeout(() => {
                projectiles.splice(index, 1);
            }, 0);
        } else {
            projectile.update();
        }
    });

    grids.forEach((grid) => {
        grid.update();
        grid.invaders.forEach((invader) => {
            invader.update({ x: grid.velocity.x, y: grid.velocity.y });
        });
    });

    if (keys.q.pressed && keys.d.pressed) {
        player.velocity.x = 0;
        player.rotation = 0;
    } else
        if (keys.q.pressed && player.position.x >= 0) {
            player.velocity.x = - 7;
            player.rotation = - 0.20;
        } else if (keys.d.pressed && player.position.x + player.width <= canvas.width) {
            player.velocity.x = + 7;
            player.rotation = + 0.20;
        } else {
            player.velocity.x = 0;
            player.rotation = 0;
        }
}

animate();

addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'q':
            // console.log('left');
            keys.q.pressed = true;
            break;
        case 'd':
            // console.log('right');
            keys.d.pressed = true;
            break;
        // case 'z': console.log('forward'); break;
        // case 's': console.log('backward'); break;
        case ' ':
            // console.log('space');
            projectiles.push(new Projectile({ x: player.position.x + player.width / 2, y: player.position.y }, { x: 0, y: - 10 }));
            keys.space.pressed = true;
            // console.log(projectiles);

            break;
    }
});

addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'q':
            // console.log('left');
            keys.q.pressed = false;
            break;
        case 'd':
            // console.log('right');
            keys.d.pressed = false;
            break;
        // case 'z': console.log('forward'); break;
        // case 's': console.log('backward'); break;
        case ' ':
            // console.log('space');
            keys.space.pressed = false;
            break;
    }
});
