import { registerReducer } from "./ReducersList";

function RegisterReducerStart() {
  registerReducer("@@redux/INITg.g.k.p.p.h", function(state) {
    console.log("redux init");
    return state;
  });

  registerReducer("addSceneObject", function(state, action) {
    let { three } = state;
    let { payload } = action;
    three.scene.objectList[payload.id] = payload;
    return { ...state, three };
  });

  registerReducer("deleteSceneObject", function(state, action) {
    let { three } = state;
    let { payload } = action;
    delete three.scene.objectList[payload.id];
    return { ...state, three };
  });

  registerReducer("switchManualControl", function(state) {
    let { FlyControls } = state;
    FlyControls.manualControl = FlyControls.manualControl ? false : true;
    return { ...state, FlyControls };
  });

  registerReducer("FlyControlsMoveStateChange", function(state, action) {
    let { payload } = action;
    let { FlyControls } = state;
    let { moveState } = FlyControls;
    FlyControls.moveState = Object.assign(moveState, payload);
    return { ...state, FlyControls };
  });
}

export { RegisterReducerStart };
