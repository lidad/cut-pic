import React, { Component } from 'react';
import { Modal } from 'antd';
import { injectActions, connect } from 'mickey';
import Images from './Images';

@injectActions
@connect(store => ({
  ...store.output,
}))
export default class Output extends Component {
  render() {
    const { visible, actions } = this.props;
    const { hideOutput } = actions.output;

    return (<Modal
      title="生成图片"
      visible={visible}
      onCancel={hideOutput}
      cancelText="关闭"
      bodyStyle={{ textAlign: 'center' }}
    >
      <Images output={visible} />
    </Modal>);
  }
}
