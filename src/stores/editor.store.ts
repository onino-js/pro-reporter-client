import uuid from "uuid/v1";
import { observable, action, computed } from "mobx";
import { storeMapping } from "../services/input-mapping.service";
import { gazInputs } from "./../assets/static-data/inputs/gaz/index";

const ZOOM_STEP: number = 5;

export class EditorStore {
  @observable public inputs: any[] = [];
  @observable public id: string = "";
  @observable public sections: any[] = [];
  @observable public template: string = "";
  @observable public creationDate: Date = new Date();
  @observable public lastModifiedDate: Date = new Date();

  @computed
  get status() {
    let res = {};
    return res;
  }

  constructor({ template, id, inputs, sections }: any) {
    this.template = template;
    this.id = id;
    inputs.forEach((input: any) => this.createInput(input));
    this.createSections(sections);
  }

  @action.bound
  public initialize() {
    this.mountTemplate("canvas-container");
    //this.buildInputAndSections();
  }

  @action.bound
  public setLastModifiedDate() {
    this.lastModifiedDate = new Date();
  }

  @action.bound
  public reset() {
    this.inputs.forEach(input => input.reset());
    this.renderCanvas();
  }

  @action.bound
  public setTemplate(payload: string) {
    this.template = payload;
  }

  @action.bound
  public mountTemplate(id: string) {
    document.getElementById(id)!.innerHTML = this.template;
  }

  @action.bound
  public createInput(input: any) {
    const Store = storeMapping[input.type];
    this.inputs.push(new Store(input));
  }

  @action.bound
  public createSections(sections: any) {
    sections.forEach((section: any) => {
      this.sections.push(section);
    });
  }

  @action.bound
  public renderInput({
    id,
    type,
    value,
  }: {
    id: string;
    type: string;
    value: any;
  }) {
    let el: any;
    if (type === "string") {
      // @ts-ignore
      el = document.getElementById(id).getElementsByTagName("tspan")[0];
      el && (el.textContent = value);
    }
    if (type === "single-select") {
      const textElems = document
        .getElementById(id)!
        .getElementsByTagName("text");
      for (let i = 0; i < textElems.length; i++) {
        //@ts-ignore
        if (textElems[i].dataset.value === value) {
          textElems[i].getElementsByTagName("tspan")[0].textContent = "X";
        } else {
          textElems[i].getElementsByTagName("tspan")[0].textContent = "";
        }
      }
    }
    if (
      type === "single-image" ||
      type === "single-image-editable" ||
      type === "single-signature"
    ) {
      el = document.getElementById(id);
      //@ts-ignore
      el && el.setAttribute("xlink:href", value);
    }
    if (type === "compare-two-images") {
      const el = document.getElementById(id);
      const elBefore = el!.getElementsByClassName("before")[0];
      const elAfter = el!.getElementsByClassName("after")[0];
      //@ts-ignore
      elBefore.setAttribute("xlink:href", value.before);
      //@ts-ignore
      elAfter.setAttribute("xlink:href", value.after);
    }
  }

  @action.bound
  public renderCanvas() {
    // Do not render if the svg is not rendered in document
    const el = document.getElementById("canvas-container");
    if (!el) return;
    const svgEls = el.getElementsByTagName("svg");
    if (svgEls.length === 1) {
      this.inputs.forEach((input, index) => {
        this.renderInput({
          id: input.id,
          type: input.type,
          value: input.value,
        });
      });
    }
  }

  // TEMPLATE EDITION

  @action.bound
  public showInputs() {
    const elems = document.getElementsByClassName("pro-container");
    for (let i = 0; i < elems.length; i++) {
      const el = elems[i];
      //@ts-ignore
      const inputId = el.dataset.inputId;
      const inputStatus = this.inputs.find((input: any) => input.id === inputId)
        .status;
      const color = inputStatus === "valid" ? "green" : "red";
      el.setAttribute("fill", color);
      el.setAttribute("opacity", "0.3");
    }
  }

  @action.bound
  public hideInputs() {
    const elems = document.getElementsByClassName("pro-container");
    for (let i = 0; i < elems.length; i++) {
      const el = elems[i];
      el.setAttribute("fill", "transparent");
    }
  }
}

export const editorStore = new EditorStore(gazInputs);
export default EditorStore;
