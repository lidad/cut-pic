import React, { Component } from 'react';
import { connect, injectActions } from 'mickey';
import { CANVAS_HEIGHT, CANVAS_WIDTH, CUT_IFRAME_WIDTH } from '../constant';

@injectActions
@connect(store => ({
  size: store.picture.size,
  mouseDown: store.dnd.mouseDown,
}))
export default class CutIframe extends Component {
  componentDidMount() {
    this.svg.addEventListener('mousemove', this.mousemove);
    this.svg.addEventListener('mousedown', this.mouseDown);
  }

  mouseDown = ({ offsetX, offsetY }) => {
    const { actions, imageProps } = this.props;
    const { src, positionDiff } = imageProps;
    const { diffX, diffY, tDiffX, tDiffY } = positionDiff;
    actions.picture.modifyFilePosition({
      src,
      positionDiff: {
        preX: offsetX,
        preY: offsetY,
        tDiffX: 0,
        tDiffY: 0,
        diffX: tDiffX + diffX,
        diffY: tDiffY + diffY,
      },
    });
  }

  mousemove = ({ offsetX, offsetY }) => {
    const { mouseDown, imageProps, actions } = this.props;

    if (mouseDown) {
      const { positionDiff, src } = imageProps;
      const { preX, preY, diffX, diffY } = positionDiff;

      actions.picture.modifyFilePosition({
        src,
        positionDiff: {
          preX,
          preY,
          diffX,
          diffY,
          tDiffX: (offsetX - preX),
          tDiffY: (offsetY - preY),
        },
      });
    }
  }

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
      ref={s => this.svg = s}
    >
      {this.drawFrame()}
    </svg>);
  }
}
