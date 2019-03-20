import { StringStore } from "../stores/inputs/string";
import { SingleSelectStore } from "../stores/inputs/single-select";
import { SingleImageStore } from "../stores/inputs/single-image";
import { SingleImageEditableStore } from "../stores/inputs/single-image-editable/index";
import StringInput from "../pages/Editor/inputs/StringInput/StringInput";
import SingleSelectInput from "../pages/Editor/inputs/SingleSelectInput/SingleSelectInput";
import SingleImageInput from "../pages/Editor/inputs/SingleImageInput/SingleImageInput";
import SingleImageEditableInput from "../pages/Editor/inputs/SingleImageEditableInput/SingleImageEditableInput";

export const storeMapping: any = {
  string: StringStore,
  "single-select": SingleSelectStore,
  "single-image": SingleImageStore,
  "single-image-editable": SingleImageEditableStore,
};

export const componentMapping: any = {
  string: StringInput,
  "single-select": SingleSelectInput,
  "single-image": SingleImageInput,
  "single-image-editable": SingleImageEditableInput,
};

// TODO : check data file
export const checkData = (data: any) => {
  // data.inputs.forEach((input:any) => {
  //   // Check section
  //   // Check subsection
  // })
  return true;
};
