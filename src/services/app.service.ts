interface IcreateImageParams {
  path: string;
  width: number;
  height: number;
}

export const createImage = (opt: IcreateImageParams): string => {
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
