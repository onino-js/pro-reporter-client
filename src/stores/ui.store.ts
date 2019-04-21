import { observable, action } from "mobx";

export class UiStore {
  // MODALS
  @observable public showNewReport: boolean = false;
  @observable public showInfoModal: boolean = false;
  @observable public showLoadingModal: boolean = false;
  @observable public showDuplicateModal: boolean = false;
  @observable public showNewTemplate: boolean = false;

  @observable public isInputModalOpen: boolean = false;
  @observable public isTemplatesLoaded: boolean = false;
  @observable public isReportsLoaded: boolean = false;

  @action.bound
  public showModal(modal: string) {
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
    }
  }

  @action.bound
  public hideModal(modal: string) {
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
    }
  }

  @action.bound
  public setState = (key: keyof UiStore, value: boolean): void => {
    this[key] = value;
  };

  @action.bound
  public setIsInputModalOpen = (payload: boolean): void => {
    this.isInputModalOpen = payload;
  };

  @action.bound
  public setIsTemplatesLoaded = (payload: boolean): void => {
    this.isTemplatesLoaded = payload;
  };

  @action.bound
  public setIsReportsLoaded = (payload: boolean): void => {
    this.isReportsLoaded = payload;
  };
}

const uiStore: UiStore = new UiStore();
export default uiStore;
