import { Istate } from "../store/stateInteface";
import { AnyAction } from "redux";
import { RegisterReducerStart } from "./RegisterReducerStart";

interface ReducerFunction {
  (state: Istate, action: AnyAction): Istate;
}
interface ObjReducersList {
  [key: string]: ReducerFunction;
}

let ReducersList: ObjReducersList = {};

function registerReducer(key: string, func: ReducerFunction) {
  if (typeof ReducersList[key] !== "undefined") {
    throw new Error(`ReducerFunction ${key} already exists`);
  }
  ReducersList[key] = func;
}
RegisterReducerStart();

export { ReducersList, registerReducer };
