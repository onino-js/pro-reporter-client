import { Itemplate } from "./../models/template.model";
import { observable, action } from "mobx";
import reportStore from "./report.store";
import authStore from "./auth.store";
import uiStore from "./ui.store";
import * as firebase from "firebase/app";
import { IreportMap } from "./report";

let database: any;

type IsyncStatus = "ongoing" | "done" | "error";

interface IupdateReportListParams {
  userId: string;
  reports: IreportMap[];
  onUpdateOne: (id: string) => void;
  onUpdateAll: () => void;
  onError: () => void;
}

export class FirebaseStore {
  @observable public syncList: string[] = [];
  @observable public syncStatus: IsyncStatus = "ongoing";

  // constructor() {
  //   this.initializeDataBase();
  // }

  public initializeDataBase = () => {
    database = firebase.database();
  };

  @action.bound
  public setSyncStatus = (payload: IsyncStatus) => {
    this.syncStatus = payload;
  };

  @action.bound
  public addToSyncList = (id: string) => {
    this.syncList.push(id);
  };

  @action.bound
  public resetSyncList = () => {
    this.syncList = [];
  };

  @action.bound
  public synchronize() {
    this.resetSyncList();
    uiStore.showModal("sync");
    this.setSyncStatus("ongoing");
    // get all reports in json format
    const reports = reportStore!.reports.map(report => report.asJsonMap());
    this.updateReportList({
      userId: authStore.userId,
      reports: reports,
      onUpdateOne: (id: string) => {
        this.addToSyncList(id);
      },
      onUpdateAll: () => this.setSyncStatus("done"),
      onError: () => this.setSyncStatus("error"),
    });
    // reports.forEach((report: any) =>
    //   updateReport({
    //     userId: authStore.userId,
    //     reportId: report.id,
    //     doc: report.inputs,
    //   }),
    // );
    // for each report, update it
  }

  // CRUD OPERATIONS FOR REPORTS

  public createReport = (report: IreportMap, callback?: (e: any) => void) => {
    const userId = authStore.userId;
    const ref = database.ref(`users/${userId}/ongoing/${report.id}/`);
    ref.set(report, (e: any) => {
      callback && callback(e);
    });
  };

  public getReportsList = (callback?: (e: any) => void) => {
    const reports = database.ref("projects/");
    reports.on("value", function(res: any) {
      callback && callback(res.val());
    });
  };

  public getReportList = (callback: any) => {
    const reports = database.ref(`reports/`);
    reports.on("value", function(res: any) {
      callback(res.val());
    });
  };

  public getReports = (callback: any) => {
    const userId = authStore.userId;
    const reports = database.ref(`users/${userId}/ongoing/`);
    reports.on("value", function(res: any) {
      console.log(res.val());
      callback(res.val());
    });
  };

  public deleteReport = (reportId: string, callback?: (e: any) => void) => {
    const userId = authStore.userId;
    database.ref(`users/${userId}/ongoing/${reportId}`).remove((e: any) => {
      callback && callback(e);
    });
  };

  public deleteAllActiveReports = (callback?: any) => {
    const userId = authStore.userId;
    database.ref(`users/${userId}/ongoing/`).remove((e: any) => {
      callback && callback(e);
    });
  };

  public saveReport = (doc: any, callback?: any) => {
    database.ref(`reports/${doc.reference}/${doc.id}`).set(doc, (e: any) => {
      if (callback) {
        callback(e);
      }
    });
  };

  public updateReport = ({ reportId, doc, callback }: any) => {
    const userId = authStore.userId;
    database.ref(`users/${userId}/${reportId}/inputs`).update(doc, (e: any) => {
      if (callback) {
        callback(e);
      }
    });
  };

  public updateReportList = async ({
    reports,
    onUpdateOne,
    onUpdateAll,
    onError,
  }: IupdateReportListParams) => {
    const userId = authStore.userId;
    for (const report of reports) {
      const ref = database.ref(`users/${userId}/ongoing/${report.id}`);
      await ref.update(report);
      onUpdateOne && onUpdateOne(report.id);
    }
    onUpdateAll && onUpdateAll();
  };

  // CRUD OPERATIONS FOR TEMPLATES

  public getTemplates = (callback: any) => {
    const reports = database.ref("templates/");
    reports.on("value", function(res: any) {
      res && res.val && callback(res.val());
    });
  };

  public createTemplate = (template: Itemplate, callback?: any) => {
    const ref = database.ref(`templates/${template.id}`);
    ref.set(template, function(res: any, err: any) {
      callback && callback();
    });
  };

  public checkTemplateId = async (id: string) => {
    const snapshot = await database.ref(`templates/${id}`).once("value");
    if (snapshot.exists()) {
      return true;
    } else return false;
  };
}

const firebaseStore: FirebaseStore = new FirebaseStore();
export default firebaseStore;
