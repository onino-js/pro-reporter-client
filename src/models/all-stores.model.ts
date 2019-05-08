import { UiStore } from "../stores/ui.store";
import { ReportStore } from "../stores/report.store";
import { AuthStore } from "../stores/auth.store";
import { TemplateStore } from "../stores/templateStore";
import { FirebaseStore } from "../stores/firebaseStore";
import { ArchiveStore } from "../stores/archive.store";

export interface AllStores {
  uiStore: UiStore;
  reportStore : ReportStore;
  authStore : AuthStore
  templateStore : TemplateStore
  firebaseStore : FirebaseStore
  archiveStore : ArchiveStore
}
