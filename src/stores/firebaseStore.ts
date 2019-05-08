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

  public getArchives = (callback: (d: any) => void) => {
    const userId = authStore.userId;
    const reports = database.ref(`users/${userId}/archives/`);
    reports.on("value", function(res: any) {
      callback(res.val());
    });
  };

  public getReports = (callback: (d: any) => void) => {
    const userId = authStore.userId;
    const reports = database.ref(`users/${userId}/ongoing/`);
    reports.on("value", function(res: any) {
      callback(res.val());
    });
  };

  public deleteReport = (reportId: string, callback?: (e: any) => void) => {
    const userId = authStore.userId;
    database.ref(`users/${userId}/ongoing/${reportId}`).remove((e: any) => {
      callback && callback(e);
    });
  };

  public deleteArchive = (reportId: string) => {
    const userId = authStore.userId;
    return database.ref(`users/${userId}/archives/${reportId}`).remove();
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

  public archiveReport = async (reportId: string) => {
    const userId = authStore.userId;
    const oldRef = database.ref(`users/${userId}/ongoing/${reportId}`);
    const newRef = database.ref(`users/${userId}/archives/${reportId}`);
    const snap = await oldRef.once("value");
    if (snap && snap.val) {
      await newRef.set(snap.val());
      const res = await oldRef.remove();
      return res;
    } else return snap;
  };

  public resurectArchive = async (reportId: string) => {
    const userId = authStore.userId;
    const oldRef = database.ref(`users/${userId}/archives/${reportId}`);
    const newRef = database.ref(`users/${userId}/ongoing/${reportId}`);
    const snap = await oldRef.once("value");
    if (snap && snap.val) {
      await newRef.set(snap.val());
      const res = await oldRef.remove();
      return res;
    } else return snap;
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
