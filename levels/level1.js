
const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss()
    ],

    [
        new Clouds(),
        new Clouds(),
        new Clouds(),
        new Clouds(),
        new Clouds(),
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

        new BackgroundObject('img/5_background/layers/air.png', 719*2, 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*2, 80),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*2, 80),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*2, 80),

        new BackgroundObject('img/5_background/layers/air.png', 719*3, 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*3, 80),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*3, 80),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*3, 80),

        new BackgroundObject('img/5_background/layers/air.png', 719*4, 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*4, 80),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*4, 80),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*4, 80),
        ],

        [
            new Coins(400, 300),
            new Coins(450, 300),
            new Coins(500, 300),
            new Coins(550, 300),
            new Coins(600, 300),

            new Coins(1000, 300),
            new Coins(1050, 250),
            new Coins(1100, 200),
            new Coins(1180, 200),
            new Coins(1230, 250),
            new Coins(1280, 300),
        ],
);