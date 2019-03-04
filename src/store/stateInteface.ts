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
