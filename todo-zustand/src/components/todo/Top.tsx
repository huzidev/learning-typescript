import { Col, Row, Typography, Button } from 'antd';
import React from 'react'
import { useState } from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';
import { useStore } from '../store'


export default function Top() {
  const store = useStore()
 
  const [state, setState] = useState(false)

  function dark() {
    store.darkMode()
    setState((prevState) => !prevState)
  }

  const mode =  state ? <LightModeIcon /> : <NightlightIcon />

  return (
    <div>
        <Row>
            <Col span={18}>
                <Typography.Title>
                    Todo List
                </Typography.Title>
            </Col>
            <Col span={6}>
                <Button onClick={dark}>
                    {mode}
                </Button>
            </Col>
        </Row>
    </div>
  )
}
