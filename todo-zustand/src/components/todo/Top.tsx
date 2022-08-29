import { Col, Row, Typography } from 'antd';
import React from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';

export default function Top() {

  return (
    <div>
        <Row>
            <Col span={18}>
                <Typography.Title>
                    Todo List
                </Typography.Title>
            </Col>
            <Col span={6}>
                <LightModeIcon />
                <NightlightIcon />
            </Col>
        </Row>
    </div>
  )
}
