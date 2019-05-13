import { message } from "antd";
import { observable, action, computed } from "mobx";
import { Report } from "../report";
import {
  IinputStatus,
  IinputBase,
  IinputJsonBase,
} from "../../models/template.model";
import { geocode, reverseGeocode } from "../../services/geoloc.service";

interface ISingleAddressStoreParams {
  reportRef: Report;
  inputRef: IsingleAddressInput;
  value: IsingleAddressValue;
}

type IaddressType = "route" | "locality";

export type IsingleAddressValue = string;
export interface IsingleAddressInput extends IinputBase {
  value: IsingleAddressValue;
  addressType: IaddressType;
}
export interface IsingleAddressJson extends IinputJsonBase {
  value: IsingleAddressValue;
}
export interface IsingleAddressJsonMap extends IsingleAddressJson {}

export interface IsingleAddressStoreConstructor {
  new (params: ISingleAddressStoreParams): SingleAddressStore;
}

export class SingleAddressStore {
  @observable public value: string = "";
  @observable public tempValue: string = "";
  @observable public id: string = "";
  public reportRef: Report;
  public inputRef: IsingleAddressInput;
  @observable showChoiceModal: boolean = false;
  @observable foundAddresses: any[] = [];

  @computed
  get status(): IinputStatus {
    let status: IinputStatus = "valid";
    if (this.value === "") {
      status = "untouched";
    } else if (this.value.length < 2) {
      status = "error";
    } else {
      status = "valid";
    }
    return status;
  }

  constructor(params: ISingleAddressStoreParams) {
    this.value = params.value;
    this.tempValue = params.value;
    this.id = params.inputRef.id;
    this.reportRef = params.reportRef;
    this.inputRef = params.inputRef;
  }

  @action
  public setValue = (value: string): void => {
    this.value = value;
    this.reportRef!.setStatus();
  };

  @action
  public confirmValue = (): void => {
    this.tempValue = this.value;
  };

  @action
  public retsoreValue = (): void => {
    this.setValue(this.tempValue);
  };

  @action.bound
  public reset() {
    this.setValue("");
  }

  @action.bound
  public clone(input: SingleAddressStore) {
    this.value = input.value;
    this.tempValue = input.tempValue;
  }

  @action.bound
  public async geoloc() {
    geocode(this.reverseGeoloc);
  }

  @action.bound
  public async reverseGeoloc(coords: any) {
    reverseGeocode(coords, (res: any) => {
      // Filter results
      const fa = res.results
        .filter((r: any) => r.types.includes("street_address"))
        .map((r: any) => {
          const fac = r.address_components.find((ac: any) =>
            ac.types.includes(this.inputRef.addressType),
          );
          return fac ? fac.long_name : null;
        });
      // remove duplicate values
      //const uniqueFa = Array.from(new Set(fa));
      const uniqueFa: any[] = ["adrese1", "addresse2"];

      // handle single response
      if (uniqueFa.length === 1) {
        this.setValue(uniqueFa[0] as string);
      }
      // handle empty response
      else if (uniqueFa.length === 0 || !uniqueFa[0]) {
        message.error("aucune adresse n'a été trouvée");
      }
      // handle multiple responses
      else if (uniqueFa.length > 1) {
        this.setFoundAddresses(uniqueFa);
        this.setShowChoiceModal(true);
      }
    });
  }

  public setShowChoiceModal(payload: boolean) {
    this.showChoiceModal = payload;
  }
  public setFoundAddresses(payload: any[]) {
    this.foundAddresses = payload;
  }

  public asJson(): IsingleAddressJson {
    return {
      id: this.id,
      value: this.value,
      status: this.status,
    };
  }

  public asJsonMap(): IsingleAddressJsonMap {
    return {
      id: this.id,
      value: this.value,
      status: this.status,
    };
  }
}

export default SingleAddressStore;
