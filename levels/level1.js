
let level1;

function initLevel() {


level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chick(),
        new Chick(),
        new Endboss()
    ],

    [
        new Clouds(0),
        new Clouds(720),
        new Clouds(720 * 2),
        new Clouds(720 * 3),
        new Clouds(720 * 4),
    ],

    [
        new BackgroundObject('img/5_background/layers/air.png', -719, 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719, 80),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719, 80),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719, 80),

        new BackgroundObject('img/5_background/layers/air.png', 0, 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0, 80),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0, 80),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0, 80),

        new BackgroundObject('img/5_background/layers/air.png', 719, 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719, 80),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719, 80),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719, 80),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 2, 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2, 80),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2, 80),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2, 80),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 3, 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3, 80),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3, 80),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3, 80),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 4, 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 4, 80),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 4, 80),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 4, 80),
    ],

    [
        new Coins(400, 300),
        new Coins(800, 150),
        new Coins(1200, 200),
        new Coins(2000, 150),
        new Coins(2100, 300)
    ],

    [
        new Bottles(300, 350),
        new Bottles(700, 350),
        new Bottles(800, 350),
        new Bottles(1400, 350),
        new Bottles(1600, 350),
        new Bottles(2000, 350),
        new Bottles(2200, 350),
        new Bottles(2800, 350),
    ]
);
}