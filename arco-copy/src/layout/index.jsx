import React, { useState } from 'react';
import { Layout } from '@arco-design/web-react';
import { IconMenuFold, IconMenuUnfold } from '@arco-design/web-react/icon';
import { LogoCompontent, NavBarItemCompontent } from './compontents';

const { Sider } = Layout;
const { Header } = Layout;
const { Footer } = Layout;
const { Content } = Layout;

function PublicLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const handleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout className="layout-container">
      <Header className="layout-header">
        <LogoCompontent />
        <div className="layout-header-right">
          <NavBarItemCompontent />
        </div>
      </Header>
      <Layout className="layout-main-wrap">
        <Sider
          width="240"
          collapsed={collapsed}
          collapsible
          onCollapse={handleCollapsed}
          trigger={collapsed ? <IconMenuUnfold /> : <IconMenuFold />}
          breakpoint="xl"
        ></Sider>
      </Layout>
    </Layout>
  );
}
export default React.memo(PublicLayout);
