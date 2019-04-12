import { EditorStore } from "./../stores/editor.store";
import { UiStore } from "../stores/ui.store";
import { ReportStore } from "../stores/report.store";

export interface AllStores {
  uiStore: UiStore;
  editorStore: EditorStore;
  reportStore : ReportStore
}
