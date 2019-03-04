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
        },
        id2: {
          type: "Planet",
          id: "id2",
          state: {
            position: {
              x: 0.02,
              y: 0,
              z: 0.002
            }
          }
        },
        id3: {
          type: "Planet",
          id: "id3",
          state: {
            position: {
              x: 0,
              y: 0,
              z: 0.009522848185503046
            }
          }
        }
      }
    }
  },
  user: {
    speed: {
      movementSpeed: 0.009,
      rollSpeed: 0.5
    }
  }
};

export { state };
