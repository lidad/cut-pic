import React, { Component } from 'react';
import { connect } from 'mickey';
import { CANVAS_HEIGHT, CANVAS_WIDTH, CUT_IFRAME_WIDTH } from '../constant';


@connect(store => ({
  size: store.picture.size,
}))
export default class CutIframe extends Component {
  drawFrame = () => {
    const { size } = this.props;
    const { width, height } = size;

    const x = ((CANVAS_WIDTH - width) / 2);
    const y = ((CANVAS_HEIGHT - height) / 2);

    return (<rect
      x={x}
      y={y}
      width={width}
      height={height}
      stroke="red"
      strokeWidth={CUT_IFRAME_WIDTH}
      fill="none"
    />);
  }

  render() {
    const { className } = this.props;

    return (<svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      version="1.1"
    >
      {this.drawFrame()}
    </svg>);
  }
}
