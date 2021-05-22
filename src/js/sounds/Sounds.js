
export default class Sounds {

    constructor(scene) {
        const hitSound = scene.load.audio("hit", ['src/assets/sounds/collision/hithard.mp3']);
        const scrapeSound = scene.load.audio("scrape", ['src/assets/sounds/collision/scrapew.mp3']);
        this.scene = scene;
        this.initalized = false;
    }

    initialize() {
        this.hit = this.scene.sound.add("hit", {loop: false, volume: 0.5});
        this.scrape = this.scene.sound.add("scrape", {loop: false, volume: 0.6});
        this.initalized = true;
    }

    playHit(volume = 1.0) {
        if (!this.initalized) this.initialize();
        this.hit.play({ volume })
    }

    playScrape(volume = 1.0) {
        if (!this.initalized) this.initialize();
        this.scrape.play({ volume });
    }

}
