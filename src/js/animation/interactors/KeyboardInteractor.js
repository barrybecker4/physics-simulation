//import Box2D.Collision.*;
//import Box2D.Collision.Shapes.*;
//import Box2D.Common.Math.*;
//import Box2D.Dynamics.*;
//import flash.display.Sprite;
//import flash.events.KeyboardEvent;
//import General.Input;

/**
 * Handles the keyboard actions.
 *
 * @author Barry Becker
 */
class KeyboardInteractor {

    /**
     * @param owner the owning sprite for which we will handle keyboard interation.
     */
    constructor(owner) {
      this.owner = owner;
      owner.stage.addEventListener(KeyboardEvent.KEY_DOWN, keyPress, false, 0, true);
      owner.stage.addEventListener(KeyboardEvent.KEY_UP, keyRelease, false, 0, true);
      this._keyPressHandler = null;
      this._keyReleaseHandler = null;
    }

    removeHandlers() {
        this.owner.stage.removeEventListener(KeyboardEvent.KEY_DOWN, this.keyPress);
        this.owner.stage.removeEventListener(KeyboardEvent.KEY_UP, this.keyRelease);
    }

    /** must have the form of handler(keyCode:uint)  */
    set keyPressHandler(handler) {
        this._keyPressHandler = handler;
    }

    /** must have the form of handler(keyCode:uint)  */
    set keyReleaseHandler(handler) {
        this._keyReleaseHandler = handler;
    }

    keyPress(event) {
        if (this._keyPressHandler != null) {
            this._keyPressHandler(event.keyCode);
        }
    }

    keyRelease(event) {
        if (this._keyReleaseHandler != null) {
            this._keyReleaseHandler(event.keyCode);
        }
    }
}
