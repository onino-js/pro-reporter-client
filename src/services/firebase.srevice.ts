import * as firebase from "firebase";
import firebaseui from "firebaseui";
import "firebase/database";

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
  firebase.initializeApp(config);
  database = firebase.database();
};

export const saveReport = (doc: any, callback?: any) => {
  database.ref(`reports/${doc.reference}/${doc.id}`).set(doc, (e: any) => {
    if (callback) {
      callback(e);
    }
  });
};

export const updateReport = (id: string, doc: any, callback?: any) => {
  database.ref(`reports/${id}`).update(doc, (e: any) => {
    if (callback) {
      callback(e);
    }
  });
};

export const deleteReport = (id: string, callback: any) => {
  database.ref(`reports/${id}`).remove((e: any) => {
    callback(e);
  });
};

export const getReportsList = (callback: any) => {
  var reports = database.ref("projects/");
  reports.on("value", function(res: any) {
    callback(res.val());
  });
};

export const getReportList = (callback: any) => {
  var reports = database.ref(`reports/`);
  reports.on("value", function(res: any) {
    callback(res.val());
  });
};

export const createReport = (report: any, callback: any) => {
  const ref1 = database.ref(`reports/`).push();
  ref1.set(report, (e: any) => {
    callback(e);
  });
};

// FirebaseUI config.
var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult: any, redirectUrl: any) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return false;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      console.log("shown");
    },
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: "popup",
  signInSuccessUrl: "/",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  // tosUrl and privacyPolicyUrl accept either url string or a callback
  // function.
  // Terms of service url/callback.
  tosUrl: "<your-tos-url>",
  // Privacy policy url/callback.
  privacyPolicyUrl: function() {
    window.location.assign("<your-privacy-policy-url>");
  },
};

export const initializeAuth = () => {
  ui = new firebaseui.auth.AuthUI(firebase.auth());
};

export const startAuth = () => {
  ui.start("#firebaseui-auth-container", uiConfig);
};

export const startAuthListener = function(
  signIn: (a: any) => void,
  signOut: () => void,
) {
  firebase.auth().onAuthStateChanged(
    function(user) {
      console.log("onAuthStateChanged");
      console.log(user);
      if (user) {
        // User is signed in.
        const displayName = user.displayName;
        const email = user.email;
        const emailVerified = user.emailVerified;
        const photoURL = user.photoURL;
        const uid = user.uid;
        const phoneNumber = user.phoneNumber;
        const providerData = user.providerData;
        user.getIdToken().then(function(accessToken) {
          signIn({
            displayName: displayName,
            email: email,
            emailVerified: emailVerified,
            phoneNumber: phoneNumber,
            photoURL: photoURL,
            uid: uid,
            accessToken: accessToken,
            providerData: providerData,
          });
        });
      } else {
        signOut();
      }
    },
    function(error) {
      console.log(error);
    },
  );
};

export const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then(
      function() {
        ui.start("#firebaseui-auth-container", uiConfig);
      },
      function(error) {
        console.error("Sign Out Error", error);
      },
    );
};
