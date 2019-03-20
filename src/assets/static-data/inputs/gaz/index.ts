import { sections } from "./sections";
import entete from "./entete";
import contact from "./contact";
import signature from "./signature";
import liaisons from "./liaisons";

export const gazInputs = {
  sections,
  // @ts-ignore
  inputs: entete.concat(contact, signature, liaisons),
};
