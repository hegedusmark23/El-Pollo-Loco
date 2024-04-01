
class Level {
    backgrounds;
    enemies;
    clouds;
    level_end_x = 720*4;
    coins;
    bottles;

    constructor(enemies, clouds, backgrounds, coins, bottles){

        this.enemies = enemies;
        this.clouds = clouds;
        this.backgrounds = backgrounds;
        this.coins = coins;
        this.bottles = bottles;
    }
}