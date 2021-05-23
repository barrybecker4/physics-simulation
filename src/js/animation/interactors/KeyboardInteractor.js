/**
 * Handles the keyboard actions.
 * @author Barry Becker
 */
export default class KeyboardInteractor {

    /**
     * @param owner the owning sprite for which we will handle keyboard interation.
     */
    constructor(owner) {
      this.owner = owner;
      owner.scene.addEventListener(KeyboardEvent.KEY_DOWN, this.keyPress, false, 0, true);
      owner.scene.addEventListener(KeyboardEvent.KEY_UP, this.keyRelease, false, 0, true);
      this._keyPressHandler = null;
      this._keyReleaseHandler = null;
    }

    removeHandlers() {
        this.owner.scene.removeEventListener(KeyboardEvent.KEY_DOWN, this.keyPress);
        this.owner.scene.removeEventListener(KeyboardEvent.KEY_UP, this.keyRelease);
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
