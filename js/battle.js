enchant();
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
    
    game.onload =
        function () {
            var scene = new Scene();
            var userHp = "HP : "
            userHp.font = "16px Tahoma";
            var hp = 0;
            
            game.score = 10;
            
            var label = new Label(userHp);
            scene.addChild(label)
            game.pushScene(scene);
            
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
            
            var surface = new Surface(500, 100);
            question.image = surface;
            
            question.addEventListener('touchstart', function() {
                question.x += 1;
            });
            
            context = surface.context;
            context.beginPath();
            context.stroke();
            
            game.rootScene.addChild(player);
            game.rootScene.addChild(question);
        
        };

    game.start();
}
