import { mapToArray } from "./../services/app.service";
import { Itemplate, Ireport, IreportMap } from "./../models/template.model";
import {
  updateReport,
  createReport,
  getReports,
} from "./../services/firebase.srevice";
import { getStatusColor } from "./../services/template.service";
import uuid from "uuid/v1";
import { Report } from "./report";
import { observable, action, toJS, flow } from "mobx";
import authStore from "./auth.store";
import uiStore from "./ui.store";

const ZOOM_STEP: number = 20;

export class ReportStore {
  @observable public template: Itemplate | null = null;
  @observable public reports: Report[] = [];
  @observable public reportList: Ireport[] = [];
  @observable public activeReport: Report | null = null;
  @observable public activeReportId: string = "";
  @observable public fieldHighlighted: boolean = false;
  @observable public zoom: number = 100;

  @action.bound
  public setTemplate(template: Itemplate) {
    this.template = template;
    this.activeReport = null;
  }

  @action.bound
  public setReportList = (reports: Ireport[]) => {
    this.reportList = reports;
  };

  @action.bound
  public getReportList = () => {
    getReports(authStore.userId, (reports: IreportMap) => {
      this.setReportList(mapToArray(reports));
      uiStore!.setIsReportsLoaded(true);
    });
  };

  @action.bound
  public mountTemplate(id: string) {
    this.template &&
      (document.getElementById(id)!.innerHTML = this.template.svg as string);
    const svg = document.getElementById(id)!.getElementsByTagName("svg")[0];
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "auto");
  }

  @action.bound
  public getSvg() {
    return document.getElementById("canvas-container")!.innerHTML;
  }

  @action.bound
  public create() {
    const id = uuid();
    const newReport = new Report({
      template: this.template,
      id,
      inputs: this.template!.inputs,
      sections: this.template!.sections,
    });
    this.reports.push(newReport);
    this.setActiveReport(id);
    window.setTimeout(
      () =>
        createReport({
          userId: authStore.userId,
          reportId: id,
          report: newReport.asJson(),
        }),
      100,
    );
  }

  @action.bound
  public delete(id: string) {
    const index = this.reports.findIndex(report => report.id === id);
    if (index === -1) return;
    else {
      this.reports.splice(index, 1);
      if (index === 0) {
        this.activeReport = null;
      } else {
        this.activeReport = this.reports[index - 1];
      }
    }
  }

  @action.bound
  public reset() {
    this.activeReport &&
      this.activeReport.inputs.forEach(input => input.reset());
    this.renderCanvas();
  }

  @action.bound
  public duplicate() {
    const newId = uuid();
    if (!this.activeReport) return;
    else {
      const newInputs = this.activeReport!.inputs.map((input: any) =>
        toJS(input),
      );
      const newReport = new Report({
        template: this.template,
        inputs: newInputs,
        sections: this.template!.sections,
        id: newId,
      });
      this.reports.push(newReport);
      this.setActiveReport(newReport.id);
      window.setTimeout(
        () =>
          createReport({
            userId: authStore.userId,
            reportId: newReport.id,
            report: newReport.asJson(),
          }),
        100,
      );
    }
  }

  @action.bound
  public customDuplicate({ nb, sectionsIds }: any) {
    if (!this.activeReport) return;
    else {
      let lastId = "";
      for (let i = 0; i < nb; i++) {
        const newId = uuid();
        const newInputs = this.activeReport!.inputs.map((input: any) =>
          toJS(input),
        );
        const newReport = new Report({
          template: this.template,
          inputs: newInputs,
          sections: this.template!.sections,
          id: newId,
        });
        this.reports.push(newReport);
        lastId = newReport.id;

        // firebase creation
        createReport({
          userId: authStore.userId,
          reportId: newReport.id,
          report: newReport.asJson(),
        });
      }
      this.setActiveReport(lastId);
    }
  }

  @action.bound
  public setActiveReport(id: string) {
    this.activeReport = this.reports.find(report => report.id === id)!;
  }

  @action.bound
  public setFieldHighlighted(payload: boolean) {
    this.fieldHighlighted = payload;
  }

  @action.bound
  public createSections(sections: any) {
    sections.forEach((section: any) => {
      this.template!.sections.push(section);
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
    if (svgEls.length === 1 && this.activeReport) {
      this.activeReport.inputs.forEach((input, index) => {
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
  public renderContainers() {
    const elems = document.getElementsByClassName("pro-container");
    for (let i = 0; i < elems.length; i++) {
      const el = elems[i];
      //@ts-ignore
      const inputId = el.dataset.inputId;
      const input = this.activeReport!.inputs.find(
        (input: any) => input.id === inputId,
      );
      const color = getStatusColor(input.status, input.mandatory);
      el.setAttribute("opacity", "0.6");
      el.setAttribute("fill", color);
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

  @action.bound
  public synchronize() {
    // get all reports in json format
    const reports = this.reports.map(report => report.asJson());
    reports.forEach((report: any) =>
      updateReport({
        userId: authStore.userId,
        reportId: report.id,
        doc: report.inputs,
      }),
    );
    // for each report, update it
  }
}

const reportStore: ReportStore = new ReportStore();
export default reportStore;
