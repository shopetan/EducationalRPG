enchant();

//DBから受け取るユーザーの進捗情報
var state = [0,4,1,2,3]; //国数理社英

var dungeonOrigin = [[80,140],[310,300],[570,225],[20,400],[480,500]];
var islandOrigin = [[0,5],[544,5],[0,344],[544,344],[272,172]];
var islandImage = ['img/island_j.png', 'img/island_m.png', 'img/island_sc.png', 'img/island_so.png', 'img/island_e.png'];

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
	core.preload('img/worldMapBg.jpg','img/island_e.png','img/island_j.png','img/island_m.png','img/island_sc.png','img/island_so.png','img/Japanese.png','img/dungeon.png','img/dungeonMap.jpg','img/board_e.png','img/arrow.png','img/complete.png');

	var Island = Class.create(Sprite, {
		initialize: function(x, y, subject) {
			Sprite.call(this, 256, 256);
			this.x = x;
			this.y = y;
			this.image = core.assets[islandImage[subject]];
			this.subject = subject;
			core.rootScene.addChild(this);
		},
		ontouchstart: function() {
			var islandMap = new IslandMap(state[this.subject]);
			core.pushScene(islandMap);
        	}
	});

	var IslandMap = Class.create(Scene, {
		initialize: function(state) {
			Scene.call(this);
			console.log(state)
			var bg = new Sprite(800,600);
			bg.image = core.assets['img/Japanese.png'];
			bg.x = 0;
			bg.y = 0;
			this.addChild(bg);

			var backButton = new Label('他の島へ行く');
			backButton.addEventListener('touchstart', function() {
				core.popScene();
            	});
			this.addChild(backButton);

			for (var i = 0; i < dungeonOrigin.length; i++){
 				this.addChild(new Dungeon(dungeonOrigin[i][0], dungeonOrigin[i][1]));
			}

			this.addChild(new NextArrow(state));
			for (var i = 0; i < state; i++) {
				this.addChild(new Complete(i));
			}

			var board = new Sprite(200,100);
			board.x = 300;
			board.y = 0;
			board.image = core.assets['img/board_e.png'];
			this.addChild(board);
		}
	});

	var NextArrow = Class.create(Sprite, {
		initialize: function(state) {
			Sprite.call(this, 80, 80);
			this.image = core.assets['img/arrow.png'];
			this.x = dungeonOrigin[state][0] + 90 - 40;
			this.y = dungeonOrigin[state][1] - 80;
		}
	});

	var Complete = Class.create(Sprite, {
		initialize: function(state) {
			Sprite.call(this, 180, 90);
			this.image = core.assets['img/complete.png'];
			this.x = dungeonOrigin[state][0];
			this.y = dungeonOrigin[state][1];
		}
	})

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
			bg.image = core.assets['img/dungeonMap.jpg'];
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

		for (var i = 0; i < islandOrigin.length; i++) {
			new Island(islandOrigin[i][0], islandOrigin[i][1], i);
		}

	};
	core.start();
};