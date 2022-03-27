import physicsUtils from "../simulations/physicsUtils.js";


export default class NoiseContactListener  {

    constructor(sounds) {
        this.sounds = sounds;
    }

    /**
     * Called when a contact point is added.
     */
    onBeginContact(contact) {
        if (this.sounds) {
            const impact = physicsUtils.calculateImpact(contact);
            const volume = 0.01 * impact;
            this.sounds.playHit(volume);
        }
    }

    /**
     * Called after the contact has been solved. This includes the geometry
     * and the forces.
     *
     override public function onPostSolve(point:b2Contact, impulse:b2ContactImpulse):void {

        var sum:Number = 0;
        for each (var imp:Number in impulse.normalImpulses) {
            sum += imp;
        }

        var volume:Number = sum/60.0;
        if (volume > 0.01) {
            Sounds.playHit(volume);
        }
    };  */
}

