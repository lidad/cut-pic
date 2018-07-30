import React from 'react';
import { Layout } from 'antd';
import FileUpload from './fileUpload';
import Image from './image';
import Preview from './preview';
import style from './index.less';

const { Header, Content } = Layout;

const Main = () => (
  <Layout className={style.main}>
    <Header className={style.header}>
      <FileUpload />
    </Header>
    <Content>
      <Image />
    </Content>
    <Preview />
  </Layout>
);

export default Main;
