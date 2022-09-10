import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card, Checkbox, Col, Form, Input, Row, Typography } from 'antd';
import { cx } from 'alias';

import { useAuth } from '@store/auth';

import ROUTE_PATHS from 'Router/paths';

import responsive from '../responsive';
import useHomeFormHook from './hooks';
import './styles.less';

function HomeForm(): JSX.Element {
    
}