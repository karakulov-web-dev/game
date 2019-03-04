import { Istate } from "./stateInteface";

let state: Istate = {
  App: {
    route: "/game"
  },
  three: {
    input: {
      type: "FlyControls"
    },
    scene: {
      objectList: {
        id1: {
          type: "Planet",
          id: "id1",
          state: {
            position: {
              x: 0.01,
              y: 0,
              z: 0.001
            }
          }
        }
      }
    }
  }
};

export { state };
