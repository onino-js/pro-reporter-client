import { sections } from "./sections";
import entete from "./entete";
import contact from "./contact";
import signature from "./signature";

export const gazInputs = {
  sections,
  inputs: entete.concat(contact, signature),
};
