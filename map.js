enchant();
var maxWidth = 800; //画面サイズ（幅）
var maxHeight = 600; //画面サイズ（高さ）
var image = [];
var user = null;

window.onload = function(){
	var core = new Core(maxWidth, maxHeight);
	core.fps = 16;
	image.push("../image/chara.png");
	image.push("../image/arrow_top.png");
	image.push("../image/arrow_left.png");
	image.push("../image/arrow_right.png");
	image.push("../image/arrow_bottom.png");
	image.push("../image/arrow_1.png");
	image.push("../image/arrow_2.png");
	image.push("../image/arrow_3.png");
	image.push("../image/arrow_4.png");
	image.push("../image/minmap1.png");
	core.preload(image);
	core.onload = function(){
		var mapMove = new Scene();
		var direct = new Array();

		var evcontroller = new Event_Controller();

//		var mapdata = [[0,1,1], [1, 1, 1], [1, 1, 0],[0, 1, 2]];
//5×7
		var mapdata = [[1,1,1], [1, 0, 1], [1, 0, 1],[2, 0, 2]];
		var x = 0;
		var y = mapdata[0].length - 1;
		var Bgimage = new Sprite(maxWidth, maxHeight);
		var now_position = 1;

		addChild_to_scene(mapMove, Bgimage);
		for (i = 0; i < 4; i++){
			direct[i] = new Sprite(100, 100);
			direct[i].visible = true;
//			direct[i].addEventListener(EVENT.onClick, clickEvent);
			addChild_to_scene(mapMove, direct[i]);
		}
		next_map(mapdata,x,y);
		first_message(mapMove, "目的：敵を全滅せよ");
		direct[0].ontouchstart = function (){
			var e = new enchant.Event("moveUp");
			this.dispatchEvent(e);
		};

		direct[0].onmoveUp = function (){
			move_xy(x, y-1);
			next_map(mapdata, x, y);
		};

		direct[1].ontouchstart = function (){
			var e = new enchant.Event("moveRight");
			this.dispatchEvent(e);
		};

		direct[1].onmoveRight = function (){
			move_xy(x + 1, y);
			next_map(mapdata, x, y);
		};

		direct[2].ontouchstart = function (){
			var e = new enchant.Event("moveDown");
			this.dispatchEvent(e);
		};
		direct[2].onmoveDown = function (){
			move_xy(x, y + 1);
			next_map(mapdata, x, y);
		};

		direct[3].ontouchstart = function (){
			var e = new enchant.Event("moveLeft");
			this.dispatchEvent(e);
		};
		direct[3].onmoveLeft = function (){
			move_xy(x - 1, y);
			next_map(mapdata, x, y);
		};

		function next_map(mapdata, now_x, now_y, EventFlag){
			direction = new Array();
			console.log(mapdata[now_x][now_y], now_x, now_y);
			for (i = 0; i < 4; i++){
				direction[i] = 0;
			}
			if (now_x == 0){
				direction[3] = 0;
			}
			else if (mapdata[now_x - 1][now_y] != 0){
				direction[3] = 1;
			}

			if (now_y == 0){
				direction[0] = 0;
			}
			else if (mapdata[now_x][now_y - 1] != 0){
				direction[0] = 1;
			}

			if (now_x == mapdata.length - 1){
				direction[1] = 0;
			}
			else if (mapdata[now_x + 1][now_y] != 0){
				direction[1] = 1;
			}

			if (now_y == mapdata[0].length - 1){
				direction[2] = 0;
			}																		
			else if (mapdata[now_x][now_y + 1] != 0){
				direction[2] = 1;
			}
			for (i = 0;i < 4; i++){
				if (direction[i]){
					direct[i].visible = true;
				}
				else {
					direct[i].visible = false;
				}
			}
			EventFlag = mapdata[now_x][now_y];
			if (EventFlag == 3){
				battleScene();
			}
			if (EventFlag == 4){
				ClearScene();
			}
		}
		function move_xy(next_x, next_y){
			x = next_x;
			y = next_y;
		}

/*		var top = new Sprite(100,100);
		var left = new Sprite(100,100);
		var right = new Sprite(100,100);		
		var bottom = new Sprite(100,100);
*/
		var character = new Sprite(150,150);
		

		Sprite_info(direct[0], 350, 50, "../image/arrow_top.png");
		Sprite_info(direct[3], 50, 250, "../image/arrow_left.png");
		Sprite_info(direct[1], 650, 250, "../image/arrow_right.png");
		Sprite_info(direct[2], 350, 450, "../image/arrow_bottom.png");
		Sprite_info(character, 325, 225, "../image/chara.png");

/*		addChild_to_scene(mapMove, top);
		addChild_to_scene(mapMove, left);
		addChild_to_scene(mapMove, right);
		addChild_to_scene(mapMove, bottom);
*/
		addChild_to_scene(mapMove, character);

		/* Spriteの場所を設定する関数 */
		function Sprite_info(sprite, x, y, img){
			sprite.moveTo(x, y);
			sprite.image = core.assets[img.toString()];
		}


		function addChild_to_scene(scene, sprite){
			scene.addChild(sprite);
		}

		var minMap = enchant.Class.create(Sprite, {
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
				this.img = core.assets["../image/minmap1.png"];
				this.opacity = 0.5;
				scene.addChild(this);
//				this.addEventListener(EVENT.ENTER_FRAME, onClickEvent);
			},
			
			toMoving: function(){
				for (i=0;i<4;i++){
					if(direction[i]){
						
					}
				}
			}
		});

		function first_message(scene, msg){
			var msg_box = new Sprite(400, 50);
			msg_box.moveTo(maxWidth / 2 - 200, 25);
			msg_box.backgroundColor = "rgba(200,200,200,0.4)";
			var message = new Label();
			message.text = msg;
			message.moveTo(maxWidth / 2 - 150, 40);
			addChild_to_scene(scene, msg_box);
			addChild_to_scene(scene, message);

/*			msg_box.tl.fadeOut(40, enchant.Easing.EASEINOUT);
			message.tl.fadeOut(40, enchant.Easing.EASEINOUT);
            scene.addEventListener(enchant.Event.ENTER_FRAME, function() {
                var time = 4.5 - parseInt(core.frame / core.fps) + "";
                if (time <= 0) {
                    scene.removeChild(msg_box);
                    scene.removeChild(message);
                    //scene.removeEventListner(enchant.Event.ENTER_FRAME);
                }
                
            });    
*/
		}

		var minmap = new minMap(mapMove, "../image/minmap1.png");

		function Event_Controller(trueFlag){
			if (trueFlag == true){
				battleScene();
			}
		}
		core.pushScene(mapMove);
	}
	core.start();
}
