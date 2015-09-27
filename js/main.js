enchant();

//DBから受け取るユーザーの進捗情報
var stateArray = [0,4,1,2,3]; //国数理社英

var dungeonOrigin = [[80,160],[310,300],[570,225],[20,400],[480,500]];

//画像
var islandImage = ['img/island_j.png', 'img/island_m.png', 'img/island_sc.png', 'img/island_so.png', 'img/island_e.png'];
var boardImage = ['img/board_j.png','img/board_m.png','img/board_sc.png','img/board_so.png','img/board_e.png',];

var subject = {
 japanese: 0,
 math: 1,
 science: 2,
 social: 3,
 english: 4,
};

var number_of_dungeon = 5;
var number_of_subject = 5;

window.onload = function() {
	var core = new Core(800, 600);
	core.preload('img/worldMapBg.jpg','img/Japanese.png','img/dungeon.png','img/dungeonMap.jpg','img/arrow.png','img/complete.png','img/gray.png','img/backArrow.png');
	for(var i = 0; i < number_of_subject; i++) {
		core.preload(islandImage[i]);
		core.preload(boardImage[i]);
	}


//WorldMap
	var WorldMap = Class.create(Scene, {
		initialize: function(subject) {
			var islandOrigin = [[0,5],[544,5],[0,344],[544,344],[272,172]];
			Scene.call(this);
			var bg = new Sprite(800,600);
			bg.image = core.assets['img/worldMapBg.jpg'];
			bg.x = 0;
			bg.y = 0;
			this.addChild(bg);
			for (var i = 0; i < islandOrigin.length; i++) {
				var island = new Island(islandOrigin[i][0], islandOrigin[i][1], i);
				this.addChild(island);
			}
		}
	});
	var Island = Class.create(Sprite, {
		initialize: function(x, y, subject) {
			Sprite.call(this, 256, 256);
			this.x = x;
			this.y = y;
			this.image = core.assets[islandImage[subject]];
			this.subject = subject;
		},
		ontouchstart: function() {
			var islandMap = new IslandMap(this.subject);
			core.pushScene(islandMap);
        	}
	});

	var IslandMap = Class.create(Scene, {
		initialize: function(subject) {
			Scene.call(this);
			var bg = new Sprite(800,600);
			bg.image = core.assets['img/Japanese.png'];
			bg.x = 0;
			bg.y = 0;
			this.addChild(bg);

			this.addChild(new BackArrow());

			for (var i = 0; i < dungeonOrigin.length; i++){
 				this.addChild(new Dungeon(dungeonOrigin[i][0], dungeonOrigin[i][1]));
			}

			var state = stateArray[subject];
			this.addChild(new NextArrow(state));
			for (var i = 0; i < state; i++) {
				this.addChild(new Complete(i));
			}
			// for(var i = state+1; i < number_of_dungeon; i++) {
			// 	this.addChild(new Gray(i));
			// }

			var board = new Sprite(200,100);
			board.x = 300;
			board.y = 0;
			board.image = core.assets[boardImage[subject]];
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

	var Gray = Class.create(Sprite, {
		initialize: function(state) {
			Sprite.call(this, 200, 222);
			this.image = core.assets['img/gray.png'];
			this.x = dungeonOrigin[state][0] - 10;
			this.y = dungeonOrigin[state][1] - 10;
		}
	})

	var BackArrow = Class.create(Sprite, {
		initialize: function(state) {
			Sprite.call(this, 180, 70);
			this.image = core.assets['img/backArrow.png'];
		},
		ontouchstart: function() {
			core.popScene();
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
		core.pushScene(new WorldMap());
	};
	core.start();
};