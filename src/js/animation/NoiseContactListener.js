//import Box2D.Collision.*;
//import Box2D.Collision.Shapes.*;
//import Box2D.Common.Math.*;
//import Box2D.Dynamics.*;
//import Box2D.Dynamics.Contacts.b2Contact;
//import Box2D.Dynamics.Contacts.b2ContactResult;
//import com.becker.common.Sounds;

class NoiseContactListener extends b2ContactListener {

    /**
     * Called when a contact point is added.
     */
    BeginContact(point) {
        const volume = 0.1 + Math.random() / 50.0;
        if (volume > 0) {
            //Sounds.playScrape(volume);
            Sounds.playHit(volume);
        }
    }

    /**
     * Called after the contact has been solved. This includes the geometry
     * and the forces.
     *
     override public function PostSolve(point:b2Contact, impulse:b2ContactImpulse):void {

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

