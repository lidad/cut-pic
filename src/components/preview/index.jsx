import React, { Component } from 'react';
import { Layout } from 'antd';
import { connect } from 'mickey';
import CutImg from './CutImg';
import style from './index.less';


const { Footer } = Layout;

@connect(store => ({
  images: store.picture.images,
}))
export default class Preview extends Component {
  render() {
    const { images } = this.props;

    return (!!images.length && <Footer className={style.footer}>
      <div className={style.images}>
        {images.map(image => <CutImg key={image.src} imageProps={image} />)}
      </div>
    </Footer>);
  }
}
