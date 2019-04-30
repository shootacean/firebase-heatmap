class HeatmapClient {
  static isTracking: boolean = true;

  private static savePoint(type: string, pageX: number, pageY: number): void {
    const time = new Date().getTime();
    console.log(time, type, pageX, pageY);
    sessionStorage.setItem(`${type}.${time}`, JSON.stringify({x: pageX, y: pageY}));
  }

  static toggleTracking(): boolean {
    this.isTracking = !this.isTracking;
    return this.isTracking;
  }

  static trackMouseMove(pageX: number, pageY: number): void {
    if (!this.isTracking) {return;}
    this.savePoint('MouseMove', pageX, pageY);
  };

  static trackMouseUp(pageX: number, pageY: number): void {
    if (!this.isTracking) {return;}
    this.savePoint('MouseUp', pageX, pageY);
  };

  static trackScroll(pageX: number, pageY: number): void {
    if (!this.isTracking) {return;}
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
