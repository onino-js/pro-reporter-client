import {
  Itemplate,
  ItemplateMap,
  Isection,
} from "./../models/template.model";
import { observable, action } from "mobx";
import {
  getTemplates,
  checkTemplateId,
  createTemplate,
} from "../services/firebase.srevice";
import uiStore from "./ui.store";
import { mapToArray } from "../services/app.service";

interface ItemplateError {
  msg: string;
}

type ItemplateStatus = "valid" | "warning" | "error" | "unchecked";

interface InewTemplateStatus {
  svgLoaded: boolean;
  metadataStatus: ItemplateStatus;
  dataStatus: ItemplateStatus;
  status: ItemplateStatus;
  errors: ItemplateError[];
  svgStatus: ItemplateStatus;
}

interface InewTemplateStatusOpt {
  svgLoaded?: boolean;
  metadataStatus?: ItemplateStatus;
  dataStatus?: ItemplateStatus;
  svgStatus?: ItemplateStatus;
  status?: ItemplateStatus;
  errors?: ItemplateError[];
}

export class TemplateStore {
  @observable public templates: Itemplate[] = [];
  @observable public newTemplateFileName: string = "";
  @observable public newTemplateStatus: InewTemplateStatus = {
    svgLoaded: false,
    svgStatus: "unchecked",
    metadataStatus: "unchecked",
    dataStatus: "unchecked",
    status: "unchecked",
    errors: [],
  };
  @observable public newTemplate: Itemplate = {
    id: "",
    svg: "",
    licence: "",
    label: "",
    description: "",
    sections: [],
    inputs: [],
  };

  @action.bound
  public getTemplates = (callback?: () => void) => {
    getTemplates((payload: ItemplateMap) => {
      if (!payload) {
        this.setTemplates([]);
      } else {
        this.setTemplatesFromObj(payload);
      }
      callback && callback();
    });
  };

  @action.bound
  public setTemplates(templates: Itemplate[]) {
    this.templates = templates;
  }

  @action.bound
  public createTemplate() {
    createTemplate(this.newTemplate);
  }

  @action.bound
  public setTemplatesFromObj(templates: ItemplateMap) {
    this.templates = [];
    Object.keys(templates).forEach(key => {
      this.templates.push({
        id: key,
        svg: templates[key].svg,
        label: templates[key].label,
        description: templates[key].description,
        licence: templates[key].licence,
        sections: mapToArray(templates[key].sections),
        inputs: mapToArray(templates[key].inputs),
      });
    });
  }

  // NEW TEMPLATE HANDLING
  @action.bound
  public mountNewTemplate(payload: string) {
    const el = document.getElementById("new-template-preview");
    el!.innerHTML = payload;
    const res = this.validateSvg(el!);
    res && (this.newTemplateStatus.svgLoaded = true);
  }

  @action.bound
  public resetNewTemplate = () => {
    this.newTemplateStatus = {
      svgLoaded: false,
      svgStatus: "unchecked",
      metadataStatus: "unchecked",
      dataStatus: "unchecked",
      status: "unchecked",
      errors: [],
    };
    this.newTemplate = {
      id: "",
      svg: "",
      label: "",
      description: "",
      licence: "",
      sections: [],
      inputs: [],
    };
    document.getElementById("new-template-preview")!.innerHTML = "";
    this.newTemplateFileName = "";
  };

  @action.bound
  public uploadRequest() {}

  @action.bound
  public uploadTemplate(file: File) {
    const reader = new FileReader();
    reader.addEventListener(
      "load",
      () => {
        const res = reader.result as string;
        this.newTemplate.svg = res;
        this.mountNewTemplate(res);
      },
      false,
    );
    if (file) {
      reader.readAsText(file);
      this.newTemplateFileName = file.name;
    }
  }

  @action.bound
  public setNewTemplateStatus = (payload: InewTemplateStatusOpt) => {
    this.newTemplateStatus = Object.assign({}, this.newTemplateStatus, payload);
  };

