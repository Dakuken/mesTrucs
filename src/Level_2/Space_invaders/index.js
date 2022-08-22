"use strict";
/* eslint-disable space-unary-ops */
/* eslint-disable indent */
/* eslint-disable default-case */
const scoreEl = document.querySelector('#scoreEl');
const canvas = document.querySelector('canvas');
console.log(canvas);
const c = canvas.getContext('2d');
canvas.height = innerHeight;
canvas.width = innerHeight * (innerWidth / innerHeight);
class Player {
    constructor() {
        this.velocity = {
            x: 0,
            y: 0,
        };
        this.rotation = 0;
        this.opacity = 1;
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
        c.globalAlpha = this.opacity;
        c?.translate(player.position.x + player.width / 2, player.position.y + player.height / 2);
        c?.rotate(this.rotation);
        c?.translate(-player.position.x - player.width / 2, -player.position.y - player.height / 2);
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
    constructor(postion, velocity) {
        this.position = postion;
        this.velocity = velocity;
        this.radius = 5;
    }
    draw() {
        c?.beginPath();
        c?.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = 'red';
        c?.fill();
        c?.closePath();
    }
    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}
class Particle {
    constructor(postion, velocity, radius, color, fade = true) {
        this.position = postion;
        this.velocity = velocity;
        this.radius = radius;
        this.color = color;
        this.opacity = 1;
        this.fade = fade;
    }
    draw() {
        c?.save();
        c.globalAlpha = this.opacity;
        c?.beginPath();
        c?.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c?.fill();
        c?.closePath();
        c?.restore();
    }
    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if (this.fade) {
            this.opacity -= 0.01;
        }
    }
}
class InvaderProjectile {
    constructor(postion, velocity) {
        this.position = postion;
        this.velocity = velocity;
        this.width = 5;
        this.height = 15;
    }
    draw() {
        c.fillStyle = 'white';
        c?.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}
class Invader {
    constructor(position) {
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
    update(velocity) {
        if (this.image) {
            this.draw();
            this.position.x += velocity.x;
            this.position.y += velocity.y;
        }
    }
    shoot(InvaderProjectiles) {
        InvaderProjectiles.push(new InvaderProjectile({ x: this.position.x + this.width / 2, y: this.position.y + this.height }, { x: 0, y: 4 }));
    }
}
class Grid {
    constructor() {
        this.invaders = [];
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
        this.width = cols * 65;
        for (let i = 0; i < cols; i++) {
            for (let y = 0; y < rows; y++) {
                this.invaders.push(new Invader({ x: i * 65, y: y * 65 }));
            }
        }
    }
    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.velocity.y = 0;
        if (this.position.x + this.width >= canvas.width || this.position.x <= 0) {
            this.velocity.x = -this.velocity.x;
            this.velocity.y = 65;
        }
    }
}
let score = 0;
const player = new Player();
const projectiles = [];
const grids = [];
const invaderProjectiles = [];
const particles = [];
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
let frame = 0;
let game = {
    over: false,
    active: true,
};
let randomInterval = Math.floor((Math.random() * 500) + 1000);
for (let z = 0; z < 100; z++) {
    particles.push(new Particle({ x: Math.random() * canvas.width, y: Math.random() * canvas.height }, { x: 0, y: 1 }, Math.random() * 1.5, '#FFFFFF', false));
}
function createParticles(object, color) {
    for (let z = 0; z < 15; z++) {
        particles.push(new Particle({ x: object.position.x + object.width / 2, y: object.position.y + object.height / 2 }, { x: (Math.random() - 0.5) * 2, y: (Math.random() - 0.5) * 2 }, Math.random() * 3, color || '#FFFFFF'));
    }
}
function animate() {
    if (!game.active) {
        return;
    }
    requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c?.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    particles.forEach((particle, i) => {
        if (particle.position.y - particle.radius >= canvas.height) {
            particle.position.x = Math.random() * canvas.width;
            particle.position.y = -particle.radius;
        }
        if (particle.opacity <= 0) {
            setTimeout(() => {
                particles.splice(i, 1);
            }, 1);
        }
        else {
            particle.update();
        }
    });
    console.log(particles);
    invaderProjectiles.forEach((invaderProjectile, index) => {
        if (invaderProjectile.position.y + invaderProjectile.height >= canvas.height) {
            setTimeout(() => {
                invaderProjectiles.splice(index, 1);
            }, 0);
        }
        else {
            invaderProjectile.update();
        }
        // projectile hits player
        if (invaderProjectile.position.y + invaderProjectile.height >= player.position.y
            && invaderProjectile.position.x + invaderProjectile.width >= player.position.x
            && invaderProjectile.position.x <= player.position.x + player.width) {
            console.log('loose');
            setTimeout(() => {
                invaderProjectiles.splice(index, 1);
                player.opacity = 0;
                game.over = true;
            }, 0);
            setTimeout(() => {
                game.active = false;
            }, 500);
            createParticles(player, '#FF0000');
        }
    });
    projectiles.forEach((projectile, index) => {
        // projectiles hit ennemy
        if (projectile.position.y + projectile.radius <= 0) {
            setTimeout(() => {
                projectiles.splice(index, 1);
            }, 0);
        }
        else {
            projectile.update();
        }
    });
    grids.forEach((grid, gridIndex) => {
        grid.update();
        // spawn project
        if (frame % 100 === 0 && grid.invaders.length > 0) {
            grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(invaderProjectiles);
        }
        grid.invaders.forEach((invader, i) => {
            invader.update({ x: grid.velocity.x, y: grid.velocity.y });
            // projectiles hit ennemy
            projectiles.forEach((projectile, j) => {
                if (projectile.position.y - projectile.radius <= invader.position.y + invader.height
                    && projectile.position.x + projectile.radius >= invader.position.x
                    && projectile.position.x - projectile.radius <= invader.position.x + invader.width
                    && projectile.position.y + projectile.radius >= invader.position.y) {
                    setTimeout(() => {
                        const invaderFound = grid.invaders.find((invader2) => invader2 === invader);
                        const projectileFound = projectiles.find((projectile2) => projectile2 === projectile);
                        // remove invader & projectile
                        if (invaderFound && projectileFound) {
                            score += 100;
                            scoreEl.textContent = String(score);
                            createParticles(invader);
                            grid.invaders.splice(i, 1);
                            projectiles.splice(j, 1);
                            if (grid.invaders.length > 0) {
                                const firstInvader = grid.invaders[0];
                                const lastInvader = grid.invaders[grid.invaders.length - 1];
                                grid.width = lastInvader.position.x - firstInvader.position.x + lastInvader.width;
                                grid.position.x = firstInvader.position.x;
                            }
                            else {
                                grids.splice(gridIndex, 1);
                            }
                        }
                    }, 0);
                }
            });
        });
    });
    if (keys.q.pressed && player.position.x >= 0) {
        player.velocity.x = -7;
        player.rotation = -0.20;
    }
    else if (keys.d.pressed && player.position.x + player.width <= canvas.width) {
        player.velocity.x = +7;
        player.rotation = +0.20;
    }
    else {
        player.velocity.x = 0;
        player.rotation = 0;
    }
    // spawning ennemies
    if (frame % randomInterval === 0) {
        grids.push(new Grid());
        randomInterval = Math.floor((Math.random() * 500) + 1000);
        frame = 0;
    }
    frame++;
}
animate();
addEventListener('keydown', ({ key }) => {
    if (game.over) {
        return;
    }
    switch (key) {
        case 'q':
            // console.log('left');
            keys.q.pressed = true;
            break;
        case 'd':
            // console.log('right');
            keys.d.pressed = true;
            break;
        case ' ':
            // console.log('space');
            projectiles.push(new Projectile({ x: player.position.x + player.width / 2, y: player.position.y }, { x: 0, y: -10 }));
            // keys.space.pressed = true;
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
            break;
    }
});
