enchant();

//DBから受け取るユーザーの進捗情報
var state_array = [[0,0,0,0,0],[1,0,0,1,1],[1,1,1,1,0],[0,0,1,1,0],[1,1,1,0,0],[1,1,1,0,0]]; //国数理社英

//画像
var islandImage = ['img/island_j.png', 'img/island_m.png', 'img/island_sc.png', 'img/island_so.png', 'img/island_e.png'];
var boardImage = ['img/board_j.png','img/board_m.png','img/board_sc.png','img/board_so.png','img/board_e.png',];
var directionImage = ["img/arrow_top.png","img/arrow_right.png","img/arrow_bottom.png","img/arrow_left.png"];
var battleImage = ['img/dq.jpg'];
var dungeonMapImage = ["img/chara.png","img/minmap1.png","img/clear.png"];

var subject = {
 	japanese: 0,
 	math: 1,
 	science: 2,
 	social: 3,
 	english: 4,
};

var direction = {
	up: 0,
	right: 1,
	down: 2,
	left: 3,
};

var number_of_dungeon = 5;
var number_of_island = 5;

window.onload = function() {
	var core = new Core(800, 600);
	core.preload('img/worldMapBg.jpg','img/islandMapBg.png','img/dungeon.png','img/dungeonMapBg.jpg','img/complete.png','img/backArrow.png');
	core.preload(battleImage);
	core.preload(islandImage);
	core.preload(boardImage);
	core.preload(dungeonMapImage);
	core.preload(directionImage);

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
			if (state_array[subject][number] == 1) {
				this.image = core.assets['img/dungeon.png'];
			} else {
				this.image = core.assets['img/complete.png'];
			}
		},
		ontouchstart: function() {
			var pattern = this.subject + this.number;
			//core.pushScene(new DungeonMap(pattern % 5));
			core.pushScene(new DungeonMap());
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
	var mapdata = [[0,1,1,1,1],[0,3,0,0,1],[0,1,1,1,1],[0,0,1,0,1],[3,1,1,0,3],[0,0,1,1,1],[2,1,1,0,0]];
	var dungeon_x = 0;
	var dungeon_y = mapdata[0].length - 1;
	var direct = new Array();
	var DungeonMap = Class.create(Scene, {
		initialize: function(mapData) {
			Scene.call(this);
			this.addChild(new BackGround('img/dungeonMapBg.jpg'));
			for (i = 0; i < 4; i++){
				var d = new Direction(i);
				this.addChild(d);
				direct[i] = d;
			}

			next_map(mapdata,dungeon_x,dungeon_y);
			first_message(this, "目的：敵を全滅せよ");
			this.addChild(new Character());
			var minmap = new minMap(this, mapdata);

			var back = new Label('ダンジョンから抜け出す');
			this.addChild(back);
			back.on('touchstart', function() {
				core.popScene();
			});
		}
	});
	var DungeonClearScene = Class.create(Scene, {
		initialize: function() {
			Scene.call(this);
			var img = new Sprite(267,48);
			img.moveTo(400 - 267 / 2, 600 - 48 / 2);
			img = core.assets["img/clear.png"];
			this.addChild(img);
			core.popScene(core.currentScene);
			this.backgroundColor = "white";
		},
		ontouchstart: function() {
			core.popScene(core.currentScene);
		}
	});

	var Direction = Class.create(Sprite, {
		initialize: function(direction) {
			var origin = [[350,50],[650,250],[350,450],[50,250]];
			Sprite.call(this, 100, 100);
			this.x = origin[direction][0];
			this.y = origin[direction][1];
			this.image = core.assets[directionImage[direction]];
			this.direction = direction;
		},
		ontouchstart: function() {
			switch(this.direction) {
				case 0:
					move_xy(dungeon_x, dungeon_y-1);
					next_map(mapdata, dungeon_x, dungeon_y);
					break;
				case 1:
					move_xy(dungeon_x + 1, dungeon_y);
					next_map(mapdata, dungeon_x, dungeon_y);
					break;
				case 2:
					move_xy(dungeon_x, dungeon_y + 1);
					next_map(mapdata, dungeon_x, dungeon_y);
					break;
				case 3:
					move_xy(dungeon_x - 1, dungeon_y);
					next_map(mapdata, dungeon_x, dungeon_y);
					break;
			}
		}
	});
	function next_map(mapdata, now_x, now_y, EventFlag){
		direction = [false,false,false,false];
		console.log(mapdata[now_x][now_y], now_x, now_y);

		if ((now_y != 0) && (mapdata[now_x][now_y - 1] != 0)){
			direction[0] = true;
		}
		if ((now_y != mapdata[0].length - 1) && (mapdata[now_x][now_y + 1] != 0)){
			direction[2] = true;
		}
		if ((now_x != 0) && (mapdata[now_x - 1][now_y] != 0)){
			direction[3] = true;
		}
		if ((now_x != mapdata.length - 1) && (mapdata[now_x + 1][now_y] != 0)){
			direction[1] = true;
		}

		for (i = 0; i < 4; i++){
			direct[i].visible = direction[i];
		}

		var EventFlag = mapdata[now_x][now_y];
		if (EventFlag == 3){
			core.pushScene(new BattleScene());
		}
		if (EventFlag == 2){
			core.pushScene(new DungeonClearScene());
		}
	}
	function move_xy(next_x, next_y){
		dungeon_x = next_x;
		dungeon_y = next_y;
	}
	function first_message(scene, msg){
		var msg_box = new Sprite(400, 50);
		msg_box.moveTo(800 / 2 - 200, 25);
		msg_box.backgroundColor = "rgba(200,200,200,0.4)";
		var message = new Label();
		message.text = msg;
		message.moveTo(800 / 2 - 150, 40);
		addChild_to_scene(scene, msg_box);
		addChild_to_scene(scene, message);
	}
	var Character = Class.create(Sprite, {
		initialize: function(direction) {
			Sprite.call(this, 150, 150);
			this.x = 325;
			this.y = 225;
			this.image = core.assets["img/chara.png"];
		}
	});
	var minMap = Class.create(Sprite, {
			mapData: [],
			direction: [],
			initialize: function (scene, mapdata){
				Sprite.call(this, 250, 150);
				var text = new Label();
				text.text = "ミニマップ";
				text.x = 520;
				text.y = 420;
				scene.addChild(text);
				this.x = 500;
				this.y = 400;
				this.backgroundColor = "#ccc";
				this.img = core.assets["img/minmap1.png"];
				this.opacity = 0.5;
				scene.addChild(this);
			},
			toMoving: function(){
				for (i=0;i<4;i++){
					if(direction[i]){

					}
				}
			}
		});
		function addChild_to_scene(scene, sprite){
			scene.addChild(sprite);
		}

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
			var origin = [[0,500],[200,500],[400,500],[600,500]];
			Sprite.call(this, 200, 100);
			this.type = type;
			this.x = origin[type][0];
			this.y = origin[type][1];
			switch(type) {
				case 0:
					this.backgroundColor = "rgba(150, 150, 150, 0.5)";
					break;
				case 1:
					this.backgroundColor = "rgba(100, 100, 100, 0.5)";
					break;
				case 2:
					this.backgroundColor = "rgba(50, 50, 50, 0.5)";
					break;
				case 3:
					this.backgroundColor = "rgba(0, 0, 0, 0.5)";
					break;
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