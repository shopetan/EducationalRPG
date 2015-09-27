define( function() {

	enchant();

	var core = new Core(800, 600);
	core.preload('img/worldMapBg.jpg','img/island_e.png','img/island_j.png','img/island_m.png','img/island_sc.png','img/island_so.png','img/Japanese.png','img/dungeon.png','img/dungeonMap.jpg','img/board_e.png','img/board_j.png','img/board_m.png','img/board_sc.png','img/board_so.png','img/arrow.png','img/complete.png','img/gray.png','img/backArrow.png');


	return {
		core: core
	};
});