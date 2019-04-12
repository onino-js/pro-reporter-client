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
  @observable public zoom: number = 100;

  @computed
  get status() {
    let res = {};
    return res;
  }

  constructor({ template, id }: any) {
    this.template = template;
    this.id = id;
  }

  @action.bound
  public initialize() {
    this.mountTemplate("canvas-container");
    this.buildInputAndSections();
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
  public buildInputAndSections() {
    const sections = [];
    const sectionsElems = document.getElementsByClassName("section");

    for (let i = 0; i < sectionsElems.length; i++) {
      const sectionElem = sectionsElems[i];
      //@ts-ignore
      const sectionId = sectionElem.id;
      //@ts-ignore
      const sectionLabel = sectionElem.dataset.label;

      // Check if there is subsections
      const subsections: any[] = [];
      const subsectionsElems = sectionElem.getElementsByClassName("subsection");

      if (subsectionsElems.length !== 0) {
        for (let i = 0; i < subsectionsElems.length; i++) {
          const subsectionElem = subsectionsElems[i];
          //@ts-ignore
          const subsectionId = subsectionElem.id;
          //@ts-ignore
          const subsectionLabel = subsectionElem.dataset.label;
          subsections.push({
            id: subsectionId,
            label: subsectionLabel,
          });
          const elems = subsectionElem.getElementsByClassName("pro-input");
          this.buildInputs({
            elems: elems,
            sectionId: sectionId,
            subsectionId: subsectionId,
          });
        }
      } else {
        const elems = sectionElem.getElementsByClassName("pro-input");
        this.buildInputs({
          elems: elems,
          sectionId: sectionId,
          subsectionId: false,
        });
      }

      sections.push({
        id: sectionId,
        label: sectionLabel,
        subsections: subsections,
      });
    }
    this.createSections(sections);
  }

  @action.bound
  public buildInputs({ elems, sectionId, subsectionId }: any) {
    // for each input
    for (let i = 0; i < elems.length; i++) {
      //  determine type, section and subsection
      const el = elems[i];
      //@ts-ignore
      const id = el.id;
      //@ts-ignore
      const type = el.dataset.type;
      //@ts-ignore
      const label = el.dataset.label;

      // Build input object
      const input = {
        id,
        type,
        label,
        sectionId,
        subsectionId,
        value: "",
      };
      switch (type) {
        case "string":
          //@ts-ignore
          input.value = "";
          if (el.dataset.list) {
            //@ts-ignore
            input.options = {
              list: el.dataset.list.split(","),
            };
          }
          //input.value = el.textContent;
          break;
        case "number":
          //@ts-ignore
          input.value = 0;
          // input.value = Number(el.textContent);
          break;
        case "single-image":
          //@ts-ignore
          input.value = "";
          //@ts-ignore
          // input.options = { height: el. };
          // input.value = el.getAttribute("xlink:href");
          break;
        case "single-image-editable":
          //@ts-ignore
          input.value = "";
          //@ts-ignore
          input.options = {
            height: el.getBoundingClientRect().height,
            width: el.getBoundingClientRect().width,
          };
          // input.value = el.getAttribute("xlink:href");
          break;
        case "single-signature":
          //@ts-ignore
          input.value = "";
          //@ts-ignore
          input.options = {
            height: el.getBoundingClientRect().height,
            width: el.getBoundingClientRect().width,
          };
          // input.value = el.getAttribute("xlink:href");
          break;
        case "compare-two-images":
          //@ts-ignore
          input.value = { before: "", after: "" };
          const imgEl = el.getElementsByTagName("image")[0];
          //@ts-ignore
          input.options = {
            height: imgEl.getBoundingClientRect().height,
            width: imgEl.getBoundingClientRect().width,
          };
          // input.value = el.getAttribute("xlink:href");
          break;
        case "single-select":
          const values: string[] = [];
          const textEls = el.getElementsByTagName("text");
          for (let i = 0; i < textEls.length; i++) {
            values.push(textEls[i].dataset.value);
          }
          //@ts-ignore
          input.value = "";
          //@ts-ignore
          input.options = { values: values };
          break;
      }
      // Create observable variable in store
      this.createInput(input);
      // this.addListener({ id: input.id, type: input.type, value: input.value });
    }
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
  public zoomIn() {
    const el = document.getElementById("canvas-container");
    el && (el!.style.width = `${this.zoom + ZOOM_STEP}%`);
    this.zoom += ZOOM_STEP;
  }

  @action.bound
  public zoomOut() {
    const el = document.getElementById("canvas-container");
    el && (el!.style.width = `${this.zoom - ZOOM_STEP}%`);
    this.zoom -= ZOOM_STEP;
  }

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
