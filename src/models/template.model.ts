type IinputType = "string" | "single-select";

interface IinputeBase {
  id: string;
  label: string;
  sectionId: string;
  value: string;
  type: IinputType;
  mandatory?: boolean;
  description?: string;
}

interface IstringInput extends IinputeBase {
  list?: string[];
}

interface IsingleSelectInput extends IinputeBase {
  values: string[];
}

interface IsignatureInput extends IinputeBase {
  values: string[];
}

export type Iinput = IstringInput | IsingleSelectInput | IsignatureInput;

export interface Isection {
  id: string;
  label: string;
  inputs: string[];
}

export interface Itemplate {
  id: string;
  svg: string;
  label: string;
  licence: string;
  description: string;
  sections: Isection[];
  inputs: Iinput[];
}

export type IreportStatus = "valid" | "new" | "warning" | "error";

export interface IreportBase {
  id: string;
  userId: string;
  sections: any[];
  templateId: string;
  templateName: string;
  creationDate: Date | string;
  lastModifiedDate: Date | string;
  status: IreportStatus;
}

export interface Ireport extends IreportBase {
  inputs: Iinput[];
}

export interface IreportObj extends IreportBase {
  inputs: IinputMap;
}

export interface IinputMap {
  [key: string]: Iinput;
}

export interface ItemplateMap {
  [key: string]: Itemplate;
}

export interface IreportMap {
  [key: string]: Ireport;
}
