import { observable, action } from "mobx";
import { ImodalName } from "../models/ui.models";

interface IloadingState {
  templates: boolean;
  reports: boolean;
  archives: boolean;
}

const initialLodingState: IloadingState = {
  templates: false,
  reports: false,
  archives: false,
};

export class UiStore {
  // MODALS
  @observable public showNewReport: boolean = false;
  @observable public showInfoModal: boolean = false;
  @observable public showLoadingModal: boolean = false;
  @observable public showDuplicateModal: boolean = false;
  @observable public showNewTemplate: boolean = false;
  @observable public showTemplateInfoModal: boolean = false;
  @observable public showLoadReportModal: boolean = false;
  @observable public showDeleteReportModal: boolean = false;
  @observable public showSyncModal: boolean = false;
  @observable public showInProgressModal: boolean = false;
  @observable public isInputModalOpen: boolean = false;

  @observable public loadingState: IloadingState = initialLodingState;
  @observable public isTopMenuActive: boolean = false;
  @observable public inProgressMessage: string | React.ReactChild = "";

  @action.bound
  public showModal(modal: ImodalName) {
    switch (modal) {
      case "info":
        this.showInfoModal = true;
        break;
      case "duplicate":
        this.showDuplicateModal = true;
        break;
      case "loading":
        this.showLoadingModal = true;
        break;
      case "new-template":
        this.showNewTemplate = true;
        break;
      case "template-info":
        this.showTemplateInfoModal = true;
        break;
      case "load-report":
        this.showLoadReportModal = true;
        break;
      case "delete-report":
        this.showDeleteReportModal = true;
        break;
      case "sync":
        this.showSyncModal = true;
        break;
      case "in-progress":
        this.showInProgressModal = true;
        break;
    }
  }

  @action.bound
  public hideModal(modal: ImodalName) {
    switch (modal) {
      case "info":
        this.showInfoModal = false;
        break;
      case "duplicate":
        this.showDuplicateModal = false;
        break;
      case "loading":
        this.showLoadingModal = false;
        break;
      case "new-template":
        this.showNewTemplate = false;
        break;
      case "template-info":
        this.showTemplateInfoModal = false;
        break;
      case "load-report":
        this.showLoadReportModal = false;
        break;
      case "delete-report":
        this.showDeleteReportModal = false;
        break;
      case "sync":
        this.showSyncModal = false;
        break;
      case "in-progress":
        this.showInProgressModal = false;
        break;
    }
  }

  @action.bound
  public setLoadingState = (
    key: keyof IloadingState,
    payload: boolean,
  ): void => {
    this.loadingState[key] = payload;
  };

  @action.bound
  public setState = (key: keyof UiStore, value: boolean): void => {
    this[key] = value;
  };

  @action.bound
  public setIsInputModalOpen = (payload: boolean): void => {
    this.isInputModalOpen = payload;
  };

  @action.bound
  public setInProgressMessage = (payload: string | React.ReactChild): void => {
    this.inProgressMessage = payload;
  };

  @action.bound
  public setIsTopMenuActive = (payload: boolean): void => {
    this.isTopMenuActive = payload;
  };
}

const uiStore: UiStore = new UiStore();
export default uiStore;
