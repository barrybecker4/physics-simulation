import { scenes } from '../phaser/scenes.js';


export default class SimulationSelector {

  constructor(onChange) {
    const select = this.initSelector("simulationSelector", scenes.map(scene => scene.getName()));
    select.onchange = onChange;
  }


  initSelector(selectId, names) {
    const select = document.getElementById(selectId);

    names.forEach( (name, i) => {
      var option = document.createElement("option");
      option.text = name;
      option.value = name;
      if (i == 0) {
        option.selected = true;
      }
      select.add(option);
    })
    return select;
  }

}