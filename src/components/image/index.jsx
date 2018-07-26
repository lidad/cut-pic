import React, { Component } from 'react';
import { injectActions, connect } from 'mickey';
import ImageCanvas from './ImageCanvas';
import style from './index.less';

@injectActions
@connect(store => ({
  images: store.picture.images,
}))
export default class Image extends Component {
  render() {
    const { images } = this.props;
    return (<div className={style.image}>
      {images.map((({ src, name }) => <img key={src} src={src} alt={name} />))}
    </div>);
  }
}
