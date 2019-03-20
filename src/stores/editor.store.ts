import { observable, action, computed } from "mobx";
import { storeMapping } from "../services/input-mapping.service";
import { gazInputs } from "./../assets/static-data/inputs/gaz/index";

export class EditorStore {
  @observable public inputs: any[] = [];
  @observable public sections: any[] = [];

  @computed
  get status() {
    let res = {};
    return res;
  }

  // For each input create the appropriate store and pus it in this.inputs
  constructor(options: any) {
    options.inputs.forEach((input: any) => {
      const Store = storeMapping[input.type];
      this.inputs.push(new Store(input));
    });
    options.sections.forEach((section: any) => {
      this.sections.push(section);
    });
  }
}

export const editorStore = new EditorStore(gazInputs);
export default EditorStore;
