enchant();

//DBから受け取るユーザーの進捗情報
var state = [0,4,1,2,3]; //国数理社英

var dungeonX = [80,310,570,20,480];
var dungeonY = [140,300,225,400,500];

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
	core.preload('img/worldMapBg.jpg','img/island_e.png','img/island_j.png','img/island_m.png','img/island_sc.png','img/island_so.png','img/Japanese.png','img/dungeon.png','img/dungeonMap.jpg','img/board_e.png','img/arrow.png');

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

			//var backButton = new BackButton();
			var backButton = new Label('他の島へ行く');
			backButton.addEventListener('touchstart', function() {
				core.popScene();
            	});
			this.addChild(backButton);

			var dungeon0 = new Dungeon(80,140);
			this.addChild(dungeon0);
			var dungeon1 = new Dungeon(310,300);
			this.addChild(dungeon1);
			var dungeon2 = new Dungeon(570,225);
			this.addChild(dungeon2);
			var dungeon3 = new Dungeon(20,400);
			this.addChild(dungeon3);
			var dungeon4 = new Dungeon(480,500);
			this.addChild(dungeon4);

			var arrow = new Sprite(80,80);
			arrow.image = core.assets['img/arrow.png'];
			arrow.x = 125;
			arrow.y = 60;
			this.addChild(arrow);

			var board = new Sprite(200,100);
			board.x = 300;
			board.y = 0;
			board.image = core.assets['img/board_e.png'];
			this.addChild(board);
		}
	});

	var Dungeon = Class.create(Sprite, {
		initialize: function(x, y) {
			Sprite.call(this, 180, 90);
			this.x = x;
			this.y = y;
			this.image = core.assets['img/dungeon.png'];
		},
		ontouchstart: function() {
			var pattern = 0;
			var dungeonMap = new DungeonMap(pattern);
			core.pushScene(dungeonMap);
		}
	});

	var DungeonMap = Class.create(Scene, {
		initialize: function(pattern) {
			Scene.call(this);
			var bg = new Sprite(800,600);
			bg.image = core.assets['img/dungeonMap.jp'];
			bg.x = 0;
			bg.y = 0;
			this.addChild(bg);
			var back = new Label('ダンジョンから抜け出す');
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