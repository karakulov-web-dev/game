import React, { Component } from "react";
import * as THREE from "three";
import { SceneObjectManager } from "./ThreeEntities/SceneObjectsManager";
import { ObjectList } from "../../store/stateInteface";
import { ControlManager } from "../../ControlLayer/ControlManager";

export interface Props {
  sceneObjectList: ObjectList;
}

export class ThreeApp extends Component<Props> {
  private myRef: any;
  private SCREEN_WIDTH: number;
  private SCREEN_HEIGHT: number;
  private aspect: number;
  private scene: THREE.Scene;
  private cameraPerspective: THREE.PerspectiveCamera;
  private controls: ControlManager;
  private particles: THREE.Points;
  private renderer: THREE.WebGLRenderer;
  private sceneObjectManager: SceneObjectManager;
  constructor(props: Props) {
    super(props);
    this.myRef = React.createRef();
    this.SCREEN_WIDTH = window.innerWidth;
    this.SCREEN_HEIGHT = window.innerHeight;
    this.aspect = this.SCREEN_WIDTH / this.SCREEN_HEIGHT;
  }
  render() {
    return <div className="threeApp" ref={this.myRef} />;
  }
  componentDidMount() {
    this.init();
    this.animate();
  }

  init() {
    this.scene = new THREE.Scene();
    this.sceneObjectManager = new SceneObjectManager(this.scene);

    this.cameraPerspective = new THREE.PerspectiveCamera(
      50,
      this.aspect,
      0.0001,
      600000000
    );
    this.cameraPerspective.rotation.y = Math.PI;

    this.scene.add(this.cameraPerspective);

    this.controls = new ControlManager(this.cameraPerspective);

    //// stars
    var geometry = new THREE.BufferGeometry();
    var vertices = [];
    for (var i = 0; i < 10000; i++) {
      let MathTypeFix: any = THREE;
      MathTypeFix = MathTypeFix.Math;

      let p180 = MathTypeFix.randFloat(0, 180);
      let p360 = MathTypeFix.randFloat(0, 360);

      let x = 500000 * Math.sin(p180) * Math.cos(p360);
      let y = 500000 * Math.sin(p180) * Math.sin(p360);
      let z = 500000 * Math.cos(p180);

      vertices.push(x);
      vertices.push(y);
      vertices.push(z);
    }
    geometry.addAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    this.particles = new THREE.Points(
      geometry,
      new THREE.PointsMaterial({ color: 0x888888 })
    );
    this.scene.add(this.particles);
    //// stars

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
    this.myRef.current.appendChild(this.renderer.domElement);
    this.renderer.autoClear = false;
    window.addEventListener("resize", this.onWindowResize.bind(this), false);
  }

  //

  onWindowResize() {
    this.SCREEN_WIDTH = window.innerWidth;
    this.SCREEN_HEIGHT = window.innerHeight;
    this.aspect = this.SCREEN_WIDTH / this.SCREEN_HEIGHT;
    this.renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
    this.cameraPerspective.aspect = this.aspect;
    this.cameraPerspective.updateProjectionMatrix();
  }

  //

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.renderThreeApp();
  }

  renderThreeApp() {
    //this.particles.position.x = this.cameraPerspective.position.x;
    //this.particles.position.y = this.cameraPerspective.position.y;
    //this.particles.position.z = this.cameraPerspective.position.z;

    this.controls.update();
    this.renderer.clear();

    this.sceneObjectManager.update(this.props.sceneObjectList);

    this.renderer.setViewport(0, 0, this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
    this.renderer.render(this.scene, this.cameraPerspective);
  }
}
