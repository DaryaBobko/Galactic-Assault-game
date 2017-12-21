/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__enums__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_core__ = __webpack_require__(2);



let 
    playerFirst = null,
    playerSecond = null,
    bulletsPlayerFirst = null,
    bulletsPlayerSecond = null,
    bulletTime = 0,
    cursors = null,
    fireButtonPlayerFirst = null,
    fireButtonPlayerSecond = null,
    explosions = null,
    explosionSoud = null,
    starfield = null,
    score = 0,
    scoreString = '',
    scoreText = null,
    livesPlayerFirst = null,
    livesPlayerSecond = null,
    firingTimer = 0,
    stateText = null,
    livingEnemies = [],
    gameWidth = 800,
    gameHeight = 600,
    choiseLabel = null,
    playLabel = null,
    gameStatus = null,
    about = null,
    aboutLabel = null,
    upWASD = null,
    downWASD = null,
    leftWASD = null,
    rightWASD = null,
    pause_label = null,
    bullet = null,
    live = null;

let w = gameWidth;
let h = gameHeight;

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-space', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

let gameCore = new __WEBPACK_IMPORTED_MODULE_1__game_core__["a" /* GameCore */](game);

function preload() {
    gameCore.preload();
}


function create() {

    gameStatus = __WEBPACK_IMPORTED_MODULE_0__enums__["a" /* gameStatuses */].startMenu;
    starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');

    // bmpText = game.add.bitmapText(200, 100, 'desyrel', 'Phaser & Pixi\nrocking!', 64);
    let nameLabel = game.add.bitmapText(gameWidth - 650, 120,  'gem', 'GALACTIC ASSAULT', 56 );
    playLabel = game.add.text(gameWidth - 100, 20, 'Play', {
        font: '30px Arial',
        fill: '#427bb2'
    });
    aboutLabel = game.add.text(gameWidth - 100, 70, 'About', {
        font: '30px Arial',
        fill: '#427bb2'
    });

    playLabel.inputEnabled = true;
    playLabel.events.onInputUp.add(startGame);

    aboutLabel.inputEnabled = true;
    aboutLabel.events.onInputUp.add(aboutGame);
}
function aboutGame(){
    aboutLabel.destroy();
  //  starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');
    about = game.add.text(gameWidth - 370, 250, 'The goal of the game is to destroy \n the enemy and stay alive',{
        font: '20px Arial',
        fill: '#fff'
    });
  
    aboutLabel = game.add.text(gameWidth - 750, 400, 'Screenshots:', {
        font: '20px Arial',
        fill: '#427bb2'
    });
  
    let imgGameStart =  game.add.sprite(150, 500, 'gameStart');
    imgGameStart.anchor.setTo(0.5, 0.5);
    let imgHitting =  game.add.sprite(400, 500, 'hitting');
    imgHitting.anchor.setTo(0.5, 0.5);
    let imgVictory =  game.add.sprite(650, 500, 'victory');
    imgVictory.anchor.setTo(0.5, 0.5);
}

