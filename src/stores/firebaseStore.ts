import { updateReportList } from "./../services/firebase.srevice";
import { Ireport } from "./../models/template.model";
import { observable, action } from "mobx";
import reportStore from "./report.store";
import authStore from "./auth.store";
import uiStore from "./ui.store";

type IsyncStatus = "ongoing" | "done" | "error";

export class FirebaseStore {
  @observable public syncList: string[] = [];
  @observable public syncStatus: IsyncStatus = "ongoing";

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
    const reports = reportStore!.reports.map(report => report.asJsonObj());
    updateReportList({
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
}

const firebaseStore: FirebaseStore = new FirebaseStore();
export default firebaseStore;
