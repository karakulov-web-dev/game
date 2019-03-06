import React, { Component } from "react";

export interface PropsState {
  inputType: string;
}
export interface PropsDispatch {
  mouseDown(event: React.MouseEvent): void;
  mouseMove(event: React.MouseEvent): void;
  keyDown(event: React.KeyboardEvent): void;
  keyUp(event: React.KeyboardEvent): void;
}
type Props = PropsState & PropsDispatch;

export class InterfaceOverlay extends Component<Props> {
  private ref: any;
  constructor(props: Props) {
    super(props);
    this.ref = React.createRef();
  }
  render() {
    return (
      <div
        style={style}
        onMouseDown={this.props.mouseDown}
        onMouseMove={this.props.mouseMove}
        onKeyDown={this.props.keyDown}
        onKeyUp={this.props.keyUp}
        tabIndex={0}
        ref={this.ref}
      />
    );
  }
  componentDidMount() {
    this.ref.current.focus();
  }
}

let style: React.CSSProperties = {
  position: "absolute",
  top: "0px",
  right: "0px",
  left: "0px",
  bottom: "0px"
};
