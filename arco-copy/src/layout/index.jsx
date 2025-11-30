import React, { useState } from 'react';
import { Layout } from '@arco-design/web-react';

const { Sider } = Layout;
const { Header } = Layout;
const { Footer } = Layout;
const { Content } = Layout;

function PublicLayout() {
  const [collapsed] = useState(false);
  return (
    <Layout className="layout-container">
      <Header className="layout-header"></Header>
      <Layout className="layout-main-wrap">
        <Sider width="240" collapsible breakpoint="xl"></Sider>
      </Layout>
    </Layout>
  );
}
export default React.memo(PublicLayout);
