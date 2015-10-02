var socketio = io.connect('http://localhost:3000');

enchant();

//DBから受け取るユーザーの進捗情報
var state_array = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0]]; //国数理社英

var BATTLE_BGM = './bgm/BATTLE_cyrf_energy.mp3';
var PLAYER_IMG = '/images/Player.png';

var DUNGEON_BGM = 'bgm/DUNGEON_cyrf_wafes_dungeon01.mp3';

//画像
var islandImage = ['/images/island_j.png', '/images/island_m.png', '/images/island_sc.png', '/images/island_so.png', '/images/island_e.png','/images/island_e.png'];
var boardImage = ['/images/board_j.png','/images/board_m.png','/images/board_sc.png','/images/board_so.png','/images/board_e.png'];
var directionImage = ["/images/arrow_top.png","/images/arrow_right.png","/images/arrow_bottom.png","/images/arrow_left.png"];
var battleImage = [PLAYER_IMG];
var dungeonMapImage = ["/images/chara.png","/images/minmap1.png","/images/clear.png"];
var novelImage = ["/images/novel.jpg"];
var EnemysImage = [["/images/Japanese_Enemy01.PNG", "/images/Japanese_Enemy02.PNG", "/images/Japanese_Enemy03.PNG", "/images/Japanese_MiddleBoss01.PNG", "/images/Japanese_Boss01.PNG"], ["/images/Math_Enemy01.PNG", "/images/Math_Enemy02.PNG", "/images/Math_Enemy03.PNG", "/images/Math_MiddleBoss01.PNG", "/images/Math_Boss01.PNG"], ["/images/Science_Enemy01.PNG", "/images/Science_Enemy02.PNG", "/images/Science_Enemy03.PNG", "/images/Science_MiddleBoss01.PNG", "/images/Science_Boss01.PNG"], ["/images/Society_Enemy01.PNG", "/images/Society_Enemy02.PNG", "/images/Society_Enemy03.PNG", "/images/Society_MiddleBoss01.PNG", "/images/Society_Boss01.PNG"], ["/images/English_Enemy01.PNG", "/images/English_Enemy02.PNG", "/images/English_Enemy03.PNG", "/images/English_MiddleBoss01.PNG", "/images/English_Boss01.PNG"]];
var LastBossImage = "/images/LastBoss01.PNG";

/** エフェクトの位置のバラ付き具合 */
var EFFECT_RANGE = 64;
/** 一回のタップで発生するエフェクトの数 */
var EFFECT_NUM = 5;


//ダンジョンマップ
var mapdata0 = [[0,1,1,1,1],[0,2,0,0,1],[0,1,1,1,1],[0,0,1,0,1],[5,1,1,0,4],[0,0,1,1,1],[3,1,1,0,0]];
var mapdata1 = [[0,0,2,0,1],[0,1,1,1,1],[0,1,0,1,0],[0,3,0,1,0],[0,1,1,1,4],[0,5,0,0,0],[0,0,0,0,0]];
var mapdata2 = [[2,1,1,1,1],[0,1,0,3,0],[1,1,1,0,0],[1,0,1,1,0],[4,0,5,0,0],[0,0,0,0,0],[0,0,0,0,0]];
var mapdata3 = [[2,1,1,0,1],[1,0,1,0,1],[1,1,1,1,1],[1,0,5,0,0],[1,4,0,0,0],[3,0,0,0,0],[0,0,0,0,0]];
var mapdata4 = [[0,0,1,0,1],[0,3,1,1,1],[0,0,1,0,3],[0,0,1,1,1],[0,1,0,0,1],[0,1,1,3,1],[0,2,0,1,0]];
var mapdata5 = [[6,1,1,1,1],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
var mapdata6 = [[7,1,1,1,1],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];

var subject = {
 	japanese: 0,
 	math: 1,
 	science: 2,
 	social: 3,
 	english: 4
}

var direction = {
	up: 0,
	right: 1,
	down: 2,
	left: 3
}

var number_of_dungeon = 5;
var number_of_island = 5;

window.onload = function() {
	var core = new Core(800, 600);
	core.preload('/images/worldMapBg.jpg','/images/islandMapBg.png','/images/dungeon.png','/images/dungeonMapBg.jpg','/images/complete.png','/images/backArrow.png','/images/welcome.jpg','/images/startButton.png');
	core.preload(battleImage);
	core.preload(islandImage);
	core.preload(boardImage);
	core.preload(dungeonMapImage);
	core.preload(directionImage);
    for (var i = 0; i < EnemysImage.length; i++){
        core.preload(EnemysImage[i]);
    }
	core.preload(LastBossImage);
	core.preload(DUNGEON_BGM);
	core.preload("/images/minmapblock.jpeg");
	core.preload("/images/playerblock.jpeg");

	//データの計算
	function data_to_array(data) {
		for (var i = 0; i < state_array.length; i++) {
			for (var j = 0; j < state_array[i].length; j++) {
				state_array[i][j] = data%2;
				data -= data%2;
				data /= 2;
			}
		}
	}
	function array_to_data() {
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
			this.addChild(new BackGround('/images/welcome.jpg'));
			this.addChild(new StartButton());
		}
	});

	var StartButton = Class.create(Sprite, {
		initialize: function(x, y, subject) {
			Sprite.call(this, 380, 100);
			this.x = 400 - 190;
			this.y = 600 - 100;
			this.image = core.assets['/images/startButton.png'];
		},
		ontouchstart: function() {
			//ログイン処理
			core.pushScene(new WorldMap());
	  	}
	});

