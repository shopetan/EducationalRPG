enchant();
window.onload = function () {
    var game = new Game(800, 600);
    game.onload = function () {
        var scene = new Scene();
        var label = new Label("test");
        scene.addChild(label)
        game.pushScene(scene);
    };
    game.start();
}
