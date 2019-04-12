import uuid from "uuid/v1";
import { EditorStore } from "./editor.store";
import { observable, action } from "mobx";
import { template } from "./../assets/static-data/templates/gaz-linking-1";
import Item from "antd/lib/list/Item";

export class ReportStore {
  @observable public reports: EditorStore[] = [];
  @observable public activeReport: EditorStore | null = null;
  @observable public activeReportId: string = "";

  @action.bound
  public create() {
    const id = uuid();
    const newReport = new EditorStore({ template, id });
    this.reports.push(newReport);
    this.setActiveReport(id);
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
  public duplicate(id: string) {
    const report = this.reports.find(report => report.id === id);
    if (!report) return;
    else {
      const newId = uuid();
      const newReport = new EditorStore({ template, id: newId });
      this.reports.push(newReport);
      this.setActiveReport(newReport.id);
      // newReport.inputs.forEach(input => {
      //   const inputToClone = report.inputs.find(item => item.id === input.id);
      //   if (inputToClone) input.clone(inputToClone);
      // });
    }
  }

  @action.bound
  public setActiveReport(id: string) {
    this.activeReport = this.reports.find(report => report.id === id)!;
  }
}

const reportStore: ReportStore = new ReportStore();
export default reportStore;
