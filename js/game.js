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
	layer = game.add.tilemapLayer(0, 0, 640, 640, tileset, map, 0);

	// player
	player = game.add.sprite(32, game.world.height - 150, 'panda');;
	
};

function update(){

};