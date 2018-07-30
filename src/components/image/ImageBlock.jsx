import React, { Component } from 'react';
import { Card, Slider } from 'antd';
import { injectActions } from 'mickey';
import ImageCanvas from './ImageCanvas';
import style from './index.less';
import { MAX_IMAGE_SIZE, MIN_IMAGE_SIZE } from '../constant';
import CutIframe from './CutFrame';

const { Meta } = Card;

@injectActions
export default class ImageBlock extends Component {
  state = {
    size: MAX_IMAGE_SIZE,
  }

  changeSize = (size) => {
    this.setState({ size });
  }

  removeImage = () => {
    const { imageProps, actions } = this.props;
    const { src } = imageProps;

    actions.picture.removeFile({ src });
  }

  renderCanvas = () => {
    const { size } = this.state;
    const { imageProps } = this.props;

    return (<div className={style.cardCover}>
      <ImageCanvas imageProps={imageProps} rate={size / MAX_IMAGE_SIZE} />
      <CutIframe className={style.cutIframe} imageProps={imageProps} />
    </div>);
  }

  render() {
    const { size } = this.state;
    const { imageProps } = this.props;
    const { name } = imageProps;

    return (<Card
      hoverable
      className={style.image}
      bodyStyle={{ borderTop: '1px solid #e8e8e8' }}
      cover={this.renderCanvas()}
    >
      <Meta
        title={<p className={style.name}>{name}
          <a className={style.remove} onClick={this.removeImage}>移除</a>
        </p>}
      />
      <Slider
        max={MAX_IMAGE_SIZE * 2}
        min={MIN_IMAGE_SIZE}
        onChange={this.changeSize}
        value={size}
      />
    </Card>);
  }
}
