import { SceneObject } from "../../../store/stateInteface";
import * as THREE from "three";

export class ObjectDriver {
  private objectMap: Map<string, ObjectSceneConstructor>;
  constructor(private scene: THREE.Scene) {
    this.objectMap = new Map();
  }
  public create(object: SceneObject) {
    switch (object.type) {
      case "Planet":
        {
          let threeObj = new Planet(this.scene, object);
          this.objectMap.set(object.id, threeObj);
          threeObj.create();
        }
        break;
    }
  }
  public update(object: SceneObject) {
    if (this.objectMap.has(object.id)) {
      this.objectMap.get(object.id).update(object);
    }
  }

  public remove(object: SceneObject) {
    if (this.objectMap.has(object.id)) {
      this.objectMap.get(object.id).remove();
    }
    this.objectMap.delete(object.id);
  }
}

interface ObjectSceneConstructor {
  create(): void;
  update(object: SceneObject): void;
  remove(): void;
}

class Planet implements ObjectSceneConstructor {
  constructor(private scene: THREE.Scene, private object: SceneObject) {
    if (typeof this.object.state.size !== "undefined") {
      this.size = this.object.state.size;
    } else {
      this.size = 0.001;
    }
    if (typeof this.object.state.position !== "undefined") {
      this.position = this.object.state.position;
    } else {
      this.position = {
        x: 0,
        y: 0,
        z: 0
      };
    }
  }
  public create(): void {
    this.mesh = new THREE.Mesh(
      new THREE.SphereBufferGeometry(0.001, 16, 8),
      new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
    );
    this.mesh.position.z = 0.01;
    this.scene.add(this.mesh);
  }
  public update(object: SceneObject): void {
    if (typeof object.state.position === "undefined") {
      return;
    }
    let equal =
      this.mesh.position.x === object.state.position.x &&
      this.mesh.position.y === object.state.position.y &&
      this.mesh.position.z === object.state.position.z;
    if (!equal) {
      this.mesh.position.x = object.state.position.x;
      this.mesh.position.y = object.state.position.y;
      this.mesh.position.z = object.state.position.z;
    }
  }
  public remove(): void {
    this.scene.remove(this.mesh);
  }
  private size: number;
  private position: { x: number; y: number; z: number };
  private mesh: THREE.Mesh;
}
