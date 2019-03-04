import * as THREE from "three";
import { Camera } from "three";

declare const FlyControls: any;

export class ControlManager {
  private clock: THREE.Clock;
  controls: any;
  constructor(camera: THREE.PerspectiveCamera) {
    this.controls = new FlyControls(camera, undefined, THREE);
    window["control"] = this.controls; // development
    this.controls.movementSpeed = 0;
    this.controls.rollSpeed = 0.5;
    this.controls.autoForward = false;
    this.controls.dragToLook = false;
    this.clock = new THREE.Clock(true);
  }
  update() {
    this.controls.update(this.clock.getDelta());
  }
}
