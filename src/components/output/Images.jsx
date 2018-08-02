import React, { Component } from 'react';
import { injectActions, connect } from 'mickey';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../constant';
import { delayPromise } from '../common';

const ts = [];

@injectActions
@connect(store => ({
  ...store.picture,
}))
export default class Images extends Component {
  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');
  }

  async componentWillReceiveProps({ output, images }) {
    if (output && output !== this.props.output) {
      await Promise.all(images.map(image => this.drawImg(image)));
    }
  }

  componentWillUnmount() {
    ts.map(t => clearTimeout(t));
  }

  async drawImg(imageProps) {
    const { size } = this.props;
    const { src, positionDiff, rate } = imageProps;
    const { diffX, diffY, tDiffX, tDiffY } = positionDiff;
    const image = new Image();

    image.src = src;
    image.onload = () => {
      const { width, height } = image;
      const imageToOriCanvasRate = Math.min(CANVAS_WIDTH / width, CANVAS_HEIGHT / height);
      const oriWidth = imageToOriCanvasRate * width;
      const oriHeight = imageToOriCanvasRate * height;

      this.ctx.clearRect(0, 0, this.canvas.height, this.canvas.width);
      this.ctx.drawImage(image,
        (rate * (diffX + tDiffX)) - ((CANVAS_WIDTH - size.width) / 2),
        (rate * (diffY + tDiffY)) - ((CANVAS_HEIGHT - size.height) / 2),
        rate * oriWidth,
        rate * oriHeight,
      );
    };
    const iUrl = this.canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');

    window.location.href = iUrl;
    await delayPromise(2000);
  }

  render() {
    const { size } = this.props;
    const { width, height } = size;

    return (<canvas
      width={width}
      height={height}
      ref={c => this.canvas = c}
    />);
  }
}
