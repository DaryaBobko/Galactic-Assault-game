export class GameCore {
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
