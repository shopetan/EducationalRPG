enchant();

//DBから受け取るユーザーの進捗情報
var state_array = [[0,0,0,0,0],[1,0,0,1,1],[1,1,1,1,0],[0,0,1,1,0],[1,1,1,0,0],[0]]; //国数理社英
//00011101100011111100100000

var BATTLE_BGM = './bgm/BATTLE_cyrf_energy.mp3';
var PLAYER_IMG = './img/Player.png';

//画像
var islandImage = ['img/island_j.png', 'img/island_m.png', 'img/island_sc.png', 'img/island_so.png', 'img/island_e.png'];
var boardImage = ['img/board_j.png','img/board_m.png','img/board_sc.png','img/board_so.png','img/board_e.png',];
var directionImage = ["img/arrow_top.png","img/arrow_right.png","img/arrow_bottom.png","img/arrow_left.png"];
var battleImage = [PLAYER_IMG];
var dungeonMapImage = ["img/chara.png","img/minmap1.png","img/clear.png"];
var novelImage = ["img/novel.jpg"];

/** エフェクトの位置のバラ付き具合 */
var EFFECT_RANGE = 64;
/** 一回のタップで発生するエフェクトの数 */
var EFFECT_NUM = 5;


//ダンジョンマップ
var mapdata0 = [[0,1,1,1,1],[0,3,0,0,1],[0,1,1,1,1],[0,0,1,0,1],[3,1,1,0,3],[0,0,1,1,1],[2,1,1,0,0]];
var mapdata1 = [[0,0,3,0,1],[0,1,1,1,1],[0,1,0,1,0],[0,3,0,1,0],[0,1,1,1,3],[0,2,0,0,0],[0,0,0,0,0]];
var mapdata2 = [[3,1,1,1,1],[0,1,0,3,0],[1,1,1,0,0],[1,0,1,1,0],[2,0,3,0,0],[0,0,0,0,0],[0,0,0,0,0]];
var mapdata3 = [[3,1,1,0,1],[1,0,1,0,1],[1,1,1,1,1],[1,0,3,0,0],[1,3,0,0,0],[2,0,0,0,0],[0,0,0,0,0]];
var mapdata4 = [[0,0,1,0,1],[0,3,1,1,1],[0,0,1,0,3],[0,0,1,1,1],[0,1,0,0,1],[0,1,1,3,1],[0,2,0,1,0]];

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

var milkcocoa = new Milkcocoa("uniidd9umi3.mlkcca.com");
var apiEndpoint = 'https://' + 'education-rpg.auth0.com' + '/api/v2/';
var auth0 = new Auth0({
	domain: 'education-rpg.auth0.com',
 	clientID: 'JelTeIAsjRphF41HAxSxOJ785mwpaSVF',
	callbackURL: 'http://localhost:8000/'	 //サーバのアドレス
});
var lock = new Auth0Lock(
 	'JelTeIAsjRphF41HAxSxOJ785mwpaSVF',	
	'education-rpg.auth0.com'
);

