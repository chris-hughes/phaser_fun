var game = new Phaser.Game(640, 640, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

	// game.stage.scale.pageAlignHorizontally = true;
	// game.stage.scale.pageAlignVeritcally = true;

	game.load.image('bg', 'assets/PlatformTiles/BackgroundGradient.png');
	game.load.spritesheet('panda', 'assets/Panda_0.png', 32, 32);


};

function create() {

	
	game.add.sprite(0, 0, 'bg');
	// game.stage.backgroundColor = '#787878';

	player = game.add.sprite(32, game.world.height - 150, 'panda');;
	
};

function update(){

};