  @action.bound
  public addTemplateErrors(msg: string) {
    // const errors = this.newTemplateStatus.errors
    //   .slice()
    //   .map(item => ({ ...item }));
    // errors.push({ msg });
    //this.newTemplateStatus.errors = errors;
    this.newTemplateStatus.errors.push({ msg });
    //this.newTemplateStatus = Object.assign({}, this.newTemplateStatus);
  }

  @action.bound
  public validateSvg = (el: HTMLElement) => {
    // Check there is only one svg
    const svgEls = el.getElementsByTagName("svg");
    if (svgEls.length === 0) {
      this.addTemplateErrors(
        "Le fichier fourni n'est pas un svg valide. Essayez de l'ouvrir dans un éditeur de svg comme Inkscape ou Adobe illustrator puis de le réenregistrer dans un format svg standard",
      );
      this.setNewTemplateStatus({
        status: "error",
        metadataStatus: "error",
      });
      return false;
    } else if (svgEls.length !== 1) {
      this.addTemplateErrors("Il ne peut y avoir qu'un seul élement svg");
      this.setNewTemplateStatus({
        status: "error",
        metadataStatus: "error",
      });
      return false;
    }
    const svg = svgEls[0];
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "auto");
    this.setNewTemplateStatus({ svgStatus: "valid" });
    return true;
  };

  @action.bound
  public validateMetaData = async () => {
    const svgEls = document
      .getElementById("new-template-preview")!
      .getElementsByTagName("svg");
    const svg = svgEls[0];

    // @ts-ignore
    const dataset = svg.dataset;
    // Check ID
    if (!svg.id) {
      this.addTemplateErrors("Le template n'a pas d'identifiant");
      this.setNewTemplateStatus({
        status: "error",
        metadataStatus: "error",
      });
    } else {
      this.newTemplate.id = svg.id;
      const idExists = await checkTemplateId(svg.id);
      if (idExists) {
        this.addTemplateErrors("L'identifiant exist déja");
        this.setNewTemplateStatus({
          status: "error",
          metadataStatus: "error",
        });
      }
    }

    if (!dataset) {
      this.addTemplateErrors(
        "Aucune méta donnée detectée dans ce document svg",
      );
      this.setNewTemplateStatus({
        status: "error",
        metadataStatus: "error",
      });
      return;
    }
    if (!dataset.label) {
      this.addTemplateErrors("Le template n'a pas de nom");
      this.setNewTemplateStatus({
        status: "error",
        metadataStatus: "error",
      });
    } else this.newTemplate.label = dataset.label;

    if (!dataset.licence) {
      this.addTemplateErrors("Le template n'a pas de licence");
      this.setNewTemplateStatus({
        status: "error",
        metadataStatus: "error",
      });
    } else this.newTemplate.licence = dataset.licence;

    if (this.newTemplateStatus.metadataStatus === "error") {
      return;
    } else {
      this.setNewTemplateStatus({ metadataStatus: "valid" });
      return;
    }
    // The template has a name
    // The template has a description
    // The template has an author
    // The template has an licence
    // The template has tags
  };

  @action.bound
  public validateTemplateData = () => {
    const svgEls = document
      .getElementById("new-template-preview")!
      .getElementsByTagName("svg");
    const svg = svgEls[0];

    // There is one group of class input-layer
    const inputLayer = svg.getElementById("input-layer");

    if (!inputLayer) {
      this.addTemplateErrors("Le template n'a pas de layer input");
      this.setNewTemplateStatus({
        status: "error",
        dataStatus: "error",
      });
      return false;
    }
    const inputs = inputLayer.getElementsByClassName("pro-input");
    if (inputs.length === 0) {
      this.addTemplateErrors("Aucun input n'a été détecté dans le svg");
      this.setNewTemplateStatus({
        status: "error",
        dataStatus: "error",
      });
      return false;
    } else {
      this.buildInputAndSections(svg);
    }
    // // Each pro-input is valid
    // for (let i = 0; i < inputs.length; i++) {
    //   const input = inputs[i];
    //   console.log(input.getAttribute("data-set"));
    // }

    // There is one group of class container-layer

    // Each pro-container class has a corresponding input element

    if (this.newTemplateStatus.dataStatus === "error") {
      return false;
    } else {
      this.setNewTemplateStatus({
        dataStatus: "valid",
        status: "valid",
      });
      return true;
    }
  };

  @action.bound
  public buildInputAndSections(svg: any) {
    const sections: Isection[] = [];
    const sectionsElems = svg.getElementsByClassName("section");

    // For each section in the template
    for (let i = 0; i < sectionsElems.length; i++) {
      const sectionElem = sectionsElems[i];
      //@ts-ignore
      const sectionId = sectionElem.id;
      //@ts-ignore
      const sectionLabel = sectionElem.dataset.label;

      const elems = sectionElem.getElementsByClassName("pro-input");
      this.buildInputs({
        elems: elems,
        sectionId: sectionId,
      });

      sections.push({
        id: sectionId,
        label: sectionLabel,
        inputs: [],
      });
    }
    this.newTemplate.sections = sections;
  }

  @action.bound
  public buildInputs({ elems, sectionId }: any) {
    // for each input
    for (let i = 0; i < elems.length; i++) {
      //  determine type, section and subsection
      const el = elems[i];
      //@ts-ignore
      const id = el.id;
      //@ts-ignore
      const type = el.dataset.type;
      //@ts-ignore
      const label = el.dataset.label || "Label non défini";

      // Build input object
      const input = {
        id,
        type,
        label,
        sectionId,
        value: "",
      };
      switch (type) {
        case "string":
          //@ts-ignore
          input.value = "";
          //@ts-ignore
          input.mandatory = true;
          //@ts-ignore
          el.dataset.optional && (input.mandatory = false);
          if (el.dataset.list) {
            //@ts-ignore
            input.options = {
              list: el.dataset.list
                .split(",")
                .map((item: string) => item.trim()),
            };
          }
          //input.value = el.textContent;
          break;
        case "number":
          //@ts-ignore
          input.value = 0;
          //@ts-ignore
          input.mandatory = true;
          //@ts-ignore
          el.dataset.optional && (input.mandatory = false);
          // input.value = Number(el.textContent);
          break;
        case "single-image":
          //@ts-ignore
          input.value = "";
          //@ts-ignore
          input.mandatory = true;
          //@ts-ignore
          el.dataset.optional && (input.mandatory = false);
          //@ts-ignore
          // input.options = { height: el. };
          // input.value = el.getAttribute("xlink:href");
          break;
        case "single-image-editable":
          //@ts-ignore
          input.value = "";
          //@ts-ignore
          input.mandatory = true;
          //@ts-ignore
          el.dataset.optional && (input.mandatory = false);
          //@ts-ignore
          input.options = {
            height: el.height.baseVal.value,
            width: el.width.baseVal.value,
          };
          // input.value = el.getAttribute("xlink:href");
          break;
        case "single-signature":
          //@ts-ignore
          input.value = "";
          //@ts-ignore
          input.mandatory = true;
          //@ts-ignore
          el.dataset.optional && (input.mandatory = false);
          //@ts-ignore
          input.options = {
            height: el.height.baseVal.value,
            width: el.width.baseVal.value,
          };
          // input.value = el.getAttribute("xlink:href");
          break;
        case "compare-two-images":
          //@ts-ignore
          input.value = { before: "", after: "" };
          //@ts-ignore
          input.mandatory = true;
          //@ts-ignore
          el.dataset.optional && (input.mandatory = false);
          const imgEl = el.getElementsByTagName("image")[0];
          //@ts-ignore
          input.options = {
            height: imgEl.height.baseVal.value,
            width: imgEl.width.baseVal.value,
          };
          // input.options = {
          //   height: imgEl.getBoundingClientRect().height,
          //   width: imgEl.getBoundingClientRect().width,
          // };
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
          input.mandatory = true;
          //@ts-ignore
          el.dataset.optional && (input.mandatory = false);
          //@ts-ignore
          input.values = values;
          break;
      }
      // Create observable variable in store
      this.newTemplate.inputs.push(input);
      // this.addListener({ id: input.id, type: input.type, value: input.value });
    }
  }
}

const templateStore: TemplateStore = new TemplateStore();
export default templateStore;
