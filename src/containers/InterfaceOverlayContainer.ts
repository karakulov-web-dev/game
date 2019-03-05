import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { InterfaceOverlay } from "../components/InterfaceOverlay/InterfaceOverlay";
import { Istate } from "../store/stateInteface";
import { PropsState } from "../components/InterfaceOverlay/InterfaceOverlay";
import { PropsDispatch } from "../components/InterfaceOverlay/InterfaceOverlay";
import { mouseDown, mouseMove } from "../actions/input/input";
import { Action, AnyAction } from "redux";

var mapState: MapStateToProps<PropsState, any, Istate> = function mapState(
  state
): PropsState {
  let { type } = state.App.input;
  return {
    inputType: type
  };
};

const mapDispatchToProps: MapDispatchToProps<
  PropsDispatch,
  never
> = dispatch => {
  return {
    mouseDown: event => dispatch<any>(mouseDown(event)),
    mouseMove: event => dispatch<any>(mouseMove(event))
  };
};

export default connect<PropsState, PropsDispatch>(
  mapState,
  mapDispatchToProps
)(InterfaceOverlay);
