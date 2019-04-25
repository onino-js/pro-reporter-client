import { message } from "antd";
import { mapToArray } from "./../services/app.service";
import { Itemplate, Ireport, IreportMap } from "./../models/template.model";
import {
  updateReport,
  createReport,
  getReports,
  deleteReport,
  updateReportList,
} from "./../services/firebase.srevice";
import { getStatusColor } from "./../services/template.service";
import uuid from "uuid/v1";
import { Report } from "./report";
import { observable, action, toJS, flow } from "mobx";
import authStore from "./auth.store";
import uiStore from "./ui.store";
import templateStore from "./templateStore";

const ZOOM_STEP: number = 20;

export class ReportStore {
  @observable public template: Itemplate | null = null;
  @observable public reports: Report[] = [];
  @observable public reportList: Ireport[] = [];
  @observable public activeReport: Report | null = null;
  @observable public activeReportId: string = "";
  @observable public fieldHighlighted: boolean = false;
  @observable public zoom: number = 100;
  @observable public editionMode: "direct" | "form" = "direct";

  @action.bound
  public setTemplate(template: Itemplate) {
    if (!(this.template && template.id === this.template.id)) {
      this.template = template;
      this.activeReport = null;
    }
  }

  @action.bound
  public setActiveReport(id: string) {
    // Check if report already loaded in editor
    const report = this.reports.find(report => report.id === id)!;
    if (report) {
      if (!this.template || this.template.id !== report.templateId) {
        this.template = templateStore.templates.find(
          t => t.id === report.templateId,
        )!;
      }
      this.activeReport = report;
    } else {
      // todo : manage error
      console.log("no corresponding editor in loaded reports");
    }
  }

  @action.bound
  public setReportList = (reports: Ireport[]) => {
    this.reportList = reports;
  };

  @action.bound
  public setEditionMode = (payload: "direct" | "form") => {
    this.editionMode = payload;
  };

  @action.bound
  public getReportList = () => {
    getReports(authStore.userId, (reports: IreportMap) => {
      // Transform object to array
      reports &&
        this.setReportList(
          mapToArray(reports).map((report: Ireport) => {
            return {
              ...report,
              inputs: mapToArray(report.inputs),
            };
          }),
        );
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
  public create(template: Itemplate) {
    const id = uuid();
    const newReport = new Report({
      userId: authStore.userId,
      templateId: template.id,
      templateName: template.label,
      id,
      creationDate: new Date(),
      lastModifiedDate: new Date(),
      inputs: this.template!.inputs,
      sections: this.template!.sections,
      status: "new",
    });
    this.reports.push(newReport);
    this.setActiveReport(id);
    window.setTimeout(
      () =>
        createReport({
          userId: authStore.userId,
          report: newReport.asJsonObj(),
        }),
      100,
    );
  }

  @action.bound
  loadReportListInEditor(ids?: string[]) {
    if (ids) {
      this.reportList
        .filter(r => ids.includes(r.id))
        .forEach(r => this.loadReportInEditor(r));
    } else {
      this.reportList.forEach(report => this.loadReportInEditor(report));
    }
  }

  @action.bound
  loadReportInEditor(report: Ireport) {
    const newReport = new Report(report);
    !this.isReportLoadedInEditor(report.id) && this.reports.push(newReport);
  }

  @action.bound
  loadReportInEditorFromId(reportId: string) {
    const allreadyLoaded = this.reports.find(r => r.id === reportId);
    if (!allreadyLoaded) {
      const report = this.reportList.find(report => report.id === reportId)!;
      if (report) {
        const newReport = new Report(report);
        this.reports.push(newReport);
      } else {
        // todo : manage error
        console.log("no corresponding report");
      }
    }
  }

  @action.bound
  public isReportLoadedInEditor(reportId: string) {
    const exist = this.reports.find(r => r.id === reportId);
    return exist ? true : false;
  }

  @action.bound
  public deleteReport = (reportId: string) => {
    deleteReport(authStore.userId, reportId);
    message.success("Le rapport a été supprimé");
  };

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
      const newReportJson: Ireport = {
        ...this.activeReport.asJson(),
        id: newId,
        creationDate: new Date(),
        lastModifiedDate: new Date(),
        inputs: newInputs,
      };
      const newReport = new Report(newReportJson);
      this.reports.push(newReport);
      this.setActiveReport(newReport.id);
      window.setTimeout(
        () =>
          createReport({
            userId: authStore.userId,
            report: newReport.asJsonObj(),
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
        const newReportJson: Ireport = {
          ...this.activeReport.asJson(),
          id: newId,
          creationDate: new Date(),
          lastModifiedDate: new Date(),
          inputs: newInputs,
        };
        const newReport = new Report(newReportJson);
        this.reports.push(newReport);
        lastId = newReport.id;

        // firebase creation
        createReport({
          userId: authStore.userId,
          report: newReport.asJsonObj(),
        });
      }
      this.setActiveReport(lastId);
    }
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
}

const reportStore: ReportStore = new ReportStore();
export default reportStore;
