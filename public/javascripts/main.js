var socketio = io.connect('http://localhost:3000');

enchant();

//DBから受け取るユーザーの進捗情報
var state_array = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0]]; //国数理社英他(全クリア,初回完了)

var BATTLE_BGM = '/bgm/BATTLE_cyrf_energy.mp3';
var PLAYER_IMG = '/images/Player.png';
var BATTLE4_IMG = '/images/Battle.png';
var BATTLE2_IMG = '/images/Battle2.png';

var DUNGEON_BGM = '/bgm/DUNGEON_cyrf_wafes_dungeon01.mp3';
var LAST_DUNGEON_BGM = '/bgm/LAST_DUNGEON_cyrf_asobi_the_mother.mp3';
var BATTLE_BOSS_BGM = '/bgm/BOSS_cyrf_attacker.mp3';
var BATTLE_LAST_BOSS_BGM = '/bgm/LASTBOSS_cyrf_lost_shrine.mp3';
var TITLE_BGM = '/bgm/TITLE_cyrf_waiting_room.mp3';
var ISLAND_BGM = '/bgm/PSELECT_cyrf_vintage_machine_shop.mp3';
var DUNGEON_SELECT_BGM = '/bgm/DSELECT_cyrf_termination_another_side.mp3';
var SE_OK = "/bgm/M_SE_OK_se_maoudamashii_chime10.mp3";
var SE_NG = "/bgm/M_SE_NG_se_maoudamashii_chime08.mp3";
var SE_DEFEATED = "/bgm/M_SE_DEFEATED_se_maoudamashii_explosion03.mp3";

//画像
var dungeonImage_150 = [
["/images/Dungeon_150/DUNGEON_HOLE_01.PNG","/images/Dungeon_150/DUNGEON_HOLE_02.PNG","/images/Dungeon_150/DUNGEON_HOLE_03.PNG","/images/Dungeon_150/DUNGEON_HOLE_04.PNG","/images/Dungeon_200/DUNGEON_HOLE_05.PNG"],
["/images/Dungeon_150/DUNGEON_ROCK_01.PNG","/images/Dungeon_150/DUNGEON_ROCK_02.PNG","/images/Dungeon_150/DUNGEON_ROCK_03.PNG","/images/Dungeon_150/DUNGEON_ROCK_04.PNG","/images/Dungeon_200/DUNGEON_ROCK_05.PNG"],
["/images/Dungeon_150/DUNGEON_CRYSTAL_01.PNG","/images/Dungeon_150/DUNGEON_CRYSTAL_02.PNG","/images/Dungeon_150/DUNGEON_CRYSTAL_03.PNG","/images/Dungeon_150/DUNGEON_CRYSTAL_04.PNG","/images/Dungeon_200/DUNGEON_CRYSTAL_05.PNG"],
["/images/Dungeon_150/DUNGEON_SATELITE_01.PNG","/images/Dungeon_150/DUNGEON_SATELITE_02.PNG","/images/Dungeon_150/DUNGEON_SATELITE_03.PNG","/images/Dungeon_150/DUNGEON_SATELITE_04.PNG","/images/Dungeon_200/DUNGEON_SATELITE_05.PNG"],
["/images/Dungeon_150/DUNGEON_MARCO_01.PNG","/images/Dungeon_150/DUNGEON_MARCO_02.PNG","/images/Dungeon_150/DUNGEON_MARCO_03.PNG","/images/Dungeon_150/DUNGEON_MARCO_04.PNG","/images/Dungeon_200/DUNGEON_MARCO_05.PNG"],
["/images/Dungeon_150/DUNGEON_MARCO_01.PNG","/images/Dungeon_150/DUNGEON_MARCO_02.PNG","/images/Dungeon_150/DUNGEON_MARCO_03.PNG","/images/Dungeon_150/DUNGEON_MARCO_04.PNG","/images/Dungeon_200/DUNGEON_MARCO_05.PNG"]];

var dungeonImage_200 = [
["/images/Dungeon_200/DUNGEON_HOLE_01.PNG","/images/Dungeon_200/DUNGEON_HOLE_02.PNG","/images/Dungeon_200/DUNGEON_HOLE_03.PNG","/images/Dungeon_200/DUNGEON_HOLE_04.PNG","/images/Dungeon_200/DUNGEON_HOLE_05.PNG"],
["/images/Dungeon_200/DUNGEON_ROCK_01.PNG","/images/Dungeon_200/DUNGEON_ROCK_02.PNG","/images/Dungeon_200/DUNGEON_ROCK_03.PNG","/images/Dungeon_200/DUNGEON_ROCK_04.PNG","/images/Dungeon_200/DUNGEON_ROCK_05.PNG"],
["/images/Dungeon_200/DUNGEON_CRYSTAL_01.PNG","/images/Dungeon_200/DUNGEON_CRYSTAL_02.PNG","/images/Dungeon_200/DUNGEON_CRYSTAL_03.PNG","/images/Dungeon_200/DUNGEON_CRYSTAL_04.PNG","/images/Dungeon_200/DUNGEON_CRYSTAL_05.PNG"],
["/images/Dungeon_200/DUNGEON_SATELITE_01.PNG","/images/Dungeon_200/DUNGEON_SATELITE_02.PNG","/images/Dungeon_200/DUNGEON_SATELITE_03.PNG","/images/Dungeon_200/DUNGEON_SATELITE_04.PNG","/images/Dungeon_200/DUNGEON_SATELITE_05.PNG"],
["/images/Dungeon_200/DUNGEON_MARCO_01.PNG","/images/Dungeon_200/DUNGEON_MARCO_02.PNG","/images/Dungeon_200/DUNGEON_MARCO_03.PNG","/images/Dungeon_200/DUNGEON_MARCO_04.PNG","/images/Dungeon_200/DUNGEON_MARCO_05.PNG"],
["/images/Dungeon_200/DUNGEON_MARCO_01.PNG","/images/Dungeon_200/DUNGEON_MARCO_02.PNG","/images/Dungeon_200/DUNGEON_MARCO_03.PNG","/images/Dungeon_200/DUNGEON_MARCO_04.PNG","/images/Dungeon_200/DUNGEON_MARCO_05.PNG"]];

