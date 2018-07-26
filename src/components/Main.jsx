import React from 'react';
import { Layout } from 'antd';
import FileUpload from './FileUpload';
import Image from './image';
import style from './index.less';

const { Header, Content } = Layout;

const Main = () => (
  <Layout>
    <Header className={style.header}>
      <FileUpload />
    </Header>
    <Content>
      <Image />
    </Content>
  </Layout>
);

export default Main;
