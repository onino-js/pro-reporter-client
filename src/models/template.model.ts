import {
  IcompareTwoImagesJson,
  IcompareTwoImagesJsonMap,
  IcompareTwoImagesStoreConstructor,
} from "./../stores/inputs/compare-two-images/index";
import {
  IsingleSignatureInput,
  IsingleSignatureJson,
  IsingleSignatureJsonMap,
  IsingleSignatureStoreConstructor,
} from "./../stores/inputs/single-signature/index";
import {
  IsingleSelectInput,
  IsingleSelectJson,
  IsingleSelectJsonMap,
  IsingleSelectStoreConstructor,
} from "./../stores/inputs/single-select";
import {
  IstringInput,
  IstringInputJson,
  IstringInputJsonMap,
  IstringStoreConstructor,
} from "./../stores/inputs/string";
import { StringStore } from "../stores/inputs/string";
import { SingleSelectStore } from "../stores/inputs/single-select";
import { SingleSignatureStore } from "../stores/inputs/single-signature";
import {
  SingleImageStore,
  IsingleImageInput,
  IsingleImageStoreConstructor,
} from "../stores/inputs/single-image";
import {
  CompareTwoImagesStore,
  IcompareTwoImagesInput,
} from "../stores/inputs/compare-two-images";
import { IreportStatus } from "../stores/report";
import {
  ImultilineTextInput,
  ImultilineTextJson,
  ImultilineTextJsonMap,
  MultilineTextStore,
  ImultilineTextStoreConstructor,
} from "../stores/inputs/multiline-text";
import {
  IsimpleDateInput,
  IsimpleDateJson,
  IsimpleDateJsonMap,
  SimpleDateStore,
  IsimpleDateStoreConstructor,
} from "../stores/inputs/simple-date";

export type IinputType =
  | "string"
  | "single-select"
  | "single-signature"
  | "single-image"
  | "compare-two-images"
  | "multiline-text"
  | "simple-date";

export type IinputStatus = "valid" | "untouched" | "warning" | "error";

export interface IinputBase {
  id: string;
  label: string;
  sectionId: string;
  type: IinputType;
  mandatory?: boolean;
  description?: string;
}

export interface IinputJsonBase {
  id: string;
  status: IinputStatus;
}

// COMPARE TWO IMAGES

// INPUT
export type Iinput =
  | IstringInput
  | IsingleSelectInput
  | IsingleSignatureInput
  | IsingleImageInput
  | IcompareTwoImagesInput
  | ImultilineTextInput
  | IsimpleDateInput;

export type IinputJson =
  | IstringInputJson
  | IsingleSelectJson
  | IsingleSignatureJson
  | IcompareTwoImagesJson
  | ImultilineTextJson
  | IsimpleDateJson;

export type IinputJsonMap =
  | IstringInputJsonMap
  | IsingleSelectJsonMap
  | IsingleSignatureJsonMap
  | IcompareTwoImagesJsonMap
  | ImultilineTextJsonMap
  | IsimpleDateJsonMap;

export type IinputStore =
  | StringStore
  | SingleSelectStore
  | SingleSignatureStore
  | SingleImageStore
  | CompareTwoImagesStore
  | MultilineTextStore
  | SimpleDateStore;

export type IinputStoreConstructor =
  | IstringStoreConstructor
  | IsingleSelectStoreConstructor
  | IsingleSignatureStoreConstructor
  | IsingleImageStoreConstructor
  | IcompareTwoImagesStoreConstructor
  | ImultilineTextStoreConstructor
  | IsimpleDateStoreConstructor;

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
  creationDate: string;
  author: string;
  imgPath: string;
}

export interface IinputMap {
  [key: string]: Iinput;
}

export interface ItemplateMap {
  [key: string]: Itemplate;
}

export interface Iarchive {
  id: string;
  stattus: IreportStatus;
  pdfPath: string;
}

export interface IarchiveMap {
  [key: string]: Iarchive;
}