var boardImage = ['/images/board_j.png','/images/board_m.png','/images/board_sc.png','/images/board_so.png','/images/board_e.png','/images/board_e.png'];
var directionImage = ["/images/arrow_up.png","/images/arrow_right.png","/images/arrow_down.png","/images/arrow_left.png"];
var battleImage = [PLAYER_IMG,BATTLE4_IMG,BATTLE2_IMG];
var dungeonMapImage = ["/images/PlayerInDungeon.PNG","/images/MiniMap.png","/images/clear.png", "/images/away.png", "/images/Message.png"];
var novelImage = ["/images/NovelPart/Novel_Japanese.png","/images/NovelPart/Novel_Math.png","/images/NovelPart/Novel_Science.png","/images/NovelPart/Novel_Society.png","/images/NovelPart/Novel_English.png","/images/NovelPart/Novel_LastIntro.png","/images/NovelPart/Novel_LastBoss.png",];
var introNovelImage = ["/images/NovelPart/Novel_Intro1.png","/images/NovelPart/Novel_Intro2.png","/images/NovelPart/Novel_Intro3.png",];
var EnemysImage = [["/images/Japanese_Enemy01.PNG", "/images/Japanese_Enemy02.PNG", "/images/Japanese_Enemy03.PNG", "/images/Japanese_MiddleBoss01.PNG", "/images/Japanese_Boss01.PNG"], ["/images/Math_Enemy01.PNG", "/images/Math_Enemy02.PNG", "/images/Math_Enemy03.PNG", "/images/Math_MiddleBoss01.PNG", "/images/Math_Boss01.PNG"], ["/images/Science_Enemy01.PNG", "/images/Science_Enemy02.PNG", "/images/Science_Enemy03.PNG", "/images/Science_MiddleBoss01.PNG", "/images/Science_Boss01.PNG"], ["/images/Society_Enemy01.PNG", "/images/Society_Enemy02.PNG", "/images/Society_Enemy03.PNG", "/images/Society_MiddleBoss01.PNG", "/images/Society_Boss01.PNG"], ["/images/English_Enemy01.PNG", "/images/English_Enemy02.PNG", "/images/English_Enemy03.PNG", "/images/English_MiddleBoss01.PNG", "/images/English_Boss01.PNG"]];
var LastBossImage = "/images/LastBoss01.PNG";
var BattleBackGroundImage = [["/images/Memoria_BackGround_Japanese_Enemy.png", "/images/Memoria_BackGround_Japanese_Boss.png"], ["/images/Memoria_BackGround_Math_Enemy.png", "/images/Memoria_BackGround_Math_Boss.png"], ["/images/Memoria_BackGround_Science_Enemy.png", "/images/Memoria_BackGround_Science_Boss.png"], ["/images/Memoria_BackGround_Society_Enemy.png", "/images/Memoria_BackGround_Society_Boss.png"], ["/images/Memoria_BackGround_English_Enemy.png", "/images/Memoria_BackGround_English_Boss.png"], ["/images/Memoria_BackGround_LastBoss_Enemy.png", "/images/Memoria_BackGround_LastBoss_Boss.png"]];
var MinMapBlockImage = ["/images/minmapblock.jpeg", "/images/playerblock.jpeg"];
var BGMSET = [DUNGEON_BGM, BATTLE_BGM, BATTLE_BOSS_BGM, TITLE_BGM, LAST_DUNGEON_BGM, ISLAND_BGM, DUNGEON_SELECT_BGM];
var SESET = [SE_OK,SE_NG,SE_DEFEATED];

