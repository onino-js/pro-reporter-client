interface IcreateImageFromPathParams {
  path: string;
  width: number;
  height: number;
}

export const createImageFromPath = (
  opt: IcreateImageFromPathParams,
): string => {
  const baseImage = new Image();
  baseImage.src = opt.path;
  const canvas = document.createElement("canvas");
  canvas.width = opt.width;
  canvas.height = opt.height;
  const ctx = canvas.getContext("2d");
  ctx!.drawImage(baseImage, 0, 0);
  const dataURL = canvas.toDataURL("image/png");
  // const data = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  return dataURL;
};

interface IcreateImageFromSvgParams {
  svgEl: any;
  width: number;
  height: number;
}

export const createImageFromSvg = (opt: IcreateImageFromSvgParams): string => {
  console.log(opt.svgEl);
  //const s = new XMLSerializer().serializeToString(opt.svgEl);
  const encodedData = window.btoa(unescape(encodeURIComponent(opt.svgEl)));
  console.log("data:image/svg+xml;base64," + encodedData);
  const baseImage = new Image();
  baseImage.src = "data:image/svg+xml;base64," + encodedData;
  const canvas = document.createElement("canvas");
  canvas.width = opt.width;
  canvas.height = opt.height;
  const ctx = canvas.getContext("2d");
  ctx!.drawImage(baseImage, 0, 0);
  const dataURL = canvas.toDataURL("image/png");
  //const data = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  return "data:image/svg+xml;base64," + encodedData;
};

export const formatDate = (dateStr: string | Date) => {
  let date;
  if (typeof dateStr === "string") {
    date = new Date(dateStr);
  } else {
    date = dateStr;
  }
  const month = date.getMonth();
  const day = date.getDate();
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const formatHour = (date: Date) => {
  const month = date.getMonth();
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  return `${day}/${month} ${hour}:${min}`;
};

export const isEmpty = (obj: any) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

export const arrayToMap = (payload: any[], key: any) => {
  const map = {};
  payload.forEach(item => {
    //@ts-ignore
    map[item[key]] = item;
  });
  return map;
};

export const mapToArray = (payload: any) => {
  const list: any = [];
  Object.keys(payload).forEach((key: string) => {
    list.push({
      ...payload[key],
    });
  });
  return list;
};
