
class Level {
    backgrounds;
    enemies;
    clouds;
    level_end_x = 720*4;
    coins;

    constructor(enemies, clouds, backgrounds, coins){

        this.enemies = enemies;
        this.clouds = clouds;
        this.backgrounds = backgrounds;
        this.coins = coins;
    }
}