//ノベルストーリー
var story = [
[["カティ","今日は 9 月 1 日。学校が始まる日だ……","どうしよう、夏休みの宿題、何もやってないぞ。"],
["カティ","まあ、いっか。何とかなるさ。","とりあえず、学校に行こう。"],
["カティ","あれ……？おかしいな。","授業の時間なのに、誰もいないぞ。"],
["黒板","「八月三十二日　日直：カティ」","「夢幻之八月呪縛、愈々脱出不可能也」"],
["カティ","え、八月三十二日……？嘘、今日は……","それに、この文字は……誰の……"],
["？？？","俺が見えるか、愚かな種族たる猫人よ。","貴様は「八月の呪縛」に囚われているのだ。"],
["？？？","呪縛に囚われた貴様には、この世界も必要あるまい。","我々の世界で、無為な永遠を過ごすが良い……"],
["カティ","な、何だこいつは、呪縛って何のことだ……？","分からない、訳が分からないよ……！"],
["？？？","夢幻地獄にて、懺悔と絶望を味わうが良い！","我々が直々に相手をしてやろう！"],
["カティ","こ、黒板に吸い込まれる！！！","うわぁぁぁぁぁぁっ！！！！！"]],
[["漢橙龍","俺は漢橙龍。「国語島」を統べる龍神だ。","龍神と言っても、今は機械体の身だがな。"],
["漢橙龍","死の間際に永遠を願ったばかりに、この様だ。","老いもせず朽ち果てもせず、ただ生きるのみ。"],
["漢橙龍","嘗ての仲間は、皆逝ってしまった……。","永遠の生命とは、こうも儚いものであったか……"],
["漢橙龍","元の世界に戻りたくば、先ずはこの俺を倒すがいい！","永遠を望んだことの愚かさを教えてやろう！"]],
[["G.CUBE","貴様がカティか。","私はグレイブキューブ。古代文明の生き残りだ。"],
["G.CUBE","古代より、怠惰な種族には絶滅あるのみ。","努力を積み重ねてきたからこそ、生存できるのだ。"],
["G.CUBE","故に、怠惰を積み重ねる者に存在の理由などない。","「あのお方」の手を煩わせるまでもないだろうな。"],
["G.CUBE","悪いが、貴様にはここで消えてもらう！","貴様自身の怠惰を、心より懺悔せよ！"]],
[["クラヴィスΩ","この俺の部下を下したか。大したものだ。","俺の名はクラヴィスΩ……見ての通りのロボットだ。"],
["クラヴィスΩ","人に動かされる生命、自律して動く生命。","貴様はそのどちらを望む？"],
["クラヴィスΩ","「八月の呪縛」に囚われた貴様には答えられるまい。","いくら自律を望んでも、行動が伴わねばな。"],
["クラヴィスΩ","機械生命体ですら、自主自律のできる時代。","それすら出来ない生命体になど、用はない！"]],
[["デザイアAI","第一地球軍、外宇宙方面部隊旗艦デザイア搭載AI……","登録されている声紋の入力を……"],
["デザイアAI","何だ、乗員ではないのか。","話は聞いているぞ、カティと言ったな。"],
["デザイアAI","遥か昔、このデザイアにも人間の乗員がいた。","今でこそ、この戦艦は私が……AIが動かしているがな。"],
["デザイアAI","艦長は……己が欲望に塗れ、傲慢を尽くし、","遂には仲間にも見捨てられ、艦を沈められてしまった。"],
["デザイアAI","私は学んだ、過ぎた欲望、無用な傲慢……","それこそ全ての生命体の大敵であると！"],
["デザイアAI","一時の誘惑から、欲望に、傲慢に溺れたこと。","黄泉の国にて、深く絶望せよ！"]],
[["守護神マルコ","我が防衛網が突破されただと……","衛兵達よ、安らかに眠れ……"],
["守護神マルコ","……我が名は守護神マルコ、五大従者の一だ。","数々の防衛網を突破した実力、認めてやろう。"],
["守護神マルコ","しかし、その無計画さでは「八月の呪縛」は","決して突破することは出来まいな。"],
["守護神マルコ","我は存在する……綿密な計画の下に、我は存在する。","貴様は、所詮計画から外れた存在……"],
["守護神マルコ","そのような存在に、負けるわけには参らん！","我が完全なる計画の前に、息絶えるが良い！"]],
[["漢橙龍","五大従者を下し、夢幻城に乗り込んでくるとは……","大したものだ、その努力は褒めてやろう。"],
["守護神マルコ","もう我等に、五大従者に一切の手は残っていない。","貴様の勝ちだ、カティ。"],
["デザイアAI","だが、この夢幻城からは逃がさんぞ。","八月の呪縛は、我らが生命が尽きようと永遠に続く！"],
["G.CUBE","しかし、夢幻城の維持ももう限界だ……","我々も相当に消耗してしまったからな。"],
["クラヴィスΩ","かくなる上は……我らが盟約、覚えておるな。","「あのお方」の力を、再びお借りする時が来たのだ！"],
["守護神マルコ","「八月の呪縛」を司りし夢幻の戦神……","召喚の代償は、我等が五大従者全ての生命……！"],
["漢橙龍","今更何を迷うことがあろうか。","俺達は……俺達の出来ることをするまでだ。"],
["G.CUBE","後は夢幻の戦神が、夢幻神メンダー様が、","我々に代わり、全ての始末をして下さる！"],
["クラヴィスΩ","従者達よ、今再び集え！","我らが生命を燃やし、夢幻神を再誕させるのだ！"],
["五大従者","うおおおおおおおおぉぉぉっっ！！！！！！！！",""],
["夢幻神メンダー","…………………………………………………","誰だ……我を呼ぶのは……我の身体は……"],
["夢幻神メンダー","……そうか。漢橙龍、グレイブキューブ、","クラヴィスΩ、マルコ、デザイア……"],
["夢幻神メンダー","そして、我が盟友を下したのが……貴様、カティか。","「八月の呪縛」も解けかかっておるな……"],
["夢幻神メンダー","良かろう。最後の勝負、受けて立とうではないか。","我が盟友に誓い、貴様をここで始末する！"]],
[["夢幻神メンダー","欲望、傲慢、怠惰を克服し","計画と自律を身に着けたか……。"],
["夢幻神メンダー","「八月の呪縛」も、意義を全うしてくれたか。","呪縛と共に、我の存在も……もう持つまいな。"],
["夢幻神メンダー","俺の負けだ。","カティよ、貴様を元の世界に戻してやろう……"],
["夢幻神メンダー","さあ、行け。九月の世界が待っているぞ。","さらばだ、カティ……"]]];

/** エフェクトの位置のバラ付き具合 */
var EFFECT_RANGE = 64;
/** 一回のタップで発生するエフェクトの数 */
var EFFECT_NUM = 5;

