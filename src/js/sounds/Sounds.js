export default class Sounds {

    constructor(scene) {
        scene.load.audio("hit", ['src/assets/sounds/collision/hithard.mp3']);
        scene.load.audio("scrape", ['src/assets/sounds/collision/scrapew.mp3']);
        this.scene = scene;
    }

    // Sound is added each time so it can use a different channel each time
    playHit(volume = 1.0) {
        const hit = this.scene.sound.add("hit", {loop: false, volume: 0.5});
        if (!isNaN(volume))
          hit.play({ volume })
    }

    playScrape(volume = 1.0) {
        const scrape = this.scene.sound.add("scrape", {loop: false, volume: 0.6});
        scrape.play({ volume });
    }

}
