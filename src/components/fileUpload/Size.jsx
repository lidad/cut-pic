import React, { Component } from 'react';
import { injectActions, connect } from 'mickey';
import { InputNumber, Popover, Slider, Row, Col } from 'antd';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../constant';
import style from './index.less';

@injectActions
@connect(store => ({
  size: store.picture.size,
}))
export default class Size extends Component {
  render() {
    const { size, actions } = this.props;
    const { width, height } = size;
    const { changeSize } = actions.picture;

    return (<Popover
      placement="topRight"
      title="调整截取框尺寸"
      content={<div className={style.adjustSize}>
        <Row className={style.sizeItem}>
          <Col span={4}>
          高度：
          </Col>
          <Col span={12}>
            <Slider
              class={style.slider}
              onChange={h => changeSize({ height: h })}
              value={height}
              min={1}
              max={CANVAS_HEIGHT}
            />
          </Col>
          <Col span={8}>
            <InputNumber
              className={style.input}
              value={height}
              onChange={h => changeSize({ height: h })}
            />
          </Col>
        </Row>
        <Row className={style.sizeItem}>
          <Col span={4}>
          宽度：
          </Col>
          <Col span={12}>
            <Slider
              onChange={h => changeSize({ width: h })}
              value={width}
              min={1}
              max={CANVAS_WIDTH}
            />
          </Col>
          <Col span={8}>
            <InputNumber
              className={style.input}
              value={width}
              onChange={w => changeSize({ width: w })}
            />
          </Col>
        </Row>
      </div>}
    >
      <span className={style.sizeInfo}>截选框尺寸：高{height}px 宽{width}px</span>
    </Popover>);
  }
}