/*許してくれッ… こんなグローバル変数を用意した愚かな@ss_shopetanを…*/
var win_flag = false;

//ダンジョンマップ
var mapdata0 = [[0,1,1,1,1],[0,2,0,0,1],[0,1,1,1,1],[0,0,1,0,1],[5,1,1,0,4],[0,0,1,1,1],[3,1,1,0,0]];
var mapdata1 = [[0,0,2,0,1],[0,1,1,1,1],[0,1,0,1,0],[0,3,0,1,0],[0,1,1,1,4],[0,5,0,0,0],[0,0,0,0,0]];
var mapdata2 = [[2,1,1,1,1],[0,1,0,3,0],[1,1,1,0,0],[1,0,1,1,0],[4,0,5,0,0],[0,0,0,0,0],[0,0,0,0,0]];
var mapdata3 = [[2,1,1,0,1],[1,0,1,0,1],[1,1,1,1,1],[1,0,5,0,0],[1,4,0,0,0],[3,0,0,0,0],[0,0,0,0,0]];
var mapdata4 = [[0,0,1,0,1],[0,2,1,1,1],[0,0,1,0,5],[0,0,1,1,1],[0,1,0,0,1],[0,1,1,3,1],[0,4,0,1,0]];
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
	core.preload('/images/dungeonMapBg.jpg','/images/complete.png','/images/backArrow.png','/images/Title.png');

	core.preload(battleImage);
	core.preload(boardImage);
	core.preload(dungeonMapImage);
	core.preload(directionImage);
	preloadImage(EnemysImage);
	preloadImage(dungeonImage_150);
	preloadImage(dungeonImage_200);
	preloadImage(BattleBackGroundImage);
	core.preload(BGMSET);
    core.preload(SESET);
	core.preload(LastBossImage);
	core.preload(MinMapBlockImage);
	core.preload(introNovelImage);
	core.preload(novelImage);

	function preloadImage(array) {
		for (var i = 0; i < array.length; i++) {
			core.preload(array[i]);
		}
	}

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

	function saveData() {
		var status = array_to_data();
		var uid = $("#uid").text();
		var displayName = $("#name").text();
		socketio.emit("updateState", {
			status: status,
			uid: uid,
			displayName: displayName
		});
	}

//Novel
	var NovelScene = Class.create(Scene, {
		initialize: function(type,battle,bgm) {
			Scene.call(this);
			this.index = 0;
			this.type = type;
			this.battle = battle;
			this.bgm = bgm;
			loopBgm_Ctrl(this.bgm, 'play');
			if (type == 0) {
				this.addChild(new BackGround(introNovelImage[0]));
			} else {
				this.addChild(new BackGround(novelImage[type-1]));
			}
			var name = new Label(story[type][this.index][0]);
			var story1 = new Label(story[type][this.index][1]);
			var story2 = new Label(story[type][this.index][2]);
			name.color = "white";
			story1.color = "white";
			story2.color = "white";
			name.font = "25px cursive";
			story1.font = "25px cursive";
			story2.font = "25px cursive";
			name.x = 30;
			name.y = 363;
			story1.x = 30;
			story1.y = 440;
			story1.width = 700;
			story2.x = 30;
			story2.y = 500;
			story2.width = 700;
			this.name = name;
			this.story1 = story1;
			this.story2 = story2;
			this.addChild(name);
			this.addChild(story1);
			this.addChild(story2);
		},
		ontouchstart: function() {
			this.index++;
			if (this.index == story[this.type].length) {
				if (this.battle) {
					core.pushScene(this.battle);
				} else {
					if (this.type == 7) {
						state_array[5][0] = 1;
					} else if(this.type == 0) {
						state_array[5][1] = 1;
					}
					saveData();
					core.popScene(core.currentScene);
					loopBgm_Ctrl(this.bgm, 'stop');
					core.pushScene(new WorldMap());
				}
			} else {

				this.name.text =  story[this.type][this.index][0];
				this.story1.text =  story[this.type][this.index][1];
				this.story2.text =  story[this.type][this.index][2];

				//イントロ
				if (this.type == 0) {
					if (this.index == 2) {
						this.insertBefore(new BackGround(introNovelImage[1]),this.name,this.story1,this.story2);
					} else if (this.index == 6) {
						this.insertBefore(new BackGround(introNovelImage[2]),this.name,this.story1,this.story2);
					}
				}
			}
		}
	});

//Login
	var WelcomeScene = Class.create(Scene, {
		initialize: function(subject) {
			Scene.call(this);
			loopBgm_Ctrl(TITLE_BGM, 'play');
			this.addChild(new BackGround('/images/Title.png'));
		},
		ontouchstart: function() {
			if (state_array[5][1] == 0) {
				loopBgm_Ctrl(TITLE_BGM, 'stop');
				core.pushScene(new NovelScene(0,null));
			} else {
				loopBgm_Ctrl(TITLE_BGM, 'stop');
				core.pushScene(new WorldMap());
			}
	  	}
	});

