import { ThunkAction } from "redux-thunk";
import { Istate } from "../../store/stateInteface";
import {
  mouseDown as mouseDownFlyControls,
  mouseMove as mouseMoveFlyControls
} from "./FlyControls";

export function mouseDown(
  event: React.MouseEvent
): ThunkAction<void, Istate, any, any> {
  return function(dispatch, getState) {
    let {
      App: {
        input: { type }
      }
    } = getState();

    switch (type) {
      case "FlyControls":
        dispatch(mouseDownFlyControls(event));
        break;
    }
  };
}

export function mouseMove(
  event: React.MouseEvent
): ThunkAction<void, Istate, any, any> {
  return (dispatch, getState) => {
    let {
      App: {
        input: { type }
      }
    } = getState();

    switch (type) {
      case "FlyControls":
        dispatch(mouseMoveFlyControls(event));
        break;
    }
  };
}
