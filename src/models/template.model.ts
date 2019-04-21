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

type Iinput = IstringInput | IsingleSelectInput | IsignatureInput;

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

export interface ItemplateMap {
  [key: string]: Itemplate;
}

export interface Ireport {
  inputs: Iinput[];
  id: string;
  sections: any[];
  template: Itemplate | null;
  creationDate: Date | string;
  lastModifiedDate: Date | string;
}

export interface IreportMap {
  [key: string]: Ireport;
}
