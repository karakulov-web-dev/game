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
}

export { RegisterReducerStart };
