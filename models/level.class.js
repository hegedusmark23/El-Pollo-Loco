
/**
 * Class representing a game level.
 */
class Level {
    /**
     * Array containing background objects.
     */
    backgrounds;

    /**
     * Array containing enemy objects.
     */
    enemies;

    /**
     * End boss object.
     */
    endboss;

    /**
     * Array containing cloud objects.
     */
    clouds;

    /**
     * x-coordinate of the end of the level.
     */
    level_end_x = 720 * 4;

    /**
     * Array containing coin objects.
     */
    coins;

    /**
     * Array containing bottle objects.
     */
    bottles;

    /**
     * Creates a new level with the specified elements.
     * @param {Array} enemies Array of enemy objects.
     * @param {object} endboss End boss object.
     * @param {Array} clouds Array of cloud objects.
     * @param {Array} backgrounds Array of background objects.
     * @param {Array} coins Array of coin objects.
     * @param {Array} bottles Array of bottle objects.
     */
    constructor(enemies, endboss, clouds, backgrounds, coins, bottles){
        this.enemies = enemies;
        this.endboss = endboss;
        this.clouds = clouds;
        this.backgrounds = backgrounds;
        this.coins = coins;
        this.bottles = bottles;
    }
}