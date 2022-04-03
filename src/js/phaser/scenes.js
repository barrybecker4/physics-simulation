import SimulationScene from "./SimulationScene.js";
import BridgeSimulation from "../physics/simulations/BridgeSimulation.js"
import FallingBoxesSimulation from "../physics/simulations/FallingBoxesSimulation.js"
import AirHockeySimulation from "../physics/simulations/air-hockey/AirHockeySimulation.js"


export const scenes = [
  new SimulationScene(new FallingBoxesSimulation()),
  new SimulationScene(new BridgeSimulation()),
  new SimulationScene(new AirHockeySimulation()),
];