function goGame() {
    // explosionSoud = game.add.audio('explosionSoud');

    // game.sound.setDecodedCallback([explosionSoud], () => {
    //     var test = 2;
    // }, this);

    game.physics.startSystem(Phaser.Physics.ARCADE);

    starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');

    pause_label = game.add.text(gameWidth - 775, 10, 'pause', {
        font: '20px Arial',
        fill: '#427bb2'
    });
    pause_label.inputEnabled = true;
    pause_label.events.onInputUp.add(forPause);

    bulletsPlayerFirst = gameCore.createPlayerBullet('bullet');
    bulletsPlayerSecond = gameCore.createPlayerBullet('bullet2');

    function createPlayer(playerPositionY, playerAngle) {
        let player = game.add.sprite(400, playerPositionY, 'ship');
        player.anchor.setTo(0.5, 0.5);
        player.angle = playerAngle;
        game.physics.enable(player, Phaser.Physics.ARCADE);
        return player;
    }

    playerFirst = createPlayer(560, 270);
    playerSecond = createPlayer(40, 90);

    game.physics.arcade.collide(playerFirst, playerSecond);    


    livesPlayerFirst = game.add.group();
    game.add.text(gameWidth - 100, 520, 'lives : ', {
        font: '20px Arial',
        fill: '#a8b8e2'
    });

    livesPlayerSecond = game.add.group();
    game.add.text(gameWidth - 100, 10, 'lives : ', {
        font: '20px Arial',
        fill: '#a8b8e2'
    });

    stateText = game.add.text(game.world.centerX, game.world.centerY, ' ', {
        font: '42px Arial',
        fill: '#fff'
    });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;

    for (let i = 0; i < 3; i++) {
        let ship = livesPlayerFirst.create(game.world.width - 100 + (30 * i), 60, 'ship');
        ship.anchor.setTo(0.5, 0.5);
        ship.angle = 0;
        ship.alpha = 0.4;
    }

    for (let i = 0; i < 3; i++) {
        let ship2 = livesPlayerSecond.create(game.world.width - 100 + (30 * i), 570, 'ship');
        ship2.anchor.setTo(0.5, 0.5);
        ship2.angle = 0;
        ship2.alpha = 0.4;
    }

    explosions = game.add.group();
    explosions.createMultiple(30, 'kaboom');
    explosions.forEach(setupInvader, this);

    cursors = game.input.keyboard.createCursorKeys();
    fireButtonPlayerSecond = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    upWASD = game.input.keyboard.addKey(Phaser.Keyboard.W);
    downWASD = game.input.keyboard.addKey(Phaser.Keyboard.S);
    leftWASD = game.input.keyboard.addKey(Phaser.Keyboard.A);
    rightWASD = game.input.keyboard.addKey(Phaser.Keyboard.D);
    fireButtonPlayerFirst = game.input.keyboard.addKey(Phaser.Keyboard.NUMPAD_0);
}

function startGame(event) {
    playLabel.destroy();
    gameStatus = __WEBPACK_IMPORTED_MODULE_0__enums__["a" /* gameStatuses */].gameProcess;

    goGame();

};

function forPause() {
    gameStatus = __WEBPACK_IMPORTED_MODULE_0__enums__["a" /* gameStatuses */].gamePause;
    
    game.paused = true;

    choiseLabel = game.add.text(w / 2, h - 300, 'Click outside to continue', {
        font: '30px Arial',
        fill: '#fff'
    });
    choiseLabel.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable([choiseLabel]);
    
    choiseLabel.body.velocity.setTo(100, 100);
    choiseLabel.body.collideWorldBounds = true;
    choiseLabel.body.bounce.set(1);
    // game.physics.arcade.collide(choiseLabel);

    // Add a input listener that can help us return from being paused
    //отображаешь паузу

    game.input.onDown.add(unpause);
}

function unpause() {
    gameStatus = __WEBPACK_IMPORTED_MODULE_0__enums__["a" /* gameStatuses */].gameProcess;

    choiseLabel.destroy();

    // Unpause the game

    game.paused = false;
}

function setupInvader(invader) {

    invader.anchor.x = 0.5;
    invader.anchor.y = 0.5;
    invader.animations.add('kaboom');

}


function update() {
    switch (gameStatus) {
        case __WEBPACK_IMPORTED_MODULE_0__enums__["a" /* gameStatuses */].startMenu:
            {
                break;
            }
        case __WEBPACK_IMPORTED_MODULE_0__enums__["a" /* gameStatuses */].gameProcess:
            {
                renderGameProcess();
                break;
            }
        case __WEBPACK_IMPORTED_MODULE_0__enums__["a" /* gameStatuses */].gamePause:
            {
                break;
            }
    }
}

function renderGameProcess() {
    starfield.tilePosition.y += 1;

    if (playerFirst.alive) {
        playerFirst.body.velocity.setTo(0, 0);

        if (cursors.left.isDown && 0 < playerFirst.body.center.x - 20) {
            playerFirst.body.velocity.x = -250;
        } else if (cursors.right.isDown && 800 > playerFirst.body.center.x + 20) {
            playerFirst.body.velocity.x = 250;
        } else if (cursors.up.isDown && 0 < playerFirst.body.center.y - 15) {
            playerFirst.body.velocity.y = -250;
        } else if (cursors.down.isDown && 600 > playerFirst.body.center.y + 15) {
            playerFirst.body.velocity.y = 200;
        }

        if (fireButtonPlayerFirst.isDown) {

            fireBulletPlayerFirst();

        }

        game.physics.arcade.overlap(bulletsPlayerFirst, playerSecond, playerFirstHitsTwo, null, this);
    }

    if (playerSecond.alive) {

        playerSecond.body.velocity.setTo(0, 0);

        if (leftWASD.isDown && 0 < playerSecond.body.center.x - 20) {
            playerSecond.body.velocity.x = -250;
        } else if (rightWASD.isDown && 800 > playerSecond.body.center.x + 20) {
            playerSecond.body.velocity.x = 250;
        } else if (downWASD.isDown && 600 > playerSecond.body.center.y + 15) {
            playerSecond.body.velocity.y = 250;
        } else if (upWASD.isDown && 0 < playerSecond.body.center.y - 17) {
            playerSecond.body.velocity.y = -250;
        }

        if (fireButtonPlayerSecond.isDown) {
            fireBulletPlayerSecond();
        }

        game.physics.arcade.overlap(bulletsPlayerSecond, playerFirst, playerSecondHitsOne, null, this);

    }
}

