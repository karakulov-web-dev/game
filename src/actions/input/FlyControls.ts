import { ThunkAction } from "redux-thunk";
import { Istate } from "../../store/stateInteface";
import { AnyAction } from "redux";

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

export function keyDown(
  event: React.KeyboardEvent
): ThunkAction<void, Istate, any, any> {
  return (dispatch, getState) => {
    switch (event.keyCode) {
      case 16:
        {
          dispatch(
            MoveStateSmoothChange({
              forward: 0,
              back: 0,
              left: 0,
              right: 0,
              up: 0,
              down: 0
            })
          );
        }
        break;
      case 37:
        {
          dispatch(
            MoveStateSmoothChange({
              yawLeft: 1,
              yawRight: 0
            })
          );
        }
        break;
      case 39:
        {
          dispatch(
            MoveStateSmoothChange({
              yawLeft: 0,
              yawRight: 1
            })
          );
        }
        break;
      case 38:
        {
          dispatch(
            MoveStateSmoothChange({
              pitchUp: 1,
              pitchDown: 0
            })
          );
        }
        break;
      case 40:
        {
          dispatch(
            MoveStateSmoothChange({
              pitchUp: 0,
              pitchDown: 1
            })
          );
        }
        break;
      case 81:
        {
          dispatch(
            MoveStateSmoothChange({
              rollLeft: 1,
              rollRight: 0
            })
          );
        }
        break;
      case 69:
        {
          dispatch(
            MoveStateSmoothChange({
              rollLeft: 0,
              rollRight: 1
            })
          );
        }
        break;
      case 87:
        {
          let { forward } = getState().FlyControls.moveState;
          forward = forward + 0.05;
          if (forward > 1) {
            forward = 1;
          }
          dispatch(
            MoveStateSmoothChange({
              forward: forward,
              back: 0
            })
          );
        }
        break;
      case 83:
        {
          let { back } = getState().FlyControls.moveState;
          back = back + 0.05;
          if (back > 1) {
            back = 1;
          }
          dispatch(
            MoveStateSmoothChange({
              forward: 0,
              back: back
            })
          );
        }
        break;
      case 65:
        {
          let { left } = getState().FlyControls.moveState;
          left = left + 0.05;
          if (left > 1) {
            left = 1;
          }
          dispatch(
            MoveStateSmoothChange({
              right: 0,
              left: left
            })
          );
        }
        break;
      case 68:
        {
          let { right } = getState().FlyControls.moveState;
          right = right + 0.05;
          if (right > 1) {
            right = 1;
          }
          dispatch(
            MoveStateSmoothChange({
              right: right,
              left: 0
            })
          );
        }
        break;
      case 82:
        {
          let { up } = getState().FlyControls.moveState;
          up = up + 0.05;
          if (up > 1) {
            up = 1;
          }
          dispatch(
            MoveStateSmoothChange({
              up: up,
              down: 0
            })
          );
        }
        break;
      case 70:
        {
          let { down } = getState().FlyControls.moveState;
          down = down + 0.05;
          if (down > 1) {
            down = 1;
          }
          dispatch(
            MoveStateSmoothChange({
              down: down,
              up: 0
            })
          );
        }
        break;
    }
  };
}

export function keyUp(
  event: React.KeyboardEvent
): ThunkAction<void, Istate, any, any> {
  return (dispatch, getState) => {
    switch (event.keyCode) {
      case 81:
        {
          dispatch(
            MoveStateSmoothChange({
              rollLeft: 0
            })
          );
        }
        break;
      case 69:
        {
          dispatch(
            MoveStateSmoothChange({
              rollRight: 0
            })
          );
        }
        break;
      case 38:
        {
          dispatch(
            MoveStateSmoothChange({
              pitchUp: 0
            })
          );
        }
        break;
      case 40:
        {
          dispatch(
            MoveStateSmoothChange({
              pitchDown: 0
            })
          );
        }
        break;
      case 37:
        {
          dispatch(
            MoveStateSmoothChange({
              yawLeft: 0
            })
          );
        }
        break;
      case 39:
        {
          dispatch(
            MoveStateSmoothChange({
              yawRight: 0
            })
          );
        }
        break;
    }
  };
}

interface StateNumbers {
  [key: string]: number;
}

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
    clearInterval(this.processIntervalId);
    this.processIntervalId = setInterval(() => {
      this.iteration();
    }, 17);
  }
  private iteration() {
    let { moveState } = this.getState().FlyControls;
    this.sendMoveState = {};
    for (let key in this.targetMoveState) {
      this.sendMoveState[key] = this.calcMoveStateItem(
        this.targetMoveState[key],
        moveState[key]
      );
      if (this.targetMoveState[key] === this.sendMoveState[key]) {
        delete this.targetMoveState[key];
      }
      if (Object.keys(this.targetMoveState).length === 0) {
        clearInterval(this.processIntervalId);
      }
    }
    this.dispatch(MoveStateChange(this.sendMoveState));
  }
  private calcMoveStateItem(target, current) {
    var dif = target - current;
    if (Math.abs(dif) < 0.01) {
      return target;
    }
    if (dif > 0) {
      return current + 0.01;
    } else {
      return current - 0.01;
    }
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