//WorldMap
	var WorldMap = Class.create(Scene, {
		initialize: function() {
			var islandOrigin = [[272,5],[-20,100],[560,100],[110,344],[440,344],[272,200]];
			data_to_array(user_state);
			Scene.call(this);
			this.addChild(new BackGround('/images/worldMapBg.jpg'));
			for (var i = 0; i < islandOrigin.length-1; i++) {
				this.addChild(new Island(islandOrigin[i][0], islandOrigin[i][1], i));
			}
			if (state_array[5][0]) {
				this.addChild(new Island(islandOrigin[5][0], islandOrigin[5][1], 5));
			}
		}
	});
	var now_subject;
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
			now_subject = this.subject;
        	}
	});

//IslandMap
	var IslandMap = Class.create(Scene, {
		initialize: function(subject) {
			var dungeonOrigin = [[80,160],[310,300],[570,225],[20,400],[480,500]];
			Scene.call(this);
			this.addChild(new BackGround('/images/islandMapBg.png'));
			this.addChild(new Board(subject));
			this.addChild(new BackArrow());
			for (var i = 0; i < dungeonOrigin.length; i++){
 				this.addChild(new Dungeon(dungeonOrigin[i][0], dungeonOrigin[i][1], subject, i));
			}
		}
	});
	var now_dungeon;
	var Dungeon = Class.create(Sprite, {
		initialize: function(x, y, subject, number) {
			Sprite.call(this, 180, 90);
			this.x = x;
			this.y = y;
			this.subject = subject;
			this.number = number;
			if (state_array[subject][number] == 0) {
				this.image = core.assets['/images/dungeon.png'];
			} else {
				this.image = core.assets['/images/complete.png'];
			}
		},
		ontouchstart: function() {
			var pattern = this.subject + this.number;
			now_dungeon = this.number;
			switch(pattern%5) {
				case 0:
					core.pushScene(new DungeonMap(mapdata0, this.subject, this.number));
					break;
				case 1:
					core.pushScene(new DungeonMap(mapdata1, this.subject, this.number));
					break;
				case 2:
					core.pushScene(new DungeonMap(mapdata2, this.subject, this.number));
					break;
				case 3:
					core.pushScene(new DungeonMap(mapdata3, this.subject, this.number));
					break;
				case 4:
					core.pushScene(new DungeonMap(mapdata4, this.subject, this.number));
					break;
			}
		}
	});
	var BackArrow = Class.create(Sprite, {
		initialize: function(state) {
			Sprite.call(this, 180, 70);
			this.image = core.assets['/images/backArrow.png'];
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
	var now_chapter;
	var DungeonMap = Class.create(Scene, {
		initialize: function(data, subject, chapter) {
			Scene.call(this);
			mapdata = data;
			dungeon_x = 0;
			dungeon_y = mapdata[0].length - 1;
			this.subject = subject;
			now_chapter = chapter;
			this.addChild(new BackGround('/images/dungeonMapBg.jpg'));
			for (i = 0; i < 4; i++){
				var d = new Direction(i);
				this.addChild(d);
				direct[i] = d;
			}

			next_map(mapdata,dungeon_x,dungeon_y);
			Presented_Message(this, "目的：敵を全滅せよ");
			this.addChild(new Character());
			var minmap = new minMap(this, mapdata);

			var back = new Label('ダンジョンから抜け出す');
			this.addChild(back);
			back.on('touchstart', function() {
				loopBgm_Ctrl(DUNGEON_BGM, 'stop');
				core.popScene();
			});
			loopBgm_Ctrl(DUNGEON_BGM, 'play');
		}
	});
	var DungeonClearScene = Class.create(Scene, {
		initialize: function() {
			Scene.call(this);
			var img = new Sprite(267,48);
			img.moveTo(400 - 267 / 2, 600 - 48 / 2);
			img = core.assets["/images/clear.png"];
			this.addChild(img);
			core.popScene(core.currentScene);
			this.backgroundColor = "white";
		},
		ontouchstart: function() {
			core.popScene(core.currentScene);
			core.popScene(core.currentScene);
			core.popScene(core.currentScene);
			core.pushScene(new IslandMap(now_subject));
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
					moveEffect_y('/images/dungeonMapBg.jpg', 1);
					next_map(mapdata, dungeon_x, dungeon_y);
					break;
				case 1:
					move_xy(dungeon_x + 1, dungeon_y);
					moveEffect_x('/images/dungeonMapBg.jpg', 1);
					next_map(mapdata, dungeon_x, dungeon_y);
					break;
				case 2:
					move_xy(dungeon_x, dungeon_y + 1);
					moveEffect_y('/images/dungeonMapBg.jpg', -1);
					next_map(mapdata, dungeon_x, dungeon_y);
					break;
				case 3:
					move_xy(dungeon_x - 1, dungeon_y);
					moveEffect_x('/images/dungeonMapBg.jpg', -1);
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
		if ((now_x != mapdata.length - 1) && (mapdata[now_x + 1][now_y] != 0)){
			direction[1] = true;
		}
		if ((now_y != mapdata[0].length - 1) && (mapdata[now_x][now_y + 1] != 0)){
			direction[2] = true;
		}
		if ((now_x != 0) && (mapdata[now_x - 1][now_y] != 0)){
			direction[3] = true;
		}

		for (i = 0; i < 4; i++){
			direct[i].visible = direction[i];
		}

		var EventFlag = mapdata[now_x][now_y];
		var subject_number = now_subject;
		var chapter_number = now_chapter;

		if (EventFlag >= 2 && EventFlag < 5){
			var difficulty = EventFlag - 2;
 			loopBgm_Ctrl(DUNGEON_BGM, 'pause');
 			console.log(subject_number, chapter_number, difficulty, EventFlag, EnemysImage[subject_number][difficulty])
			core.pushScene(new BattleScene(EventFlag, subject_number, chapter_number, difficulty, EnemysImage[subject_number][difficulty]));
		}
		else if (EventFlag >= 5){
			loopBgm_Ctrl(DUNGEON_BGM, 'stop');
			core.pushScene(new BattleScene(EventFlag, subject_number, chapter_number, 3, EnemysImage[subject_number][3]));
		}
		else if (EventFlag == 6){
			loopBgm_Ctrl(DUNGEON_BGM, 'stop');
			core.pushScene(new BattleScene(EventFlag, subject_number, chapter_number, 4, EnemysImage[subject_number][4]));
		}
		else if (EventFlag == 7){
			loopBgm_Ctrl(DUNGEON_BGM, 'stop');
			core.pushScene(new BattleScene(EventFlag, subject_number, chapter_number, 5, LastBossImage));
//			core.pushScene(new DungeonClearScene());
		}
	}

	function move_xy(next_x, next_y){
		core.currentScene.addChild(new MapBlock( 510 + 40 * dungeon_x, 400 + 40 * dungeon_y, "/images/minmapblock.jpeg", false));		
		dungeon_x = next_x;
		dungeon_y = next_y;
		core.currentScene.addChild(new MapBlock( 510 + 40 * dungeon_x, 400 + 40 * dungeon_y, "/images/minmapblock.jpeg", false));		
		core.currentScene.addChild(new MapBlock( 510 + 40 * dungeon_x, 400 + 40 * dungeon_y, "/images/playerblock.jpeg", true));
	}
	function Presented_Message(scene, msg){
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
			this.image = core.assets["/images/chara.png"];
		}
	});
	var minMap = Class.create(Sprite, {
		mapData: [],
		direction: [],
		initialize: function (scene, mapdata){
			Sprite.call(this, 300, 250);
			var text = new Label();
			text.text = "ミニマップ";
			text.x = 520;
			text.y = 420;
			scene.addChild(text);
			this.x = 500;
			this.y = 400;
			this.backgroundColor = "#ccc";
			this.opacity = 0.5;
			scene.addChild(this);
/*			
			for (var i = 0; i < mapdata.length; i++){
				for (var j = 0; j < mapdata[0].length; j++){
					if (mapdata[i][j]){
						scene.addChild(new MapBlock(510 + 40 * i, 400 + 40 * j, "/images/minmapblock.jpeg"));
					}
				}
			}
*/		scene.addChild(new MapBlock( 510 + 40 * dungeon_x, 400 + 40 * dungeon_y, "/images/minmapblock.jpeg", false));		
		scene.addChild(new MapBlock(510 + 40 * dungeon_x, 400 + 40 * dungeon_y, "/images/playerblock.jpeg", true));
		}	
	});

	var MapBlock = Class.create(Sprite, {
		initialize: function (x, y, MapBlockImage, playerFlag){
			Sprite.call(this, 30, 30); 
			this.x = x;
			this.y = y;
			this.image = core.assets[MapBlockImage];
			if (playerFlag){
				var opacity = 1;
				this.tl.delay(2).fadeOut(12).fadeIn(12).loop();
			}
		}
	});
	function addChild_to_scene(scene, sprite){
		scene.addChild(sprite);
	}
	function moveEffect_x(bg, dir){
		var orignbackground = core.currentScene.firstChild;
		var EffectForTrace = new BackGround(bg);
		var scroll_spped = -100;
		core.currentScene.insertBefore(EffectForTrace, core.currentScene.firstChild);
		EffectForTrace.x = 800 * dir;

		orignbackground.addEventListener("enterframe", function (){
			this.x += scroll_spped * dir;
			if (this.x > 800 || this.x < -800){
				this.x = 0;
				this.removeEventListener("enterframe", arguments.callee);
			}
		});

		EffectForTrace.onenterframe = function (){
			this.x += scroll_spped * dir;
			switch (dir){
				case 1:
					if (this.x < 0){
						console.log('right');
						core.currentScene.removeChild(this);
					}
					break;
				case -1:
					if (this.x > 0){
						console.log('left');
						core.currentScene.removeChild(this);
					}
					break;	
			} 
		}
	}

	function moveEffect_y(bg, dir){
		var orignbackground = core.currentScene.firstChild;
		var EffectForTrace = new BackGround(bg);
		var scroll_spped = 60;
		core.currentScene.insertBefore(EffectForTrace, core.currentScene.firstChild);
		EffectForTrace.y = -600 * dir;

		orignbackground.addEventListener("enterframe", function (){
			this.y += scroll_spped * dir;
			if (this.y > 600 || this.y < -600){
				this.y = 0;
				this.removeEventListener("enterframe", arguments.callee);
			}
		});

		EffectForTrace.onenterframe = function (){
			this.y += scroll_spped * dir;
			switch (dir){
				case 1:
					if (this.y > 0){
						console.log('up');
						core.currentScene.removeChild(this);
					}
					break;
				case -1:
					if (this.y < -600){
						console.log('bottom');
						core.currentScene.removeChild(this);
					}
					break;	
			} 
		}
	}

	function loopBgm_Ctrl(bgm, command){
		var BGM = core.assets[bgm];
		switch (command){
			case 'play':
				BGM.play();
				BGM.src.loop = true;
				break;
			case 'pause':
				BGM.src.loop = false;
				BGM.pause();
				break;
			case 'stop':
				BGM.src.loop = false;
				BGM.stop();
				break;
		}
	}

	//関数の処理待ちをするために
	//実装する必要あり
	//使用場所．　移動エフェクトをバトル画面に遷移する前に行う．
	function Wait(callback){
		callback(result);
	}

//Battle
	var text = new Array(
    		"HP : 1",
    		"HP : 2",
    		"HP : 3",
    		"HP : 4",
    		"HP : 5");
	var status = new Label();
	var event_type;
	var BattleScene = Class.create(Scene, {
		initialize: function(eventFlag, subject, chapter, difficulty, EnemyImagePath) {
			Scene.call(this);
			event_type = eventFlag;
			this.addChild(new BackGround('/images/dungeonMapBg.jpg'));
			core.score = 10;
			core.hp = 4;
			var userHp = "HP : ";
			userHp.font = "16px Tahoma";
        	var hp = core.hp;
        	status.text = text[hp];
            socketio.on( "connect", function() {} );
            socketio.emit("fetchDB",{
                subject: subject,
                chapter: chapter,
                difficulty: difficulty
            });
            socketio.on('returnRecord', function(records){
                var problemSize = records.length
                if(problemSize == 0){
                    return;
                }else{
                    for(var i = 0; i < problemSize; i++){
                        //TODO: Objectを別の変数に格納する．格納した変数はQuestionクラスなどに利用して問題文の提示，問題の正解不正解に応じた関数の実装を行う
                        //isAnswer()はできているので，後はisKnockDown()という，全ての問題をクリアしたか否かという関数の実装を行う
                    }
                }
            });
            var choiceQuestion = 2;
        	this.addChild(status);
        	this.addChild(new Player());
        	this.addChild(new Enemy(EnemyImagePath));
        	this.addChild(new QuestionBase());
            this.addChild(new Question());
        	this.addChild(new Selection(0,choiceQuestion));
        	this.addChild(new Selection(1,choiceQuestion));
        	this.addChild(new Selection(2,choiceQuestion));
        	this.addChild(new Selection(3,choiceQuestion));

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
		}
	});
	var QuestionBase = Class.create(Sprite, {
		initialize: function() {
			Sprite.call(this, 500, 100);
			this.backgroundColor = "rgba(200, 255, 200, 0.5)";
        		this.x = 100;
        		this.y = 0;
		}
	});
    var Question = Class.create(Sprite, {
		initialize: function() {
			Sprite.call(this, 500, 100);
			this.backgroundColor = "rgba(200, 200, 200, 0.5)";
            this.x = 100;
        	this.y = 0;
		}
	});

	var Enemy = Class.create(Sprite, {
		initialize: function(EnemyImagePath) {
			Sprite.call(this, 800, 400);
            this.image = core.assets[EnemyImagePath];
			this.backgroundColor = "rgba(200, 200, 200, 0.5)";
            this.y = 100;
		}
	});
	var Selection = Class.create(Sprite, {
		initialize: function(type,choiceQuestion) {
			var fourChoiceQuestion = [[0,500],[200,500],[400,500],[600,500]];
            var twoChoiceQuestion  = [[0,500],[400,500],[800,600],[800,600]];
            if(isFourChoiceQuestion(choiceQuestion)) {
                Sprite.call(this, 200, 100);
                this.type = type;
			    this.x = fourChoiceQuestion[type][0];
			    this.y = fourChoiceQuestion[type][1];
            }
            else {
                Sprite.call(this, 400, 100);
                this.type = type;
			    this.x = twoChoiceQuestion[type][0];
			    this.y = twoChoiceQuestion[type][1];
            }
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
                		if (event_type == 2) {
                			clear_dungeon();
                		} else if (event_type == 3) {
                			win_battle();
                		}
            	} else {
                		damageEffect();
            	}
		}
	});
	function win_battle () {
		mapdata[dungeon_x][dungeon_y] = 1;
		core.popScene();
	}
	function clear_dungeon (argument) {
		state_array[now_subject][now_dungeon] = 1;
		core.pushScene(new DungeonClearScene());
	}

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
        },
        ontouchstart: function() {
			core.pushScene(new WorldMap);
		}
	});


	function attackEffect(){
        addEffect(400, 300);
    }

    function damageEffect(){
        addEffect(400, 300);
    }

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
		var status = $("#status").text();
		user_state = Number(status);
		data_to_array(user_state);
		core.pushScene(new WelcomeScene());
	};
	core.start();
};
