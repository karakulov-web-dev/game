import * as THREE from "three";
import { SceneObject, ObjectList } from "../../../store/stateInteface";
import { ObjectDriver } from "./ObjectDriver";

//// тех задание на метод update()
// создадим IdHashMap для старого и нового списка
//  итерируем старый список
//    удаляем обьеты которых нет в новом списке
//  итерируем новый список
//    если элемент есть в старом списке обновляем его
//    иначе просто создаем новый
//  сохранить новый список обьектов

interface IdHashMap {
  [id: string]: boolean;
}

export class SceneObjectManager {
  private previusSceneObjectList: SceneObject[];
  private objectDriver: ObjectDriver;

  constructor(private scene: THREE.Scene) {
    this.previusSceneObjectList = [];
    this.objectDriver = new ObjectDriver(this.scene);
  }

  update(sceneObject: ObjectList): void {
    let sceneObjectList: SceneObject[] = Object.values(sceneObject);
    let _previusSceneObjectsIdHashMap: IdHashMap = this.createIdHashMap(
      this.previusSceneObjectList
    );
    let _sceneObjectsIdHashMap: IdHashMap = this.createIdHashMap(
      sceneObjectList
    );

    this.previusSceneObjectList.forEach(obj => {
      if (!this.objectIdInIdHashMap(_sceneObjectsIdHashMap, obj)) {
        this.removeOutdateObject(obj);
      }
    });

    sceneObjectList.forEach(obj => {
      if (this.objectIdInIdHashMap(_previusSceneObjectsIdHashMap, obj)) {
        this.updateObject(obj);
      } else {
        this.createSceneObject(obj);
      }
    });
    this.previusSceneObjectList = [...sceneObjectList];
  }

  private createIdHashMap(list: SceneObject[]): IdHashMap {
    let hash: IdHashMap = {};
    list.forEach(item => {
      hash[item.id] = true;
    });
    return hash;
  }
  private removeOutdateObject(obj: SceneObject): void {
    this.objectDriver.remove(obj);
  }
  private updateObject(obj: SceneObject): void {
    this.objectDriver.update(obj);
  }
  private createSceneObject(obj: SceneObject): void {
    this.objectDriver.create(obj);
  }
  private objectIdInIdHashMap(
    hashMap: IdHashMap,
    object: SceneObject
  ): boolean {
    return typeof hashMap[object.id] !== "undefined";
  }
}
