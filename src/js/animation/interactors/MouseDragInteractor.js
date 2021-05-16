//import Box2D.Collision.*;
//import Box2D.Collision.Shapes.*;
//import Box2D.Common.Math.*;
//import Box2D.Dynamics.*;
//import flash.display.Sprite;
//import flash.events.MouseEvent;


/**
 * Handles mouse button clicks.
 *
 * @author Barry Becker
 */
class MouseButtonInteractor {

    /**
     * @param owner the owning sprite for which we will handle mouse interaction.
     */
    constructor(owner) {
        this.owner = owner;
        this._buttonPressHandler = null;
        this._buttonReleaseHandler = null

        owner.stage.addEventListener(MouseEvent.MOUSE_DOWN, this.buttonPress, false, 0, true);
        owner.stage.addEventListener(MouseEvent.MOUSE_UP, this.buttonRelease, false, 0, true);
    }

    removeHandlers() {
        this.owner.stage.removeEventListener(MouseEvent.MOUSE_DOWN, this.buttonPress);
        this.owner.stage.removeEventListener(MouseEvent.MOUSE_UP, this.buttonRelease);
    }

    /** must have the form of handler()  */
    set buttonPressHandler(handler) {
        this._buttonPressHandler = handler;
    }

    /** must have the form of handler()  */
    set buttonReleaseHandler(handler) {
        this._buttonReleaseHandler = handler;
    }

    buttonPress(event) {
        if (this._buttonPressHandler != null) {
            this._buttonPressHandler();
        }
    }

    buttonRelease(event) {
        if (this._buttonReleaseHandler != null) {
            this._buttonReleaseHandler();
        }
    }
}