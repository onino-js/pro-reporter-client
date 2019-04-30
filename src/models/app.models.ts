import { IinputStatus } from "./template.model";
import { IreportStatus } from "../stores/report";
import { ItemplateStatus } from "../stores/templateStore";

export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

export type Ipage = "";

export type Istatus = IinputStatus | IreportStatus | ItemplateStatus;
