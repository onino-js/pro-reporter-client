import { observable, action } from "mobx";

export class UiStore {
  @observable public token: string = "";
  @observable public displayName: string = "";
  @observable public isLogged: boolean = true;
  @observable public email: string = "";
  @observable public password: string = "";
  @observable public showNewReport: boolean = false;

  @action
  public setState = (key: keyof UiStore, value: boolean): void => {
    this[key] = value;
  };

  @action
  public setIsLogged = (payload: boolean): void => {
    this.isLogged = payload;
  };
  @action
  public setToken = (token: string): void => {
    this.token = token;
  };
  @action
  public setEmail = (email: string): void => {
    this.email = email;
  };
  @action
  public setPassword = (password: string): void => {
    this.password = password;
  };
  @action
  public setDisplayName = (displayName: string): void => {
    this.displayName = displayName;
  };
}

const uiStore: UiStore = new UiStore();
export default uiStore;
