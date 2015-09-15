enchant();

var text = new Array(
    "HP : 1",
    "HP : 2",
    "HP : 3",
    "HP : 4",
    "HP : 5");

window.onload = function () {
    var game = new Game(800, 600);
    game.fps = 30;
    game.preload('./img/dq.jpg'); 

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
    function isAnswer(playerAnswer,loadAnswer) {
        var isAnswer = False;
        if (playerAnswer == loadAnswer) {
            isAnswer = True;
            return isAnswer;
        }
        return isAnswer;
    }
    
    game.onload = function () {
        var scene = new Scene();
        var backGround = new Sprite(800,600);
        game.rootScene.addChild(backGround);        
        game.score = 10;
        var userHp = "HP : ";
        var hp = 4;
        userHp.font = "16px Tahoma";

        var status = new Label();
        status.text = text[hp];
        scene.addChild(status);
        
        var player = new Sprite(176,176);
        player.image = game.assets['./img/dq.jpg'];
        player.scaleX = 0.5;
        player.scaleY = 0.5;
        player.x = -50;
        player.y = -30;
        
        var question = new Sprite(500, 100);
        question.backgroundColor = "rgba(200, 255, 200, 0.5)";
        question.x = 100;
        question.y = 0;
        
        var enemy = new Sprite(800,400)
        enemy.backgroundColor = "rgba(200, 200, 200, 0.5)";
        enemy.y = 100;

        var selectA = new Sprite(200,100)
        selectA.backgroundColor = "rgba(150, 150, 150, 0.5)";
        selectA.x = 0;
        selectA.y = 500;

        var selectB = new Sprite(200,100)
        selectB.backgroundColor = "rgba(100, 100, 100, 0.5)";
        selectB.x = 200;
        selectB.y = 500;

        var selectC = new Sprite(200,100)
        selectC.backgroundColor = "rgba(50, 50, 50, 0.5)";
        selectC.x = 400;
        selectC.y = 500;

        var selectD = new Sprite(200,100)
        selectD.x = 600;
        selectD.y = 500;
        
        
        scene.addChild(player);
        scene.addChild(enemy);
        scene.addChild(question);
        scene.addChild(selectA);
        scene.addChild(selectB);
        scene.addChild(selectC);
        scene.addChild(selectD);
        game.pushScene(scene);
        question.addEventListener('touchstart', function() {
            hp--;
            status.text = text[hp];
        });
        
    };
    
    game.start();
}
