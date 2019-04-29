import { observable, action, toJS } from "mobx";
import { fabric } from "fabric";

export class CanvasStore {
  // Value

  // data
  @observable public id: string = "";
  @observable public canvas: any = null;
  @observable public canvasEl: HTMLCanvasElement | null = null;
  @observable public canvasBox: HTMLElement | null = null;
  @observable public resizeLoop: any = false;
  @observable public canvasHeight: any = false;
  @observable public canvasWidth: any = false;
  @observable public width: number = 0;
  @observable public height: number = 0;
  @observable public rotation: number = 90;

  constructor(options: any) {
    Object.assign(this, options);
  }

  @action.bound
  public initialize() {
    this.canvasEl = document.getElementById(this.id) as HTMLCanvasElement;
    this.canvasBox = document.getElementById("canvas-container" + this.id);
    this.canvas = new fabric.Canvas(this.id);
    this.canvas.isDrawingMode = true;
  }

  @action.bound
  public unmountCanvas() {
    this.canvas.removeListeners();
    this.stopResizeLoop();
    this.canvas.dispose();
  }

  @action.bound
  public getPng() {
    return this.canvas.toDataURL("image/png");
  }

  @action.bound
  public addImageToCanvas(dataUrl: string, callback: () => void) {
    fabric.Image.fromURL(dataUrl, (oImg: any) => {
      // oImg.scale(0.2);
      // oImg.rotate(90);
      this.styleControl(oImg);
      this.canvas.add(oImg);
      callback();
    });
  }

  @action.bound
  public resizeCanvas() {
    const canvasBox = document.getElementById(this.id)!.parentElement!
      .parentElement;
    const maxWidth = canvasBox!.offsetWidth;
    const maxHeight = canvasBox!.offsetHeight;

    const ratio1 = maxWidth / maxHeight;
    const ratio2 = this.width / this.height;
    const width = ratio1 <= ratio2 ? maxWidth : maxHeight * ratio2;
    const height = width / ratio2;
    this.canvas.setDimensions({
      width: width,
      height: height,
    });
  }

  @action.bound
  public startResizeLoop() {
    const test =
      this.canvasWidth !== this.canvasBox!.offsetWidth ||
      this.canvasHeight !== this.canvasBox!.offsetHeight;
    if (test) {
      this.resizeCanvas();
    }
    this.resizeLoop = window.setTimeout(this.startResizeLoop, 500);
  }

  @action.bound
  public stopResizeLoop() {
    if (this.resizeLoop) {
      window.clearTimeout(this.resizeLoop);
    }
  }

  @action.bound
  public clearCanvas() {
    this.canvas && this.canvas.clear();
  }

  @action.bound
  public styleControl(item: any) {
    item.cornerSize = 20;
    item.cornerColor = "#1890ff";
    item.cornerStrokeColor = "#1890ff";
    item.transparentCorners = false;
    item.cornerStyle = "circle";
    return item;
  }

  // @action.bound
  // public getData() {
  //   const res: any[] = [];
  //   if (!this.canvas.isEmpty()) {
  //     this.canvas.forEachObject((obj: any) => {
  //       // if (obj.excludeFromExport) return;
  //       res.push(obj.toJSON());
  //     });
  //   }
  //   return res;
  // }

  @action.bound
  public clearSelection() {
    this.canvas.discardActiveObject();
    this.canvas.renderAll();
  }
}
