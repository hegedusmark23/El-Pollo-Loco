
class Level {
    backgrounds;
    enemies;
    endboss;
    clouds;
    level_end_x = 720*4;
    coins;
    bottles;

    constructor(enemies, endboss, clouds, backgrounds, coins, bottles){

        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgrounds = backgrounds;
        this.coins = coins;
        this.bottles = bottles;
    }
}