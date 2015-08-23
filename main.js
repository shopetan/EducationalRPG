enchant();

window.onload = function() {
	var core = new Core(800, 600);
	core.preload('img/worldMapBg.jpg','img/island.png','img/island_j.png','img/island_m.png','img/island_sc.png','img/island_so.png');

	var Island = Class.create(Sprite, {
		initialize: function(x, y,img) {
			Sprite.call(this, 256, 256);
			this.x = x;
			this.y = y;
			this.image = core.assets[img];
			core.rootScene.addChild(this);

			this.on('touchstart', function() {
				var islandMap = new Scene();
				var back = new Label('戻る');
				islandMap.addChild(back);
				back.on('touchstart', function() {
					core.popScene();
				});
				islandMap.backgroundColor = 'red';
				core.pushScene(islandMap);
			});
		}
	});

	core.fps = 15;
	core.onload = function() {

//World Map
		var map = new Sprite(800,600);
		map.image = core.assets['img/worldMapBg.jpg'];
		map.x = 0;
		map.y = 0;
		core.rootScene.addChild(map);

		var japanese = new Island(0,5,'img/island_j.png');
		var math = new Island(544,5,'img/island_m.png');
		var science = new Island(0,344,'img/island_sc.png');
		var social = new Island(544,344,'img/island_so.png');
		var last = new Island(272,172,'img/island.png');

//Island Map



/*
		player.on('enterframe', function() {
			if (this.within(enemy, 10)) {
					label.text = 'hit!';
					core.pushScene(gameOverScene);
					core.stop();
				}
		});

*/

	};
	core.start();
};