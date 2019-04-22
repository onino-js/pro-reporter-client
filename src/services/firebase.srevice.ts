import { Itemplate, IreportObj } from "./../models/template.model";
import * as firebase from "firebase/app";
import firebaseui from "firebaseui";

const config = {
  apiKey: "AIzaSyBDHfw2EEgmWWIE7V7lPgpPLScx8C3lnVo",
  authDomain: "gham-f07f7.firebaseapp.com",
  databaseURL: "https://gham-f07f7.firebaseio.com",
  projectId: "gham-f07f7",
  storageBucket: "gham-f07f7.appspot.com",
  messagingSenderId: "1065942140105",
};

let database: any;
let ui: any;

export const initializeDataBase = () => {
  // firebase.initializeApp(config);
  database = firebase.database();
};

export const saveReport = (doc: any, callback?: any) => {
  database.ref(`reports/${doc.reference}/${doc.id}`).set(doc, (e: any) => {
    if (callback) {
      callback(e);
    }
  });
};

export const updateReport = ({ userId, reportId, doc, callback }: any) => {
  database.ref(`users/${userId}/${reportId}/inputs`).update(doc, (e: any) => {
    if (callback) {
      callback(e);
    }
  });
};

export const deleteReport = (
  userId: string,
  reportId: string,
  callback?: (e: any) => void,
) => {
  database.ref(`users/${userId}/reports/${reportId}`).remove((e: any) => {
    callback && callback(e);
  });
};

export const getReportsList = (callback?: (e: any) => void) => {
  const reports = database.ref("projects/");
  reports.on("value", function(res: any) {
    callback && callback(res.val());
  });
};

export const getTemplates = (callback: any) => {
  const reports = database.ref("templates/");
  reports.on("value", function(res: any) {
    res && res.val && callback(res.val());
  });
};

export const createTemplate = (template: Itemplate, callback?: any) => {
  const ref = database.ref(`templates/${template.id}`);
  ref.set(template, function(res: any, err: any) {
    console.log(res);
    console.log(err);
  });
};

export const checkTemplateId = async (id: string) => {
  const snapshot = await database.ref(`templates/${id}`).once("value");
  if (snapshot.exists()) {
    return true;
  } else return false;
};

export const getReportList = (callback: any) => {
  const reports = database.ref(`reports/`);
  reports.on("value", function(res: any) {
    callback(res.val());
  });
};

export const getReports = (userId: string, callback: any) => {
  const reports = database.ref(`users/${userId}/reports/`);
  reports.on("value", function(res: any) {
    callback(res.val());
  });
};

export const deleteAllActiveReports = (userId: string, callback?: any) => {
  database.ref(`users/${userId}/reports/`).remove((e: any) => {
    callback && callback(e);
  });
};

interface IcreateReportParams {
  userId: string;
  report: IreportObj;
  callback?: (e: any) => void;
}

export const createReport = ({
  userId,
  report,
  callback,
}: IcreateReportParams) => {
  const ref = database.ref(`users/${userId}/reports/${report.id}/`);
  ref.set(report, (e: any) => {
    callback && callback(e);
  });
};

// // FirebaseUI config.
// const uiConfig = {
//   callbacks: {
//     signInSuccessWithAuthResult: function(authResult: any, redirectUrl: any) {
//       // User successfully signed in.
//       // Return type determines whether we continue the redirect automatically
//       // or whether we leave that to developer to handle.
//       return false;
//     },
//     uiShown: function() {
//       // The widget is rendered.
//       // Hide the loader.
//       // document.getElementById("loader")!.style.display = "none";
//       console.log("shown");
//     },
//   },
//   // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
//   signInFlow: "popup",
//   credentialHelper: firebaseui.auth.CredentialHelper.NONE,
//   signInSuccessUrl: "/",
//   signInOptions: [
//     {
//       provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
//       signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
//     },
//     // Leave the lines as is for the providers you want to offer your users.
//     // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
//     // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
//     // firebase.auth.GithubAuthProvider.PROVIDER_ID,
//     // firebase.auth.EmailAuthProvider.PROVIDER_ID,
//     // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
//     // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
//   ],
//   // tosUrl and privacyPolicyUrl accept either url string or a callback
//   // function.
//   // Terms of service url/callback.
//   tosUrl: "<your-tos-url>",
//   // Privacy policy url/callback.
//   privacyPolicyUrl: function() {
//     window.location.assign("<your-privacy-policy-url>");
//   },
// };

// export const initializeAuth = () => {
//   ui = new firebaseui.auth.AuthUI(firebase.auth());
// };

// export const startAuth = () => {
//   // if (ui.isPendingRedirect()) {
//   //   console.log("user", firebase.auth().currentUser);
//   //   ui.start("#firebaseui-auth-container", uiConfig);
//   // }
//   ui.start("#firebaseui-auth-container", uiConfig);
// };

// export const startAuthListener = function(
//   signIn: (a: any) => void,
//   signOut: () => void,
// ) {
//   firebase.auth().onAuthStateChanged(
//     function(user) {
//       if (user) {
//         // User is signed in.
//         const displayName = user.displayName;
//         const email = user.email;
//         const emailVerified = user.emailVerified;
//         const photoURL = user.photoURL;
//         const uid = user.uid;
//         const phoneNumber = user.phoneNumber;
//         const providerData = user.providerData;
//         user.getIdToken().then(function(accessToken) {
//           signIn({
//             displayName: displayName,
//             email: email,
//             emailVerified: emailVerified,
//             phoneNumber: phoneNumber,
//             photoURL: photoURL,
//             uid: uid,
//             accessToken: accessToken,
//             providerData: providerData,
//           });
//         });
//       } else {
//         console.log("signout");
//         signOut();
//       }
//     },
//     function(error) {
//       console.log(error);
//     },
//   );
// };

// export const signOut = () => {
//   firebase.auth().signOut();
//   // .then(
//   //   function() {
//   //     console.log("starting ui");
//   //    // ui.start("#firebaseui-auth-container", uiConfig);
//   //   },
//   //   function(error) {
//   //     console.error("Sign Out Error", error);
//   //   },
//   // );
// };
