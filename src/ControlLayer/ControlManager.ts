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
  moveState: any;
  mousedown(event: any): void;
  domElement: any;
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
    let { movementSpeed, rollSpeed } = this.speedStore;
    this.moveState = this.moveStateStore;
    this.movementSpeed = movementSpeed;
    this.rollSpeed = rollSpeed;
    this.autoForward = false;
    this.dragToLook = false;

    this.update = function(delta) {
      this.moveState = this.moveStateStore;
      let { movementSpeed, rollSpeed } = this.speedStore;
      this.movementSpeed = movementSpeed;
      this.rollSpeed = rollSpeed;

      var moveMult = delta * this.movementSpeed;
      var rotMult = delta * this.rollSpeed;
      this.object.translateX(this.moveVector.x * moveMult);
      this.object.translateY(this.moveVector.y * moveMult);
      this.object.translateZ(this.moveVector.z * moveMult);
      this.tmpQuaternion
        .set(
          this.rotationVector.x * rotMult,
          this.rotationVector.y * rotMult,
          this.rotationVector.z * rotMult,
          1
        )
        .normalize();
      this.object.quaternion.multiply(this.tmpQuaternion);
      this.object.rotation.setFromQuaternion(
        this.object.quaternion,
        this.object.rotation.order
      );
      this.updateMovementVector();
    };

    this.mousedown = function(event) {
      if (this.domElement !== document) {
        this.domElement.focus();
      }
      event.preventDefault();
      event.stopPropagation();
      if (this.dragToLook) {
        this.mouseStatus++;
      } else {
        switch (event.button) {
          case 0:
            // attack
            break;
          case 2:
            (() => {
              if (store.getState().FlyControlsManualControl.speed.rollSpeed) {
                store.getState().FlyControlsManualControl.speed.rollSpeed = 0;
              } else {
                store.getState().FlyControlsManualControl.speed.rollSpeed = 0.5;
              }
            })();
            break;
        }
        this.updateMovementVector();
      }
    };

    this.domElement.addEventListener(
      "mousedown",
      bind(this, this.mousedown),
      false
    );
  }
  get speedStore() {
    return store.getState().FlyControlsManualControl.speed;
  }
  get moveStateStore() {
    return store.getState().FlyControlsManualControl.moveState;
  }
}

function bind(scope, fn) {
  return function() {
    fn.apply(scope, arguments);
  };
}
