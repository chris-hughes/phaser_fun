var game = new Phaser.Game(640, 640, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

	// background
	game.load.image('bg', 'assets/PlatformTiles/BackgroundGradient.png');

	// level
	game.load.tilemap('level', 'assets/level.csv', null, Phaser.Tilemap.CSV);
	game.load.tileset('tiles', 'assets/PlatformTiles/Tiles 32x32/Tiles_32x32.png', 32, 32);

	// player
	game.load.spritesheet('panda', 'assets/Panda_0.png', 32, 32);

	// snails
	game.load.spritesheet('snail', 'assets/snail_3.png', 32, 32);

};

function create() {

	// background
	bg = game.add.sprite(0, 0, 'bg');

	// level
	map = game.add.tilemap('level');
	tileset = game.add.tileset('tiles');
	// everything collides from all sides (left, right, up, down)
	tileset.setCollisionRange(0, tileset.tiles.length-1, true, true, true, true);
	tileset.setCollision(44, false, false, false, true);

	layer = game.add.tilemapLayer(0, 0, 640, 640, tileset, map, 0);

	// player
	player = game.add.sprite(500, game.world.height - 32, 'panda');
	// player = game.add.sprite(32, game.world.height - 32, 'panda');
	player.anchor.setTo(0.5,0.5); // used to flip the sprites during animation
	player.body.gravity.y = 6;
	player.body.collideWorldBounds = true;

	player.animations.add('left', [15,16,15,17], 500, true);
	player.animations.add('right', [15,16,15,17], 500, true);

	// snails
	snail = game.add.sprite(96, game.world.height - 50, 'snail', 14);
	// snail = game.add.sprite(96, game.world.height - 224, 'snail', 14);
	snail.body.gravity.y = 6;
	snail.body.collideWorldBounds = true;

	// snail.animations.add('left', [8,7,8,9], 2000, true);
	// snail.animations.add('right', [15,14,15,16], 2000, true);

	snail.animations.add('walk', [8,8,8], 2000, true);
	snail.animations.play('walk');

	// controls

	cursors = game.input.keyboard.createCursorKeys();
	
};

function update(){

	// collisions
	game.physics.collide(player,layer);
	game.physics.collide(snail,layer);
	game.physics.collide(player,snail);

	// player motion
	player.body.velocity.x = 0;

	if (cursors.left.isDown) {
        //  Move to the left
        player.body.velocity.x = -150;
        player.scale.x = -1; // flip sprite 
        player.animations.play('left');
    }
    else if (cursors.right.isDown){
        //  Move to the right
        player.scale.x = 1;
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
    else {
        //  Stand still
        player.animations.stop();
        player.frame = 16;
    }
    
    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down){
        player.body.velocity.y = -300;
        console.log(snail.x);
    }

    // snail motion
    // to: function ( properties, duration, ease, autoStart, delay, repeat, yoyo )
    var tween = game.add.tween(snail).to({ x: 200 }, 2000, Phaser.Easing.Linear.None)
    .to({ x: 96 }, 2000, Phaser.Easing.Linear.None).loop().start();

};