import React, { Component } from "react";

export interface PropsState {
  inputType: string;
}
export interface PropsDispatch {
  mouseDown(event: React.MouseEvent): void;
  mouseMove(event: React.MouseEvent): void;
}
type Props = PropsState & PropsDispatch;

export class InterfaceOverlay extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <div
        style={style}
        onMouseDown={this.props.mouseDown}
        onMouseMove={this.props.mouseMove}
      />
    );
  }
}

let style: React.CSSProperties = {
  position: "absolute",
  top: "0px",
  right: "0px",
  left: "0px",
  bottom: "0px"
};