function render() {

}

function playerSecondHitsOne(player, bullet) {

    // explosionSoud.play();

    bullet.kill();
    live = livesPlayerSecond.getFirstAlive();


    if (live) {
        live.kill();
    }
    var explosion = explosions.getFirstExists(false);
    explosion.reset(playerFirst.body.x, playerFirst.body.y);
    explosion.play('kaboom', 30, false, true);
    if (livesPlayerSecond.countLiving() < 1) {
        playerFirst.kill();
        bulletsPlayerSecond.callAll('kill');
        stateText.text = "Second player wins!!! \n GAME OVER";
        stateText.visible = true;
        game.input.onTap.addOnce(restart, this);
    }

}

function playerFirstHitsTwo(player, bullet) {
    bullet.kill();
    live = livesPlayerFirst.getFirstAlive();


    if (live) {
        live.kill();
    }

    var explosion = explosions.getFirstExists(false);
    explosion.reset(playerSecond.body.x, playerSecond.body.y);
    explosion.play('kaboom', 30, false, true);
    if (livesPlayerFirst.countLiving() < 1) {
        playerSecond.kill();
        bulletsPlayerFirst.callAll('kill');
        stateText.text = "First player wins!!! \n GAME OVER";
        stateText.visible = true;
        game.input.onTap.addOnce(restart, this);
    }

}

function fireBulletPlayerFirst() {

    if (game.time.now > bulletTime) {

        bullet = bulletsPlayerFirst.getFirstExists(false);

        if (bullet) {

            bullet.reset(playerFirst.x, playerFirst.y + 8);
            bullet.body.velocity.y = -400;
            bulletTime = game.time.now + 200;
        }
    }

}

function restart() {

    lives.callAll('revive');

    playerFirst.revive();
    playerSecond.revive();

    stateText.visible = false;
}

function fireBulletPlayerSecond() {

    if (game.time.now > bulletTime) {

        bullet = bulletsPlayerSecond.getFirstExists(false);

        if (bullet) {

            bullet.reset(playerSecond.x, playerSecond.y + 30);
            bullet.body.velocity.y = 400;
            bulletTime = game.time.now + 200;
        }
    }

}

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const gameStatuses = {
    startMenu: 1,
    gameProcess: 2,
    gamePause: 3
}
/* harmony export (immutable) */ __webpack_exports__["a"] = gameStatuses;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class GameCore {
    constructor(game) {
        this.game = game;
    }

    preload() {
        this.game.load.image('bullet', 'img/bullet.png');
        this.game.load.image('bullet2', 'img/bullet2.png');
        this.game.load.image('ship', 'img/ship.png');
        this.game.load.spritesheet('kaboom', 'img/explode.png', 128, 128);
        this.game.load.image('starfield', 'img/canvas.jpg');
        this.game.load.image('gameStart', 'img/GameStart.png');
        this.game.load.image('hitting', 'img/Hitting.png');
        this.game.load.image('victory', 'img/Victory.png');
        this.game.load.bitmapFont('gem', 'fonts/bitmapFonts/gem.png', 'fonts/bitmapFonts/gem.xml');
    }

    createPlayerBullet(bulletName) {
        let playerBullet = this.game.add.group();
        playerBullet.enableBody = true;
        playerBullet.physicsBodyType = Phaser.Physics.ARCADE;
        playerBullet.createMultiple(30, bulletName);
        playerBullet.setAll('anchor.x', 0.5);
        playerBullet.setAll('anchor.y', 1);
        playerBullet.setAll('outOfBoundsKill', true);
        playerBullet.setAll('checkWorldBounds', true);

        return playerBullet;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameCore;



/***/ })
/******/ ]);