export interface Istate {
  App: {
    route: string;
    input: {
      type: string;
    };
  };
  three: {
    scene: Scene;
  };
  FlyControls: {
    manualControl: boolean;
    speed: {
      movementSpeed: number;
      rollSpeed: number;
    };
    moveState: {
      down: number;
      up: number;
      forward: number;
      back: number;
      left: number;
      right: number;
      pitchDown: number;
      pitchUp: number;
      rollLeft: number;
      rollRight: number;
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
