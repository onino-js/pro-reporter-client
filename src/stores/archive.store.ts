import { message } from "antd";
import { mapToArray } from "./../services/app.service";
import { IreportJson } from "./report";
import { observable, action } from "mobx";
import firebaseStore from "./firebaseStore";
import uiStore from "./ui.store";
import { IarchiveMap } from "../models/template.model";
import reportStore from "./report.store";

export class ArchiveStore {
  @observable public archiveList: IreportJson[] = [];

  @action.bound
  public setArchiveList = (reports: IreportJson[]) => {
    this.archiveList = reports;
  };
  @action.bound
  public deleteArchive = async (id: string) => {
    const err = await firebaseStore.deleteArchive(id);
    if (!err) {
      message.success("Le rapport a été supprimé");
    }
  };
  @action.bound
  public archiveReport = async (id: string) => {
    const err = await firebaseStore.archiveReport(id);
    if (err) {
      message.error("Une erreur s'est produite, veuillez réessayer plus tard.");
    } else {
      message.success("Le rapport a été archivé");
      if (reportStore.isReportLoadedInEditor(id)) {
        reportStore.unloadReport(id);
      }
    }
  };

  @action.bound
  public resurectArchive = async (id: string) => {
    const err = await firebaseStore.resurectArchive(id);
    if (err) {
      message.error("Une erreur s'est produite, veuillez réessayer plus tard.");
    } else {
      message.success(
        "Le rapport est de nouveau éditable dans la liste en cours",
      );
    }
  };

  @action.bound
  public getArchiveList = () => {
    firebaseStore.getArchives((archives: IarchiveMap | null) => {
      // Transform object to array
      if (archives === null) {
        this.setArchiveList([]);
      } else if (archives) {
        this.setArchiveList(mapToArray(archives));
      }
      uiStore!.setLoadingState("archives", true);
    });
  };
}

const archiveStore: ArchiveStore = new ArchiveStore();
export default archiveStore;
