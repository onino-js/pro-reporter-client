import { IreportStatus } from "./../stores/report";
import { mainTheme } from "./../assets/styles/_colors";
import { IinputStatus } from "../models/template.model";
import { ItemplateStatus } from "../stores/templateStore";
interface IvalidationMsg {
  status: "clean" | "error";
  numberOfInputs: number;
  errors: any[];
}

export const checkTemplate = (template: string) => {
  // Add hidden child to doccument and mount template in it
  const hiddenContainer = document.createElement("div");
  // hiddenContainer.style.display = "none";
  document.body.appendChild(hiddenContainer);
  hiddenContainer.innerHTML = template;

  // Define error object result
  let validationMsg: IvalidationMsg = {
    status: "clean",
    numberOfInputs: 0,
    errors: [],
  };

  const inputIds: string[] = [];

  // Check  if template exists and if template is a svg
  const svgEls = hiddenContainer.getElementsByTagName("svg");
  if (svgEls.length === 0) {
    validationMsg.errors.push({
      msg: "The provided template is not valid svg",
    });
    return validationMsg;
  } else if (svgEls.length !== 1) {
    validationMsg.errors.push({
      msg: "There can only be one svg element in the template",
    });
    return validationMsg;
  } else {
    const svgEl = svgEls[0];
    // Get back list of containers
    const containers = svgEl.getElementsByClassName("pro-container");
    // For Each Container
    for (let i = 0; i < containers.length; i++) {
      const container = containers[i];
      // Check if there is a data inputId
      //@ts-ignore
      const inputId = container.dataset.inputId;
      if (!inputId) {
        validationMsg.errors.push({
          msg:
            "An element with class pro-container should have a data-input-id attribute",
        });
      }
      // Check if corresponding input exists
      else {
        const inputEl = document.getElementById(inputId);
        if (!inputEl) {
          validationMsg.errors.push({
            msg: `The container with input id ${inputId} has no corresponding input element`,
          });
        }
        // Check if corresponding input is unique
        else if (inputIds.includes(inputId)) {
          validationMsg.errors.push({
            msg: `The id "${inputId}" is not unique`,
          });
        } else {
          inputIds.push(inputId);
        }
      }
    }
    // Check if input type is correct
    // Get back input list
    // For each input
    // Check if there is a corresponding container
    // Check if input is unique
  }

  const status = validationMsg.errors.length === 0 ? "clean" : "error";
  validationMsg.status = status;
  validationMsg.numberOfInputs = inputIds.length;
  return validationMsg;
};

export const buildSections = (template: string) => {};

export const getStatusColor = (
  status: IinputStatus | IreportStatus | ItemplateStatus,
  mandatory?: boolean,
) => {
  if (status === "valid") {
    return mainTheme.success;
  } else if (status === "error") {
    return mainTheme.danger;
  } else if (status === "untouched" && mandatory) {
    return mainTheme.warning;
  } else if (status === "warning") {
    return mainTheme.warning;
  } else if (status === "new") {
    return mainTheme.purple;
  } else {
    return mainTheme.disabled;
  }
};

export const getStatusIcon = (
  status: IinputStatus | IreportStatus | ItemplateStatus,
  mandatory?: boolean,
) => {
  switch (status) {
    case "valid":
      return "check";
    case "error":
      return "bug";
    case "untouched":
      return "exclamation-triangle";
    case "warning":
      return "exclamation-triangle";
    case "new":
      return "kiwi-bird";
  }
  return "exclamation-triangle";
};
