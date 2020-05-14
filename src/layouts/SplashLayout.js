import React from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';

const Image = styled.img`
  width: 100%;
  height: 100vh;
  object-fit: cover;
`;

function SplashLayout({ children }) {
  return (
    <Row type="flex" align="middle">
      <Col span={12}>
        <Row>
          <Image
            src={require('../../assets/images/splash-bg.png')}
            alt="Splash"
          />
        </Row>
      </Col>
      <Col span={12}>
        <Row style={{ marginLeft: 30, marginRight: 30 }}>{children}</Row>
      </Col>
    </Row>
  );
}

export default SplashLayout;
