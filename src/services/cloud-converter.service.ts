const CREATE_URL = "https://api.cloudconvert.com/v1/process/";
const START_URL = "https://srv01.cloudconvert.com/process/";
const DEV_URL = "http://localhost:8080/convert";
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

      // input: "base64",
      files: [
        { filename: "1.svg", file: file },
        { filename: "2.svg", file: file },
      ],
      mode: "combine",
      // filename: "test.svg",
      inputformat: "svg",
      // wait: "true",
      download: "inline",
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

export const createProcess = async () => {
  return fetch(DEV_URL, {
    method: "post",
    headers: {
      // Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    mode: "no-cors",
    body: JSON.stringify({
      inputformat: "svg",
      outputformat: "pdf",
    }),
  })
    .then(response => {
      return response.json().then(data => {
        console.log("success");
        console.log(data);
        return data;
      });
    })
    .catch(function() {
      console.log("error");
      return new Error("connexion problem");
    });
};

// export const createProcess = async () => {
//   return fetch(CREATE_URL, {
//     method: "post",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       inputformat: "svg",
//       outputformat: "pdf",
//     }),
//   })
//     .then(response => {
//       return response.json().then(data => {
//         console.log("success");
//         console.log(data);
//         processId = data.id;
//         return data;
//       });
//     })
//     .catch(function() {
//       console.log("error");
//       return new Error("connexion problem");
//     });
// };

export const startProcess = async (url: string, file: any) => {
  return fetch(url, {
    method: "post",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "*",
    },
    body: JSON.stringify({
      input: "raw",
      file: file,
      filename: "test.svg",
      inputformat: "svg",
      // download: "inline",
      outputformat: "pdf",
      converteroptions: {
        audio_bitrate: 128,
        audio_normalize: "+20db",
      },
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
