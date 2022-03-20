export default class PhysicsControls {

  constructor(physicsOptions) {
    this.physicsOptions = physicsOptions;
    this.initialize();
  }

  initialize() {
    this.initNumberInput("gravity", this.physicsOptions.gravity);
    this.initNumberInput("friction", this.physicsOptions.friction);
    this.initNumberInput("density", this.physicsOptions.density);
    this.initNumberInput("restitution", this.physicsOptions.restitution);
  }

  initNumberInput(name, defaultValue) {
    const input = document.getElementById(name + "Input");
    input.value = defaultValue;
    input.oninput = (input) => this.physicsOptions[name] = +input.target.value;
  }

}