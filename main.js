enchant();

//DBから受け取るユーザーの進捗情報
var state = [0,4,1,2,3]; //国数理社英

var subject = {
 japanese: 0,
 math: 1,
 science: 2,
 social: 3,
 english: 4,
};

var number_of_dungeon = 5;

window.onload = function() {
	var core = new Core(800, 600);
	core.preload('img/worldMapBg.jpg','img/island_e.png','img/island_j.png','img/island_m.png','img/island_sc.png','img/island_so.png','img/Japanese.png','img/castle.png');

	var Island = Class.create(Sprite, {
		initialize: function(x, y, subject) {
			Sprite.call(this, 256, 256);
			this.x = x;
			this.y = y;
			switch (subject) {
				case 0:
					this.image = core.assets['img/island_j.png'];
					break;
				case 1:
					this.image = core.assets['img/island_m.png'];
					break;
				case 2:
					this.image = core.assets['img/island_sc.png'];
					break;
				case 3:
					this.image = core.assets['img/island_so.png'];
					break;
				case 4:
					this.image = core.assets['img/island_e.png'];
					break;
			}
			core.rootScene.addChild(this);
		},
		ontouchstart: function() {
			var islandMap = new IslandMap(state[subject]);
			core.pushScene(islandMap);
        	}
	});

	var IslandMap = Class.create(Scene, {
		initialize: function(state) {
			Scene.call(this);
			var bg = new Sprite(800,600);
			bg.image = core.assets['img/Japanese.png'];
			bg.x = 0;
			bg.y = 0;
			this.addChild(bg);
			var back = new Label('戻る');
			this.addChild(back);
			back.on('touchstart', function() {
				core.popScene();
			});

			var castle0 = new Castle(50,50);
			var castle1 = new Castle(325,50);
			var castle2 = new Castle(600,50);
			var castle3 = new Castle(185,350);
			var castle4 = new Castle(485,350);
			this.addChild(castle0);
			this.addChild(castle1);

			this.addChild(castle2);
			this.addChild(castle3);
			this.addChild(castle4);

			var label0 = new Label('hogehogeの城');
			label0.x = 80;
			label0.y = 200;
			label0.backgroundColor = 'white';
			this.addChild(label0);

		}
	});

	var Dungeon = Class.create(Sprite, {
		initialize: function(x, y) {
			Sprite.call(this, 150, 150);
			this.x = x;
			this.y = y;
			this.image = core.assets['img/castle.png'];
			this.on('touchstart', function() {
				var dangeonMap = new DangeonMap();
				core.pushScene(dangeonMap);
			});
		}
	});

	var DungeonMap = Class.create(Scene, {
		initialize: function() {
			Scene.call(this);
			var bg = new Sprite(800,600);
			bg.image = core.assets['img/Japanese.png'];
			bg.x = 0;
			bg.y = 0;
			this.addChild(bg);
			var back = new Label('戻る');
			this.addChild(back);
			back.on('touchstart', function() {
				core.popScene();
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

		var japanese = new Island(0,5,subject.japanese);
		var math = new Island(544,5,subject.math);
		var science = new Island(0,344,subject.science);
		var social = new Island(544,344,subject.social);
		var last = new Island(272,172,subject.english);
	};
	core.start();
};