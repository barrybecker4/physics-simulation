/**
 * Handles mouse button clicks.
 * @author Barry Becker
 */
export default class MouseButtonInteractor {

    /**
     * @param owner the owning sprite for which we will handle mouse interaction.
     */
    constructor(owner) {
        this.owner = owner;
        this._buttonPressHandler = null;
        this._buttonReleaseHandler = null

        owner.scene.addEventListener(MouseEvent.MOUSE_DOWN, this.buttonPress, false, 0, true);
        owner.scene.addEventListener(MouseEvent.MOUSE_UP, this.buttonRelease, false, 0, true);
    }

    removeHandlers() {
        this.owner.scene.removeEventListener(MouseEvent.MOUSE_DOWN, this.buttonPress);
        this.owner.scene.removeEventListener(MouseEvent.MOUSE_UP, this.buttonRelease);
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