//WorldMap
	var WorldMap = Class.create(Scene, {
		initialize: function() {
			var islandOrigin = [[300,10],[10,200],[610,200],[150,420],[450,420],[300,200]];
			data_to_array(user_state);
			Scene.call(this);
			this.addChild(new BackGround(BattleBackGroundImage[5][0]));
			for (var i = 0; i < islandOrigin.length-1; i++) {
				this.addChild(new Island(islandOrigin[i][0], islandOrigin[i][1], i));
			}
			var isClear = true;
			for (var i = 0; i < 5; i++) {
				for (var j = 0; j < 5; j++) {
					if (state_array[i][j] == 0) {
						isClear = false;
					}
				}
			}
			if (isClear) {
				this.addChild(new Island(islandOrigin[5][0], islandOrigin[5][1], 5));
			}
			loopBgm_Ctrl(ISLAND_BGM, 'play');
		}
	});
	var now_subject;
	var Island = Class.create(Sprite, {
		initialize: function(x, y, subject) {
			Sprite.call(this, 200, 200);
			this.x = x;
			this.y = y;
			this.image = core.assets[dungeonImage_200[subject][0]];
			this.subject = subject;
		},
		ontouchstart: function() {
			core.pushScene(new IslandMap(this.subject));
			console.log(state_array);
			now_subject = this.subject;
			loopBgm_Ctrl(ISLAND_BGM, 'stop');
        }
	});

