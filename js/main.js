enchant();

//DBから受け取るユーザーの進捗情報
var stateArray = [[0,0,0,0,0],[1,0,0,1,1],[1,1,1,1,0],[0,0,1,1,0],[1,1,1,0,0],[1,1,1,0,0]]; //国数理社英

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
var number_of_island = 5;

window.onload = function() {
	var core = new Core(800, 600);
	core.preload('img/worldMapBg.jpg','img/islandMapBg.png','img/dungeon.png','img/dungeonMapBg.jpg','img/complete.png','img/backArrow.png');
	core.preload('img/dq.jpg');
	for(var i = 0; i < islandImage.length; i++) {
		core.preload(islandImage[i]);
		core.preload(boardImage[i]);
	}

//WorldMap
	var WorldMap = Class.create(Scene, {
		initialize: function(subject) {
			var islandOrigin = [[0,5],[544,5],[0,344],[544,344],[272,172]];
			Scene.call(this);
			this.addChild(new BackGround('img/worldMapBg.jpg'));
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
			core.pushScene(new IslandMap(this.subject));
        	}
	});

//IslandMap
	var IslandMap = Class.create(Scene, {
		initialize: function(subject) {
			var dungeonOrigin = [[80,160],[310,300],[570,225],[20,400],[480,500]];
			Scene.call(this);
			this.addChild(new BackGround('img/islandMapBg.png'));
			this.addChild(new Board(subject));
			this.addChild(new BackArrow());
			for (var i = 0; i < dungeonOrigin.length; i++){
 				this.addChild(new Dungeon(dungeonOrigin[i][0], dungeonOrigin[i][1], subject, i));
			}
		}
	});
	var Dungeon = Class.create(Sprite, {
		initialize: function(x, y, subject, number) {
			Sprite.call(this, 180, 90);
			this.x = x;
			this.y = y;
			this.subject = subject;
			this.number = number;
			if (stateArray[subject][number] == 1) {
				this.image = core.assets['img/dungeon.png'];
			} else {
				this.image = core.assets['img/complete.png'];
			}
		},
		ontouchstart: function() {
			var pattern = this.subject + this.number;
			//core.pushScene(new DungeonMap(pattern % 5));
			core.pushScene(new BattleScene());
		}
	});
	var BackArrow = Class.create(Sprite, {
		initialize: function(state) {
			Sprite.call(this, 180, 70);
			this.image = core.assets['img/backArrow.png'];
		},
		ontouchstart: function() {
			core.popScene();
		}
	});
	var Board = Class.create(Sprite, {
		initialize: function(subject) {
			Sprite.call(this, 200, 100);
			this.x = 300;
			this.y = 0;
			this.image = core.assets[boardImage[subject]];
		}
	});

//DungeonMap
	var DungeonMap = Class.create(Scene, {
		initialize: function(pattern) {
			Scene.call(this);
			this.addChild(new BackGround('img/dungeonMapBg.jpg'));
			var back = new Label('ダンジョンから抜け出す');
			this.addChild(back);
			back.on('touchstart', function() {
				core.popScene();
			});
			console.log(pattern);
		}
	});

//Battle
	var text = new Array(
    		"HP : 1",
    		"HP : 2",
    		"HP : 3",
    		"HP : 4",
    		"HP : 5");
	var status = new Label();
	var BattleScene = Class.create(Scene, {
		initialize: function() {
			Scene.call(this);
			this.addChild(new BackGround('img/dungeonMapBg.jpg'));
			core.score = 10;
			core.hp = 4;
			var userHp = "HP : ";
			userHp.font = "16px Tahoma";
        		var hp = core.hp;
        		status.text = text[hp];
        		this.addChild(status);
        		this.addChild(new Player());
        		this.addChild(new Enemy());
        		this.addChild(new Question());
        		this.addChild(new Selection(0));
        		this.addChild(new Selection(1));
        		this.addChild(new Selection(2));
        		this.addChild(new Selection(3));

        		var back = new Label('ダンジョンから抜け出す');
        		back.x = 645;
			this.addChild(back);
			back.on('touchstart', function() {
				core.popScene();
			});
        	}
	});
	var Player = Class.create(Sprite, {
		initialize: function() {
			Sprite.call(this, 176, 176);
			this.image = core.assets['img/dq.jpg'];
        		this.scaleX = 0.5;
        		this.scaleY = 0.5;
        		this.x = -50;
        		this.y = -30;
		}
	});
	var Question = Class.create(Sprite, {
		initialize: function() {
			Sprite.call(this, 500, 100);
			this.backgroundColor = "rgba(200, 255, 200, 0.5)";
        		this.x = 100;
        		this.y = 0;
		}
	});
	var Enemy = Class.create(Sprite, {
		initialize: function() {
			Sprite.call(this, 800, 400);
			this.backgroundColor = "rgba(200, 200, 200, 0.5)";
        		this.y = 100;
		}
	});
	var Selection = Class.create(Sprite, {
		initialize: function(type) {
			Sprite.call(this, 200, 100);
			this.type = type;
			if (type == 0) {
				this.backgroundColor = "rgba(150, 150, 150, 0.5)";
        			this.x = 0;
        			this.y = 500;
			} else if (type == 1) {
				this.backgroundColor = "rgba(100, 100, 100, 0.5)";
        			this.x = 200;
        			this.y = 500;
			} else if (type == 2) {
				this.backgroundColor = "rgba(50, 50, 50, 0.5)";
        			this.x = 400;
        			this.y = 500;
			} else if (type == 3) {
				this.x = 600;
        			this.y = 500;
			}
		},
		ontouchstart: function() {
			var playerAnswer = this.type;
			var loadAnswer = 0;
			if(isAnswer(playerAnswer,loadAnswer)){
                		attackEffect();
            	} else {
                		damageEffect();
            	}
		}
	});
	function attackEffect(){

    	}
    	function damageEffect(){

    	}
	var GameOverScene = Class.create(Scene, {
		initialize: function() {
			Scene.call(this);
			this.backgroundColor = 'black';
			var label = new Label();
        		label.x = 250;
       		label.y = 200;
        		label.color = 'red';
        		label.font = '48px "Arial"';
        		label.text = 'Game Over !!! <br/>';
        		this.addChild(label);
        	}
	});

	function csv2Array(filePath) { //csvﾌｧｲﾙﾉ相対ﾊﾟｽor絶対ﾊﾟｽ
		var csvData = new Array();
	     	var data = new XMLHttpRequest();
	   	data.open("GET", filePath, false); //true:非同期,false:同期
	 	data.send(null);

	 	var LF = String.fromCharCode(10); //改行ｺｰﾄﾞ
	 	var lines = data.responseText.split(LF);
	 	for (var i = 0; i < lines.length;++i) {
			var cells = lines[i].split(",");
	  		if( cells.length != 1 ) {
	    			csvData.push(cells);
	  		}
	  	}
	 	return csvData;
    	}

    	function isAnswer(playerAnswer,loadAnswer) {
        if (playerAnswer == loadAnswer) {
            return true;
        } else {
            core.hp--;
            if(core.hp < 0){
                gameOver();
            } else {
                status.text = text[core.hp];
            }
            return false;
        }
    }

	function gameOver() {
		core.pushScene(new GameOverScene());
	}

//BG
	var BackGround = Class.create(Sprite, {
		initialize: function(img) {
			Sprite.call(this, 800, 600);
			this.image = core.assets[img];
			this.x = 0;
			this.y = 0;
		}
	});



	core.fps = 15;
	core.onload = function() {
		core.pushScene(new WorldMap());
	};
	core.start();
};