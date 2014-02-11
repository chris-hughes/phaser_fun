var game = new Phaser.Game(640, 640, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

	// background
	game.load.image('bg', 'assets/PlatformTiles/BackgroundGradient.png');

	// level
	game.load.tilemap('level', 'assets/level.csv', null, Phaser.Tilemap.CSV);
	game.load.tileset('tiles', 'assets/PlatformTiles/Tiles 32x32/Tiles_32x32.png', 32, 32);

	// player
	game.load.spritesheet('panda', 'assets/Panda_0.png', 32, 32);

};

function create() {

	// background
	bg = game.add.sprite(0, 0, 'bg');

	// level
	map = game.add.tilemap('level');
	tileset = game.add.tileset('tiles');
	// everything collides from all sides (left, right, up, down)
	tileset.setCollisionRange(0, tileset.tiles.length-1, true, true, true, true);

	layer = game.add.tilemapLayer(0, 0, 640, 640, tileset, map, 0);

	// player
	player = game.add.sprite(32, game.world.height - 150, 'panda');
	player.anchor.setTo(0.5,0.5);
	player.body.gravity.y = 6;
	player.body.collideWorldBounds = true;

	player.animations.add('left', [15,16,15,17], 500, true);
	player.animations.add('right', [15,16,15,17], 500, true);

	// controls

	cursors = game.input.keyboard.createCursorKeys();
	
};

function update(){

	// collisions
	game.physics.collide(player,layer);

	// player motion
	player.body.velocity.x = 0;

	if (cursors.left.isDown) {
        //  Move to the left
        player.body.velocity.x = -150;
        player.scale.x = -1;
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
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -250;
    }


};