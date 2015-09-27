enchant();

//TODO: 拡張性に乏しい 取り敢えず配列で持たせておくのがベターらしい
var text = new Array(
    "HP : 1",
    "HP : 2",
    "HP : 3",
    "HP : 4",
    "HP : 5");

var BATTLE_BGM = './bgm/BATTLE_cyrf_energy.mp3';
var PLAYER_IMG = './img/player.png';

/** エフェクトの位置のバラ付き具合 */
var EFFECT_RANGE = 64;
/** 一回のタップで発生するエフェクトの数 */
var EFFECT_NUM = 5;
        
window.onload = function () {
    var game = new Game(800, 600);
    game.fps = 30;
    game.preload([BATTLE_BGM,PLAYER_IMG]); 

    var gameOverScene = new Scene();
    var Easing = enchant.Easing;
    
    //Function:csvファイルをArray[][] の形に変換して出力
    //TODO:戦闘の度に逐一csvファイルを読み込んでいたら重いかもしれない．
    //ベストプラクティスがあるかも
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

    //Function:解答のチェック
    function isAnswer(playerAnswer,loadAnswer,hp,status) {
        var isAnswer = false;
        if (playerAnswer == loadAnswer) {
            isAnswer = true;
            return isAnswer;
        }
        else{
            hp--;
            if(hp < 0){
                gameOver();
            }else{
                status.text = text[hp];
            }
            return isAnswer;
        }
    }
    
    //Function:hpが0になったらゲームオーバーシーンに遷移
    function gameOver() {
        var label = new Label();
        label.x = 250;
        label.y = 200;
        label.color = 'red';
        label.font = '48px "Arial"';
        
        var msg = 'Game Over !!! <br/>';
        label.text = msg;
        
        gameOverScene.backgroundColor = 'black';
        gameOverScene.addChild(label);
        game.pushScene(gameOverScene);
        game.stop();
    }
    
    /** 単体エフェクト作成 */
    function makeSingleEffect(delay) {
        var easing = Easing.SIN_EASEOUT; // イージングの種類.
        var sprite = new Sprite(100, 100);
        sprite.scaleX = 0.0;
        sprite.scaleY = 0.0;
        sprite.visible = false; // 最初は非表示.
        // エフェクトの動作設定.
        sprite.tl
            .delay(delay) // 指定時間待つ.
            .then(function() { sprite.visible = true; }) // ここで表示.
            .scaleTo(1.0, game.fps * 0.1, easing)
            .scaleTo(0.5, game.fps * 0.1, easing)
            .scaleTo(2.0, game.fps * 1, easing)
            .and().fadeOut(game.fps * 1, easing)
            .then(function() { sprite.tl.removeFromScene(); });
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
    function addEffect(scene, x, y) {
        for (var i = 0, iNum = EFFECT_NUM; i < iNum; ++i) {
            var sprite = makeSingleEffect(i * game.fps * 0.1);
            sprite.backgroundColor = makeRandomColor();
            sprite.x = x - (sprite.width / 2) + Math.random() * EFFECT_RANGE - (EFFECT_RANGE / 2);
            sprite.y = y - (sprite.height / 2) + Math.random() * EFFECT_RANGE - (EFFECT_RANGE / 2);
            scene.addChild(sprite);
        }
    }
    
    function attackEffect(scene){
        addEffect(scene, 400, 300);
    }
    function damageEffect(scene){
        addEffect(scene, 400, 300);
    }
    
    game.onload = function () {
        var scene = new Scene();
        var backGround = new Sprite(800,600);
        game.rootScene.addChild(backGround);        
        
        var battleSound = game.assets[BATTLE_BGM].play();
        
        var userHp = "HP : ";
        var hp = 4;
        userHp.font = "16px Tahoma";

        var status = new Label();
        status.text = text[hp];
        scene.addChild(status);
        
        var player = new Player();
        var enemy = new Enemy();
        var question = new Question();
        var selectA = new Select("A");
        var selectB = new Select("B");
        var selectC = new Select("C");
        var selectD = new Select("D");
        
        
        scene.addChild(player);
        scene.addChild(enemy);
        scene.addChild(question);
        scene.addChild(selectA);
        scene.addChild(selectB);
        scene.addChild(selectC);
        scene.addChild(selectD);
        game.pushScene(scene);
        
        //TODO: loadAnswerははじめにCSVファイルで読み込む．
        var loadAnswer = "A";
        selectA.addEventListener('touchstart', function() {
            var playerAnswer = "A";
            if(isAnswer(playerAnswer,loadAnswer,hp,status)){
                attackEffect(scene);
            }else{
                hp--;
                damageEffect(scene);
            }
        });
        
        selectB.addEventListener('touchstart', function() {
            var playerAnswer = "B";
            if(isAnswer(playerAnswer,loadAnswer,hp,status)){
                attackEffect(scene);
            }else{
                hp--;
                damageEffect(scene);
            }
        });
        selectC.addEventListener('touchstart', function() {
            var playerAnswer = "C";
            if(isAnswer(playerAnswer,loadAnswer,hp,status)){
                attackEffect(scene);
            }else{
                hp--;
                damageEffect(scene);
            }
        });
        selectD.addEventListener('touchstart', function() {
            var playerAnswer = "D";
            if(isAnswer(playerAnswer,loadAnswer,hp,status)){
                attackEffect(scene);
            }else{
                hp--;
                damageEffect(scene);
            }
        });
    };
    
    game.start();

    /* Class */
    var Player = Class.create(Sprite,{
        initialize:function(){
            Sprite.call(this,100,100);
            this.image = game.assets[PLAYER_IMG];
            this.x = 0;
            this.y = 0;
            game.rootScene.addChild(this);
        }
    });

    var Enemy = Class.create(Sprite,{
        initialize:function(){
            Sprite.call(this,800,400);
            this.backgroundColor = "rgba(200, 200, 200, 0.5)";
            this.x = 0;
            this.y = 100;
            game.rootScene.addChild(this);
        }
    });
    
    var Question = Class.create(Sprite, { 
        initialize:function(){
            Sprite.call(this,700,100);
            this.image = game.assets[PLAYER_IMG];
            this.backgroundColor = "rgba(200, 255, 200, 0.5)";
            this.x = 100;
            this.y = 0;
            game.rootScene.addChild(this);
        }
    });
        
    var Select = Class.create(Sprite, { 
        initialize:function(arg){
            if(arg == "A"){
                Sprite.call(this,200,100);
                this.image = game.assets[PLAYER_IMG];
                this.backgroundColor = "rgba(150, 150, 150, 0.5)";
                this.x = 0;
                this.y = 500;
            }
            else if(arg == "B"){
                Sprite.call(this,200,100);
                this.image = game.assets[PLAYER_IMG];
                this.backgroundColor = "rgba(100, 100, 100, 0.5)";
                this.x = 200;
                this.y = 500;
            }
            else if(arg == "C"){
                Sprite.call(this,200,100);
                this.image = game.assets[PLAYER_IMG];
                this.backgroundColor = "rgba(50, 50, 50, 0.5)";
                this.x = 400;
                this.y = 500;
            }
            else if(arg == "D"){
                Sprite.call(this,200,100);
                this.image = game.assets[PLAYER_IMG];
                this.x = 600;
                this.y = 500;
            }
            game.rootScene.addChild(this);
        }
    });
}
