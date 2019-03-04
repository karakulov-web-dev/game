export interface Istate {
  App: {
    route: string;
  };
  three: {
    input: {
      type: string;
    };
    scene: Scene;
  };
  FlyControlsManualControl: {
    speed: {
      movementSpeed: number;
      rollSpeed: number;
    };
    moveState: {
      back: number;
      down: number;
      forward: number;
      left: number;
      pitchDown: number;
      pitchUp: number;
      right: number;
      rollLeft: number;
      rollRight: number;
      up: number;
      yawLeft: number;
      yawRight: number;
    };
  };
}

interface Vector {
  x: number;
  y: number;
  z: number;
}

export interface SceneObject {
  type: string;
  id: string;
  state: any;
}
export interface ObjectList {
  [id: string]: SceneObject;
}
interface Scene {
  objectList: ObjectList;
}
