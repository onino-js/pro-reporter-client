import { Report } from "../stores/report";
import { UiStore } from "../stores/ui.store";
import { ReportStore } from "../stores/report.store";
import { AuthStore } from "../stores/auth.store";
import { TemplateStore } from "../stores/templateStore";

export interface AllStores {
  uiStore: UiStore;
  reportStore : ReportStore;
  authStore : AuthStore
  templateStore : TemplateStore
}