//IslandMap
	var IslandMap = Class.create(Scene, {
		initialize: function(subject) {
			var dungeonOrigin = [[150,110],[460,450],[600,225],[50,370],[300,250]];
			Scene.call(this);
			this.addChild(new BackGround(BattleBackGroundImage[subject][0]));
			this.addChild(new Board(subject));
			this.addChild(new BackArrow());
			loopBgm_Ctrl(DUNGEON_SELECT_BGM, 'play');
			if (subject == 5) {
				this.addChild(new Dungeon(dungeonOrigin[4][0], dungeonOrigin[4][1], subject, 4));
			} else {
				isClear = true;
				for (var i = 0; i < dungeonOrigin.length-1; i++){
	 				this.addChild(new Dungeon(dungeonOrigin[i][0], dungeonOrigin[i][1], subject, i));
	 				if (state_array[subject][i] == 0) {
	 					isClear = false;
	 				}
				}
				if (isClear) {
					var i = dungeonOrigin.length - 1;
					this.addChild(new Dungeon(dungeonOrigin[i][0], dungeonOrigin[i][1], subject, i));
				}
			}
		}
	});
	var now_dungeon;
	var Dungeon = Class.create(Sprite, {
		initialize: function(x, y, subject, number) {
			if (number == 4) {
				Sprite.call(this, 200, 200);
			} else {
				Sprite.call(this, 150, 150);
			}
			this.x = x;
			this.y = y;
			this.subject = subject;
			this.number = number;
			if (state_array[subject][number] == 0) {
				this.image = core.assets[dungeonImage_150[subject][number]];
			} else {
				this.image = core.assets[dungeonImage_150[subject][number]];
			}
		},
		ontouchstart: function() {
			now_dungeon = this.number;
			loopBgm_Ctrl(DUNGEON_SELECT_BGM, 'stop');
			if (this.subject == 5) {
				core.pushScene(new DungeonMap(mapdata6, this.subject, this.number));
			} else if (now_dungeon == 4) {
				core.pushScene(new DungeonMap(mapdata5, this.subject, this.number));
			} else {
				var pattern = this.subject + this.number;
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
		}
	});
	var BackArrow = Class.create(Sprite, {
		initialize: function(state) {
			Sprite.call(this, 180, 70);
			this.image = core.assets['/images/backArrow.png'];
		},
		ontouchstart: function() {
			loopBgm_Ctrl(DUNGEON_SELECT_BGM, 'stop');
			loopBgm_Ctrl(ISLAND_BGM, 'play');
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
	var Enemy_Num;
	var DungeonMap = Class.create(Scene, {
		initialize: function(data, subject, chapter) {
			Scene.call(this);
			mapdata = data;
			dungeon_x = 0;
			dungeon_y = mapdata[0].length - 1;
			Enemy_Num = 3;
			this.subject = subject;
			now_chapter = chapter;
			this.addChild(new BackGround('/images/dungeonMapBg.jpg'));
			for (i = 0; i < 4; i++){
				var d = new Direction(i);
				this.addChild(d);
				direct[i] = d;
			}

			next_map(mapdata,dungeon_x,dungeon_y);
			Presented_Message(this, "目的：敵を全滅せよ", 25);
			this.addChild(new Character());
			var minmap = new minMap(this, mapdata);

			var back = new Sprite(160, 30);
			back.image = core.assets["/images/away.png"];
			this.addChild(back);
			back.on('touchstart', function() {
				loopBgm_Ctrl(DUNGEON_BGM, 'stop');
				loopBgm_Ctrl(DUNGEON_SELECT_BGM, 'play');
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
			loopBgm_Ctrl(DUNGEON_SELECT_BGM, 'play');
		}
	});

	var Direction = Class.create(Sprite, {
		initialize: function(direction) {
			var origin = [[350,50],[650,250],[350,450],[50,250]];
			Sprite.call(this, 120, 120);
			this.x = origin[direction][0];
			this.y = origin[direction][1];
			this.image = core.assets[directionImage[direction]];
			this.direction = direction;
		},
		ontouchstart: function() {
			if (Enemy_Num == 0){
				Presented_Message(core.currentScene, "強力な敵が現れたッ・・・!!", 30);
			}
			switch(this.direction) {
				case 0:
					move_xy(dungeon_x, dungeon_y - 1);
					moveEffect_y('/images/dungeonMapBg.jpg', 1);
					break;
				case 1:
					move_xy(dungeon_x + 1, dungeon_y);
					moveEffect_x('/images/dungeonMapBg.jpg', 1);
					break;
				case 2:
					move_xy(dungeon_x, dungeon_y + 1);
					moveEffect_y('/images/dungeonMapBg.jpg', -1);
					break;
				case 3:
					move_xy(dungeon_x - 1, dungeon_y);
					moveEffect_x('/images/dungeonMapBg.jpg', -1);
					break;
			}
		}
	});
	function next_map(mapdata, now_x, now_y){
		direction = [false,false,false,false];
		console.log(mapdata[now_x][now_y], now_x, now_y);

		if ((now_y != 0) && (mapdata[now_x][now_y - 1] != 0)){
			if (mapdata[now_x][now_y - 1] == 5 && Enemy_Num > 0){
				Presented_Message(core.currentScene, "怪しい気配がする・・・", 25);
				direction[0] = false;
			}
			else {
				direction[0] = true;
			}
		}
		if ((now_x != mapdata.length - 1) && (mapdata[now_x + 1][now_y] != 0)){
			if (mapdata[now_x][now_y - 1] == 5 && Enemy_Num > 0){
				Presented_Message(core.currentScene, "怪しい気配がする・・・", 25);
				direction[1] = false;
			}
			else {
				direction[1] = true;
			}
		}
		if ((now_y != mapdata[0].length - 1) && (mapdata[now_x][now_y + 1] != 0)){
			if (mapdata[now_x][now_y + 1] == 5 && Enemy_Num > 0){
				Presented_Message(core.currentScene, "怪しい気配がする・・・", 25);
				direction[2] = false;
			}
			else {
				direction[2] = true;
			}
		}
		if ((now_x != 0) && (mapdata[now_x - 1][now_y] != 0)){
			if (mapdata[now_x - 1][now_y] == 5 && Enemy_Num > 0){
				Presented_Message(core.currentScene, "怪しい気配がする・・・", 25);
				direction[3] = false;
			}
			else {
				direction[3] = true;
			}
		}
		var FiveFlag = false;
		if (now_x > 0 && now_y > 0){
			if (mapdata[now_x - 1][now_y] == 5){
				FiveFlag = true;
			}
			if (mapdata[now_x][now_y - 1] == 5){
				FiveFlag = true;
			}
		}
		if (now_x < mapdata.length - 1 && now_y < mapdata[0].length - 1){
			if (mapdata[now_x + 1][now_y] == 5){
				FiveFlag = true;
			}
			if (mapdata[now_x][now_y + 1] == 5){
				FiveFlag = true;
			}
		}
		if (!FiveFlag){
			Presented_Message(core.currentScene, "目的：敵を全滅せよ", 25);
		}

		for (i = 0; i < 4; i++){
			direct[i].visible = direction[i];
		}

		var EventFlag = mapdata[now_x][now_y];
		var subject_number = now_subject;
		var chapter_number = now_chapter;

		if (EventFlag >= 2 && EventFlag < 5){
			var difficulty = EventFlag - 2;
            win_flag = false;
 			loopBgm_Ctrl(DUNGEON_BGM, 'pause');
			loopBgm_Ctrl(BATTLE_BGM, 'play');
 			core.pushScene(new BattleScene(EventFlag, subject_number, chapter_number, difficulty, EnemysImage[subject_number][difficulty], BattleBackGroundImage[subject_number][0], BATTLE_BGM, DUNGEON_BGM));
			Enemy_Num -= 1;
		}
		else if (EventFlag == 5){
			win_flag = false;
			loopBgm_Ctrl(DUNGEON_BGM, 'stop');
			loopBgm_Ctrl(BATTLE_BGM, 'play');
			var battleScene = new BattleScene(EventFlag, subject_number, chapter_number, 3, EnemysImage[subject_number][3], BattleBackGroundImage[subject_number][1], BATTLE_BOSS_BGM, DUNGEON_BGM);
			core.pushScene(battleScene);
		}
		else if (EventFlag == 6){
            win_flag = false;
			loopBgm_Ctrl(DUNGEON_BGM, 'stop');
			loopBgm_Ctrl(BATTLE_BOSS_BGM, 'play');
			var battleScene = new BattleScene(EventFlag, subject_number, chapter_number, 4, EnemysImage[subject_number][4], BattleBackGroundImage[subject_number][1], BATTLE_BOSS_BGM, DUNGEON_BGM);
			core.pushScene(new NovelScene(subject_number+1,battleScene,BATTLE_BOSS_BGM));
		}
		else if (EventFlag == 7){
            win_flag = false;
			loopBgm_Ctrl(DUNGEON_BGM, 'stop');
			loopBgm_Ctrl(BATTLE_LAST_BOSS_BGM, 'play');
			var battleScene = new BattleScene(EventFlag, subject_number, chapter_number, 5, LastBossImage, BattleBackGroundImage[subject_number][1], BATTLE_LAST_BOSS_BGM, LAST_DUNGEON_BGM);
			core.pushScene(new NovelScene(subject_number+1,battleScene,BATTLE_LAST_BOSS_BGM));
//			core.pushScene(new DungeonClearScene());
		}
	}

	function move_xy(next_x, next_y){
		core.currentScene.addChild(new MapBlock( 510 + 40 * dungeon_x, 400 + 40 * dungeon_y, MinMapBlockImage[0], false));
		dungeon_x = next_x;
		dungeon_y = next_y;
		core.currentScene.addChild(new MapBlock( 510 + 40 * dungeon_x, 400 + 40 * dungeon_y, MinMapBlockImage[0], false));
		core.currentScene.addChild(new MapBlock( 510 + 40 * dungeon_x, 400 + 40 * dungeon_y, MinMapBlockImage[1], true));
	}
	function Presented_Message(scene, msg, size){
		var msg_box = new Sprite(400, 50);
		msg_box.moveTo(800 / 2 - 150 , 0);
		msg_box.image = core.assets["/images/Message.png"];
		var message = new Label();
		message.text = msg;
		message.font = ""+size+"px 游ゴシック体";
		message.moveTo(800 / 2 - 100, 10);
		addChild_to_scene(scene, msg_box);
		addChild_to_scene(scene, message);
	}
	var Character = Class.create(Sprite, {
		initialize: function(direction) {
			Sprite.call(this, 150, 150);
			this.x = 325;
			this.y = 225;
			this.image = core.assets["/images/PlayerInDungeon.PNG"];
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
				this.image = core.assets["/images/MiniMap.png"];
				this.opacity = 0.5;
				scene.addChild(this);
/*				for (var i = 0; i < mapdata.length; i++){
					for (var j = 0; j < mapdata[0].length; j++){
						if (mapdata[i][j]){
							scene.addChild(new MapBlock( 510 + 40 * i, 400 + 40 * j));
						}
					}
				}
*/
			scene.addChild(new MapBlock( 510 + 40 * dungeon_x, 400 + 40 * dungeon_y, MinMapBlockImage[0], false));
			scene.addChild(new MapBlock(510 + 40 * dungeon_x, 400 + 40 * dungeon_y, MinMapBlockImage[1], true));
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
					next_map(mapdata, dungeon_x, dungeon_y);
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
					next_map(mapdata, dungeon_x, dungeon_y);
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

//Battle
	var text = new Array(
    		"HP : 1",
    		"HP : 2",
    		"HP : 3",
    		"HP : 4",
    		"HP : 5");
	var status = new Label();
	var event_type;
    var clearProblemNum = 0;
    var battlebgm;
    var dungeonbgm;
	var BattleScene = Class.create(Scene, {
		initialize: function(eventFlag, subject, chapter, difficulty, EnemyImagePath, BackGroundImagePath, BattleBGMPath, DungeonBGMPath) {
			Scene.call(this);
			event_type = eventFlag;
			this.addChild(new BackGround(BackGroundImagePath));
			this.addChild(new BackGround(BATTLE4_IMG));
			core.score = 10;
			core.hp = 4;
			battlebgm = BattleBGMPath;
			dungeonbgm = DungeonBGMPath;
			var userHp = "HP : ";
			userHp.font = "16px Tahoma";
        	var hp = core.hp;
        	status.text = text[hp];
            socketio.emit("fetchDB",{
                subject: subject,
                chapter: chapter,
                difficulty: difficulty
            });
            var count = 0;
            socketio.on('returnRecord', function(records){
                count++;
                var problemSize = records.length
                if(problemSize == 0){
                    return;
                }else{
                    if(isKnockDown(clearProblemNum, problemSize)){
                        clearProblemNum = 0;
                        if (event_type >= 2  && event_type <= 4) {
                            win_battle();
                            return;
                        } else if (event_type >= 5) {
                            clear_dungeon(event_type);
                            return;
                        }
                    }else{
                        if(count <= 1 && !(win_flag) ){
                            var isFourChoiceQuestion = records[clearProblemNum].isFourChoiceQuestion;
                            var problemText = records[clearProblemNum].question;
                            var problemAnswer = records[clearProblemNum].answer;
                            var problemSelect = new Array();
                            problemSelect[0] = records[clearProblemNum].choice0;
                            problemSelect[1] = records[clearProblemNum].choice1;
                            problemSelect[2] = records[clearProblemNum].choice2;
                            problemSelect[3] = records[clearProblemNum].choice3;
                            core.currentScene.addChild(new BackGround(BackGroundImagePath));
                            core.currentScene.addChild(new BattleBackGround(isFourChoiceQuestion));
                            core.currentScene.addChild(status);
                            core.currentScene.addChild(new Selection(0,isFourChoiceQuestion,problemAnswer,subject,chapter,difficulty,EnemyImagePath,BackGroundImagePath,problemSelect));
                            core.currentScene.addChild(new Selection(1,isFourChoiceQuestion,problemAnswer,subject,chapter,difficulty,EnemyImagePath,BackGroundImagePath,problemSelect));
                            core.currentScene.addChild(new Selection(2,isFourChoiceQuestion,problemAnswer,subject,chapter,difficulty,EnemyImagePath,BackGroundImagePath,problemSelect));
                            core.currentScene.addChild(new Selection(3,isFourChoiceQuestion,problemAnswer,subject,chapter,difficulty,EnemyImagePath,BackGroundImagePath,problemSelect));
                            core.currentScene.addChild(new Player());
                            core.currentScene.addChild(new Enemy(EnemyImagePath));
                            core.currentScene.addChild(new QuestionBase());
                            core.currentScene.addChild(new Question(problemText));
                        }
                    }
                }
            });
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
			Sprite.call(this, 800, 100);
        		this.x = 0;
        		this.y = 450;
		}
	});
    var Question = Class.create(Sprite, {
		initialize: function(problemText) {
			Sprite.call(this, 800, 100);
            this.x = 0;
            this.y = 450;
            var problemText = new Label(problemText);

            problemText.font = "20px 游ゴシック体";
            problemText.x = 20;
            problemText.y = 470;

            core.currentScene.addChild(problemText);
		}
	});

	var Enemy = Class.create(Sprite, {
		initialize: function(EnemyImagePath) {
			Sprite.call(this, 400, 400);
            this.image = core.assets[EnemyImagePath];
            this.x = 200;
            this.y = 100;
		}
	});
	var Selection = Class.create(Sprite, {
		initialize: function(type,isTwoChoiceQuestion,problemAnswer,subject,chapter,difficulty,EnemyImagePath, BackGroundImagePath,problemSelect) {

            var problemSelect0 = new Label(problemSelect[0]);
            var problemSelect1 = new Label(problemSelect[1]);
            var problemSelect2 = new Label(problemSelect[2]);
            var problemSelect3 = new Label(problemSelect[3]);

            problemSelect0.font = "20px 游ゴシック体";
            problemSelect1.font = "20px 游ゴシック体";
            problemSelect2.font = "20px 游ゴシック体";
            problemSelect3.font = "20px 游ゴシック体";

			var fourChoiceQuestion = [[0,550],[200,550],[400,550],[600,550]];
			var twoChoiceQuestion = [[0,550],[200,550],[400,550],[600,550]];
            var fourChoiceQuestionText = [[10,550],[210,550],[410,550],[610,550]];
            var twoChoiceQuestionText  = [[10,550],[410,550],[800,600],[800,600]];

            this.type = type;
            this.problemAnswer = problemAnswer;
            this.event_type = event_type;
            this.subject = subject;
            this.chapter = chapter;
            this.difficulty = difficulty;
            this.EnemyImagePath = EnemyImagePath;
            this.BackGroundImagePath = BackGroundImagePath;
            if(isTwoChoiceQuestion) {
                Sprite.call(this, 200, 50);
                this.x = twoChoiceQuestion[type][0];
                this.y = twoChoiceQuestion[type][1];
                problemSelect0.x = twoChoiceQuestionText[type][0];
                problemSelect0.y = twoChoiceQuestionText[type][1];
                problemSelect1.x = twoChoiceQuestionText[type][0];
                problemSelect1.y = twoChoiceQuestionText[type][1];
                problemSelect2.x = twoChoiceQuestionText[type][0];
                problemSelect2.y = twoChoiceQuestionText[type][1];
                problemSelect3.x = twoChoiceQuestionText[type][0];
                problemSelect3.y = twoChoiceQuestionText[type][1];
            }
            else {
                Sprite.call(this, 400, 50);
                this.x = fourChoiceQuestion[type][0];
                this.y = fourChoiceQuestion[type][1];
                problemSelect0.x = fourChoiceQuestionText[type][0];
                problemSelect0.y = fourChoiceQuestionText[type][1];
                problemSelect1.x = fourChoiceQuestionText[type][0];
                problemSelect1.y = fourChoiceQuestionText[type][1];
                problemSelect2.x = fourChoiceQuestionText[type][0];
                problemSelect2.y = fourChoiceQuestionText[type][1];
                problemSelect3.x = fourChoiceQuestionText[type][0];
                problemSelect3.y = fourChoiceQuestionText[type][1];

            }
			switch(type) {
			case 0:
                core.currentScene.addChild(problemSelect0);
				break;
			case 1:
                core.currentScene.addChild(problemSelect1);
				break;
			case 2:
                core.currentScene.addChild(problemSelect2);
				break;
			case 3:
                core.currentScene.addChild(problemSelect3);
				break;
			}

		},
		ontouchstart: function() {
			var playerAnswer = this.type;
            var problemAnswer = this.problemAnswer;
			if(isAnswer(playerAnswer,problemAnswer)){
                clearProblemNum++;
                core.assets[SE_OK].play();
                core.popScene(core.currentScene);
                core.pushScene(new BattleScene(this.event_type, this.subject, this.chapter, this.difficulty , this.EnemyImagePath,this.BackGroundImagePath, battlebgm, dungeonbgm));
            } else {
                core.assets[SE_NG].play();
                damageEffect();
            }
		}
	});

	function win_battle () {
		mapdata[dungeon_x][dungeon_y] = 1;
        win_flag = true;
		loopBgm_Ctrl(battlebgm, 'stop');
        loopBgm_Ctrl(dungeonbgm, 'play');
        core.popScene(core.currentScene);
	}
	function clear_dungeon (event_type) {
		state_array[now_subject][now_dungeon] = 1;
        	win_flag = true;
			loopBgm_Ctrl(battlebgm, 'stop');
            core.assets[SE_DEFEATED].play();
        	if (event_type == 7) {
				loopBgm_Ctrl(dungeonbgm, 'play');
        		core.pushScene(new NovelScene(7,null, battlebgm));
        	} else {
			core.pushScene(new DungeonClearScene());
		}
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

    function isKnockDown(clearProblemNum, problemDataSize){
        if(clearProblemNum == problemDataSize){
            return true;
        }else{
            return false;
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

    var BattleBackGround = Class.create(Sprite, {
		initialize: function(isTwoChoiceQuestion) {
			Sprite.call(this, 800, 600);
            if(isTwoChoiceQuestion){
                this.image = core.assets[BATTLE2_IMG];
    			this.x = 0;
    			this.y = 0;
            }else{
                this.image = core.assets[BATTLE4_IMG];
    			this.x = 0;
    			this.y = 0;
            }

		}
	});

	core.fps = 15;
	core.onload = function() {
		var status = $("#status").text();
		user_state = Number(status);
		console.log("user_state:" + user_state);
		data_to_array(user_state);
		core.pushScene(new WelcomeScene());
	};
	core.start();
};
