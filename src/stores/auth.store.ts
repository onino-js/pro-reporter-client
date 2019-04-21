import { observable, action } from "mobx";

export class AuthStore {
  @observable public token: string = "";
  @observable public displayName: string = "";
  @observable public isLogged: boolean = false;
  @observable public email: string = "";
  @observable public password: string = "";
  @observable public userId: string = "";

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
  @action
  public setUserId = (payload: string): void => {
    this.userId = payload;
  };
}

const authStore: AuthStore = new AuthStore();
export default authStore;
