const URL = "https://api.cloudconvert.com/v1/process/";
// const DEV_URL = "https://onino-conect.herokuapp.com/";
const URL2 = "https://api.cloudconvert.com/v1/convert/";

const token =
  "vTGhiGhZa06hOMrTksPBlywkmjxnJQUFPg4ldMT1GnUF4AC2IfXuo53iuflwSceT";
let processId: string = "";

export const startConvertion = (file: any) => {
  return fetch(URL2, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input: "raw",
      file: file,
      mode: "combine",
      // files: [file, file],
      filename: "test.svg",
      inputformat: "svg",
      // wait: "true",
      // download: "true",
      outputformat: "pdf",
      converteroptions: {
        audio_bitrate: 128,
        audio_normalize: "+20db",
      },
    }),
  })
    .then(response => {
      return response.json().then(data => {
        console.log("convert sucess");
        console.log(data);
        return data;
      });
    })
    .catch(function(err) {
      console.log(err);
      return new Error("connexion problem");
    });
};

export const createProcess = () => {
  return fetch(URL, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      inputformat: "svg",
      outputformat: "pdf",
    }),
  })
    .then(response => {
      return response.json().then(data => {
        console.log("success");
        console.log(data);
        processId = data.id;
        return data;
      });
    })
    .catch(function() {
      console.log("error");
      return new Error("connexion problem");
    });
};
