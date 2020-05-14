import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

const ContentBlock = ({ children }) => {
  return (
    <Content
      style={{
        margin: '24px 16px',
        padding: 24,
        background: '#fff',
        minHeight: 400,
      }}
    >
      {children}
    </Content>
  );
};

export default ContentBlock;
