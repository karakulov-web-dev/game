import * as THREE from "three";
import { m } from "../const";
import { store } from "../store/store";

declare const FlyControls: Controls;

interface Controls {
  new (camera: THREE.PerspectiveCamera, un: any, THREE: any): Controls;
  update(delte: number): void;
  movementSpeed: number;
  rollSpeed: number;
  autoForward: boolean;
  dragToLook: boolean;
}

export class ControlManager {
  private clock: THREE.Clock;
  controls: Controls;
  constructor(private camera: THREE.PerspectiveCamera) {
    this.controls = new FlyControlsManualControl(this.camera);
    window["control"] = this.controls; // development
    this.clock = new THREE.Clock(true);
  }
  update() {
    this.controls.update(this.clock.getDelta());
  }
}

class FlyControlsManualControl extends FlyControls implements Controls {
  constructor(camera: THREE.PerspectiveCamera) {
    super(camera, undefined, THREE);
    let { movementSpeed, rollSpeed } = this.speed;
    this.movementSpeed = movementSpeed;
    this.rollSpeed = rollSpeed;
    this.autoForward = false;
    this.dragToLook = false;
  }
  get speed() {
    return store.getState().user.speed;
  }
  update(delta: number) {
    super.update(delta);
  }
}