window.onload = function() {
	var core = new Core(800, 600);
	core.preload('img/worldMapBg.jpg','img/islandMapBg.png','img/dungeon.png','img/dungeonMapBg.jpg','img/complete.png','img/backArrow.png','img/welcome.jpg','img/startButton.png');
	core.preload(battleImage);
	core.preload(islandImage);
	core.preload(boardImage);
	core.preload(dungeonMapImage);
	core.preload(directionImage);

	//データの計算
	function data_to_array (data) {
		for (var i = 0; i < state_array.length; i++) {
			for (var j = 0; j < state_array[i].length; j++) {
				state_array[i][j] = data%2;
				data -= data%2;
				data /= 2;
			}
		}
	}
	function array_to_data (array) {
		var n = 1;
		var result = 0;
		for (var i = 0; i < state_array.length; i++) {
			for (var j = 0; j < state_array[i].length; j++) {
				var value = state_array[i][j];
				result += value*n;
				n *= 2;
			}
		}
		return result;
	}

//Login
	var WelcomeScene = Class.create(Scene, {
		initialize: function(subject) {
			Scene.call(this);
			this.addChild(new BackGround('img/welcome.jpg'));
			this.addChild(new StartButton());
		}
	});

	var StartButton = Class.create(Sprite, {
		initialize: function(x, y, subject) {
			Sprite.call(this, 380, 100);
			this.x = 400 - 190;
			this.y = 600 - 100;
			this.image = core.assets['img/startButton.png'];
		},
		ontouchstart: function() {

			Auth(function (err, user){
				if (err){
					alert(err);
					return;
				}
				var userDataStore = milkcocoa.dataStore('userdata');
				var date = new Date();

				var metadata = {
					'userid': user.user_id,
					'date': date.getYear() +"/"+ date.getMonth() +"/"+ date.getDate() +"|"+ date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
					'loadScene': null
				}

				userDataStore.on("set", function (setted){
					core.pushScene(new WorldMap(0));
				});
				userDataStore.set(user.user_id, metadata);
			})
			//auth0認証をした後にmilkcocoaに接続
			function Auth(callback){
				milkcocoa.user(function (err, user){
			    	if (err){
			    		console.log(err);
			    		callback(err);
			    		return;
			    	}
			    	if (user){
			    		var userDataStore = milkcocoa.dataStore('userdata');
			    		userDataStore.get(user.sub, function (err, datum){
			    			if (err){
			    				console.log(err);
			    				return;
			    			}
			    			console.log(datum);
			    		})
			    	}
			/*	        	else {
			    		$('#login').submit(function (e, profile, token) {
							e.preventDefault();
							auth0.login({
						        sso: false,
						        connection: 'Username-Password-Authentication',
						        responseType: 'code',
						        scope: 'openid email user_metadata',
						        email: $('#login-email').val(),
						        password: $('#login-pass').val(),
						        callbackURL: 'http://localhost:8000/',	/*コールバックURL*/
			/*					    	successCallback: MilkcocoaUser(e, profile, token)
						    });
						});

			    	}
			*/	    else {
			    		lock.show({ssp : false, usernameStyle : 'username'}, function (err, profile, token){
			    			if (err){
			    				console.log(err);
			    				callback(err);
			    				return;
			    			}
			    			console.log(err, profile, token);
			    			milkcocoa.authWithToken(token, function(err, user){
			    				if (err){
			        				console.log(err);
			        				callback(err);	        					
			    					return;
			    				}
			    				callback(null, profile);
			    			});
			    		});
			    	}	        	
				});
			}			
			//ログイン処理
	  	}
	});

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
			switch(pattern%5) {
				case 0:
					core.pushScene(new DungeonMap(mapdata0));
					break;
				case 1:
					core.pushScene(new DungeonMap(mapdata1));
					break;
				case 2:
					core.pushScene(new DungeonMap(mapdata2));
					break;
				case 3:
					core.pushScene(new DungeonMap(mapdata3));
					break;
				case 4:
					core.pushScene(new DungeonMap(mapdata4));
					break;
			}
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
	var dungeon_x;
	var dungeon_y;
	var mapdata;
	var direct = new Array();
	var DungeonMap = Class.create(Scene, {
		initialize: function(data) {
			Scene.call(this);
			mapdata = data;
			dungeon_x = 0;
			dungeon_y = mapdata[0].length - 1;
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
			Sprite.call(this, 100, 100);
			this.image = core.assets[PLAYER_IMG];
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
        console.log(core.currentScene);
        addEffect(400, 300);
    }
    
    function damageEffect(){
        addEffect(400, 300);
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

    function isFourChoiceQuestion(choiceQuestion) {
        var isFourChoiceQuestion = true;
        if (choiceQuestion == 4) {
            return isFourChoiceQuestion;
        }
        else {
            isFourChoiceQuestion = false;
            return isFourChoiceQuestion;
        }
    }
    
    /** 単体エフェクト作成 */
    function makeSingleEffect(delay) {
        var Easing = enchant.Easing;
        var easing = Easing.SIN_EASEOUT; // イージングの種類.
        var sprite = new Sprite(100, 100);
        sprite.scaleX = 0.0;
        sprite.scaleY = 0.0;
        sprite.visible = false; // 最初は非表示.
        // エフェクトの動作設定.
        sprite.tl
            .delay(delay) // 指定時間待つ.
            .then(function() { sprite.visible = true; }) // ここで表示.
            .scaleTo(1.0, core.fps * 0.1, easing)
            .scaleTo(0.5, core.fps * 0.1, easing)
            .scaleTo(2.0, core.fps * 1, easing)
            .and().fadeOut(core.fps * 1, easing)
            .then(function() { sprite.tl.removeFromScene(); });
        core.currentScene.addChild(sprite);
        return sprite;
    }

    /** ランダムな色を作成 */
    function makeRandomColor() {
        var r = 128 + Math.ceil(Math.random() * 128);
        var g = 128 + Math.ceil(Math.random() * 128);
        var b = 128 + Math.ceil(Math.random() * 128);
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    /** 指定位置の付近に複数エフェクトを追加 */
    function addEffect(x, y) {
        for (var i = 0, iNum = EFFECT_NUM; i < iNum; ++i) {
            var sprite = makeSingleEffect(i * core.fps * 0.1);
            sprite.backgroundColor = makeRandomColor();
            sprite.x = x - (sprite.width / 2) + Math.random() * EFFECT_RANGE - (EFFECT_RANGE / 2);
            sprite.y = y - (sprite.height / 2) + Math.random() * EFFECT_RANGE - (EFFECT_RANGE / 2);
            core.currentScene.addChild(sprite);
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
		core.pushScene(new WelcomeScene());
	};
	core.start();
};
