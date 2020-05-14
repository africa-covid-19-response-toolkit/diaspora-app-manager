import React, { useState } from 'react';
import { Layout } from 'antd';

// Layout Parts
import SideBlock from './Parts/SideBlock';
import HeaderBlock from './Parts/HeaderBlock';
import ContentBlock from './Parts/ContentBlock';

function FullPage({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideBlock collapsed={collapsed} />
      <Layout>
        <HeaderBlock onCollapse={collapsed => setCollapsed(collapsed)} />
        <ContentBlock>{children}</ContentBlock>
      </Layout>
    </Layout>
  );
}

export default FullPage;
