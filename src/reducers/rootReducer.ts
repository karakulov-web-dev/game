import { AnyAction } from "redux";
import { ReducersList } from "./ReducersList";
import { Istate } from "../store/stateInteface";
import { Reducer } from "react";

var rootReducer: Reducer<Istate, AnyAction> = function rootReducer(
  state,
  action
) {
  try {
    if (typeof ReducersList[action.type] === "undefined") {
      throw new Error(`action ${action.type} not found`);
    }
  } catch (e) {
    console.log(e);
    return state;
  }
  state = ReducersList[action.type](state, action);
  return state;
};
export { rootReducer };
