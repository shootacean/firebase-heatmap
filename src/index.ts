class HeatmapClient {
  static isTracking: boolean = true;

  private static savePoint(type: string, pageX: number, pageY: number): void {
    const time = new Date().getTime();
    console.log(time, type, pageX, pageY);
    sessionStorage.setItem(`${time}`, JSON.stringify({type: type, x: pageX, y: pageY}));
  }

  static toggleTracking(): boolean {
    this.isTracking = !this.isTracking;
    return this.isTracking;
  }

  static trackMouseMove(pageX: number, pageY: number): void {
    if (!this.isTracking) {
      return;
    }
    this.savePoint('MouseMove', pageX, pageY);
  };

  static trackMouseUp(pageX: number, pageY: number): void {
    if (!this.isTracking) {
      return;
    }
    this.savePoint('MouseUp', pageX, pageY);
  };

  static trackScroll(pageX: number, pageY: number): void {
    if (!this.isTracking) {
      return;
    }
    this.savePoint('Scroll', pageX, pageY);
  };
}

const trackingButton: HTMLElement = document.getElementById("toggleTrackingButton")!;
trackingButton!.addEventListener("click", () => {
  if (HeatmapClient.toggleTracking()) {
    trackingButton.innerText = "Stop Tracking";
  } else {
    trackingButton.innerText = "Start Tracking";
  }
});

document.onmousemove = (e: MouseEvent) => {
  HeatmapClient.trackMouseMove(e.pageX, e.pageY);
};

document.onmouseup = (e: MouseEvent) => {
  HeatmapClient.trackMouseUp(e.pageX, e.pageY);
};

document.onwheel = (e: WheelEvent) => {
  HeatmapClient.trackScroll(e.pageX, e.pageY);
};
//
// class Heatmap {
//   static isShowHeatmap: boolean = false;
//
//   static toggleHeatmap(): boolean {
//     this.isShowHeatmap = !this.isShowHeatmap;
//     return this.isShowHeatmap;
//   }
//
//   static draw(canvas: HTMLCanvasElement | null): void {
//     if (!canvas) {
//       return;
//     }
//     console.log(Object.keys(sessionStorage));
//   }
// }
//
// const heatmap: HTMLElement = document.getElementById("heatmap")!;
// const heatmapButton: HTMLElement = document.getElementById("toggleHeatmapButton")!;
// heatmapButton!.addEventListener("click", () => {
//   if (Heatmap.toggleHeatmap()) {
//     heatmap.style.display = "";
//     heatmapButton.innerText = "Hide Heatmap";
//     Heatmap.draw(document.getElementById('heatmap') as HTMLCanvasElement);
//   } else {
//     heatmap.style.display = "none";
//     heatmapButton.innerText = "Show Heatmap";
//   }
// });
