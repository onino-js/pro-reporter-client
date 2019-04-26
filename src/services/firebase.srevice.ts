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

interface IupdateReportListParams {
  userId: string;
  reports: IreportObj[];
  onUpdateOne: (id: string) => void;
  onUpdateAll: () => void;
  onError: () => void;
}

export const updateReportList = async ({
  userId,
  reports,
  onUpdateOne,
  onUpdateAll,
  onError,
}: IupdateReportListParams) => {
  for (const report of reports) {
    const ref = database.ref(`users/${userId}/ongoing/${report.id}`);
    await ref.update(report);
    onUpdateOne && onUpdateOne(report.id);
  }
  onUpdateAll && onUpdateAll();
};

export const deleteReport = (
  userId: string,
  reportId: string,
  callback?: (e: any) => void,
) => {
  database.ref(`users/${userId}/ongoing/${reportId}`).remove((e: any) => {
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
  const reports = database.ref(`users/${userId}/ongoing/`);
  reports.on("value", function(res: any) {
    callback(res.val());
  });
};

export const deleteAllActiveReports = (userId: string, callback?: any) => {
  database.ref(`users/${userId}/ongoing/`).remove((e: any) => {
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
  const ref = database.ref(`users/${userId}/ongoing/${report.id}/`);
  ref.set(report, (e: any) => {
    callback && callback(e);
  });
};
