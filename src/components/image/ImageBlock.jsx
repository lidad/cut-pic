import React, { Component } from 'react';
import { Card, Slider } from 'antd';
import { injectActions } from 'mickey';
import ImageCanvas from './ImageCanvas';
import style from './index.less';

const { Meta } = Card;
const MAX_SIZE = 100;
const MIN_SIZE = 1;

@injectActions
export default class ImageBlock extends Component {
  state = {
    size: MAX_SIZE,
  }

  changeSize = (size) => {
    this.setState({ size });
  }

  removeImage = () => {
    const { imageProps, actions } = this.props;
    const { src } = imageProps;

    actions.picture.removeFile({ src });
  }

  render() {
    const { size } = this.state;
    const { imageProps } = this.props;
    const { src, name } = imageProps;

    return (<Card
      hoverable
      className={style.image}
      bodyStyle={{ borderTop: '1px solid #e8e8e8' }}
      cover={<ImageCanvas src={src} rate={size / MAX_SIZE} />}
    >
      <Meta
        title={<p className={style.name}>{name}
          <a className={style.remove} onClick={this.removeImage}>移除</a>
        </p>}
      />
      <Slider max={MAX_SIZE * 2} min={MIN_SIZE} onChange={this.changeSize} value={size} />
    </Card>);
  }
}
