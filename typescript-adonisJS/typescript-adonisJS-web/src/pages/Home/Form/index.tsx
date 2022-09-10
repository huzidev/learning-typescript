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
    const [isLogInForm, setIsLogInForm] = useState(true);
    const history = useHistory();
    const auth = useAuth();

    const onFinish = (data: any) => {
        // if user is at loginIn page then data will be sends to singIn page
        if (isLogInForm) {
            auth.signIn(data);
        } // if user is at signUp page then data will be sends to signUp page
        else {
            auth.signUp(data);
        }
    };

    useHomeFormHook();
}