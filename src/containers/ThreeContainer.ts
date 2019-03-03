import { connect, MapStateToProps } from "react-redux";
import { ThreeApp } from "../components/threeApp/ThreeApp";
import { Istate } from "../store/stateInteface";
import { Props } from "../components/threeApp/ThreeApp";

var mapState: MapStateToProps<Props, any, Istate> = function mapState(
  state
): Props {
  let { objectList } = state.three.scene;
  return {
    sceneObjectList: objectList
  };
};

export default connect(mapState)(ThreeApp);
