import React from 'react'
import { message } from 'antd'
import createApp from 'mickey'
import Routers from './routers'
import './index.html';

const app = createApp({
  historyMode: 'browser',
  hooks: {
    onError(error) {
      message.error(error.message);
    },
  },
})

app.load();
app.render(<Routers />, document.getElementById('root'))
