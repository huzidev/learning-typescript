import { Col, Row, Typography, Button } from 'antd';
import React from 'react'
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';
import { useStore } from '../store'


export default function Top (): JSX.Element {
  const store = useStore()
 
  function dark() {
    store.darkMode()
  }

  const mode = store.dark ? <LightModeIcon /> : <NightlightIcon />

  const classForDark = store.dark ? 'dark-mode' : 'light-mode'

  console.log('tetss', store.dark);

  return (
    <div className={classForDark}>
        <Row>
            <Col span={18}>
                <Typography.Title className={classForDark}>
                    Todo List
                </Typography.Title>
            </Col>
            <Col span={6}>
                <button onClick={dark} className={`${classForDark} toggle-dark-mode`}>
                    {mode}
                </button>
            </Col>
        </Row>
    </div>
  )
}
