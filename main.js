enchant();

window.onload = function() {
	var core = new Core(800, 600);
	core.preload('img/worldMapBg.jpg');

	/*var Soldier = Class.create(Sprite, {
		initialize: function(x, y) {
			Sprite.call(this, 32, 32);
			this.x = x;
			this.y = y;
			this.image = core.assets['chara5.png'];
			this.on('enterframe', function() {
				if (core.input.left) {
					if (this.x > 0) {
						this.x -= 5;
					}
					this.frame = this.x % 3 + 9;
				}
				if (core.input.right) {
					if (this.x < 1103 - 32) {
						this.x += 5;
					}
					this.frame = this.x % 3 + 18;
				}
				if (core.input.up) {
					if (this.y > 0) {
						this.y -= 5;
					}
					this.frame = this.y % 3 + 27;
				}
				if (core.input.down) {
					if (this.y < 768 - 32) {
						this.y += 5;
					}
					this.frame = this.y % 3;
				}

			});
			core.rootScene.addChild(this);
		}
	});*/

	function rand(n) {
 	   return Math.floor(Math.random() * (n + 1));
	}

	core.fps = 15;
	core.onload = function() {
		var map = new Sprite(800,600);
		map.image = core.assets['img/worldMapBg.jpg'];
		map.x = 0;
		map.y = 0;
		core.rootScene.addChild(map);

		//var player = new Soldier(0,0);
		//var enemy = new Soldier(0,100);

/*
		player.on('enterframe', function() {
			if (this.within(enemy, 10)) {
					label.text = 'hit!';
					core.pushScene(gameOverScene);
					core.stop();
				}
		});

		player.on('touchstart', function() {
			core.rootScene.removeChild(this);
		});

		core.rootScene.on('touchstart', function(e) {
			player.x = e.x;
			player.y = e.y;
		})

		var label = new Label();
		label.x = 280;
		label.y = 5;
		label.color = 'red';
		label.font = '14px "Arial"';
		label.text = '0';
		label.on('enterframe', function() {
			label.text = (core.frame / core.fps).toFixed(2);
		});
		core.rootScene.addChild(label);

		var gameOverScene = new Scene();
		gameOverScene.backgroundColor = 'black';
		*/

	};
	core.start();
};