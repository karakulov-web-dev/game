import { ThunkAction } from "redux-thunk";
import { Istate } from "../../store/stateInteface";
import { AnyAction } from "redux";
import { SelfGuidedGenerator, GeneratorCreater } from "../../utilites";

export function mouseDown(
  event: React.MouseEvent
): ThunkAction<void, Istate, any, any> {
  return function(dispatch, getState) {
    event.preventDefault();
    event.stopPropagation();
    switch (event.button) {
      case 0:
        // attack
        break;
      case 2:
        (() => {
          dispatch({ type: "switchManualControl" });
          dispatch(
            MoveStateSmoothChange({
              pitchDown: 0,
              pitchUp: 0,
              rollLeft: 0,
              rollRight: 0,
              yawLeft: 0,
              yawRight: 0
            })
          );
        })();
        break;
    }
  };
}

export function mouseMove(
  event: React.MouseEvent
): ThunkAction<void, Istate, any, any> {
  return (dispatch, getState) => {
    let { manualControl } = getState().FlyControls;
    if (manualControl) {
      return false;
    }
    var container = getWindowDimensions();
    var halfWidth = container.size[0] / 2;
    var halfHeight = container.size[1] / 2;
    let yawLeft = -(event.pageX - container.offset[0] - halfWidth) / halfWidth;
    let pitchDown =
      (event.pageY - container.offset[1] - halfHeight) / halfHeight;
    dispatch(MoveStateChange({ yawLeft, pitchDown }));
  };
}

interface StateNumbers {
  [key: string]: number;
}

let moveStateSmooth_generator = new SelfGuidedGenerator(
  function* MoveStateSmooth_generator(self) {
    yield;
    while (true) {
      console.log("yeld");
      yield;
    }
  }
);

interface GetState {
  (): Istate;
}

class MoveStateSmoothChanger {
  private static instance: MoveStateSmoothChanger;
  private targetMoveState: StateNumbers;
  private sendMoveState: StateNumbers;
  private processIsInProgress: boolean;
  private processIntervalId: any;
  constructor(private dispatch, private getState: GetState) {
    if (MoveStateSmoothChanger.instance) {
      return MoveStateSmoothChanger.instance;
    }
    this.processIsInProgress = false;
    this.targetMoveState = {};
    this.sendMoveState = {};
    MoveStateSmoothChanger.instance = this;
  }
  changeMoveState(payload: StateNumbers) {
    this.targetMoveState = Object.assign(this.targetMoveState, payload);
    this.startProccess();
  }
  private startProccess() {
    this.processIsInProgress = true;
    clearTimeout(this.processIntervalId);
    this.processIntervalId = setTimeout(() => {
      this.iteration();
    }, 1000);
  }
  private iteration() {
    let { moveState } = this.getState().FlyControls;
    this.sendMoveState = {};
    for (let key in this.targetMoveState) {
      this.sendMoveState[key] = this.calcMoveStateItem(
        this.targetMoveState[key],
        moveState[key]
      );
    }
    console.log(this.sendMoveState);
    this.dispatch(MoveStateChange(this.sendMoveState));
  }
  private calcMoveStateItem(target, current) {
    console.log(current, " : " + target);
    return 0.2;
  }
}

export function MoveStateSmoothChange(
  payload: StateNumbers
): ThunkAction<void, Istate, any, any> {
  return (dispatch, getState) => {
    let changer = new MoveStateSmoothChanger(dispatch, getState);
    changer.changeMoveState(payload);
  };
}

function MoveStateChange(payload): AnyAction {
  return {
    type: "FlyControlsMoveStateChange",
    payload
  };
}

function getWindowDimensions() {
  return {
    size: [window.innerWidth, window.innerHeight],
    offset: [0, 0]
  };
}
