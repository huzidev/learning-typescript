import { mapErrorToState } from '@store/utils';
import { Action } from '@store/types';
import { errorNotification } from 'utils/notifications';

import api, { setToken } from '@services/api';

// localStorage to save user's Token
import storage from '@services/storage';

import { SignInRequest } from './types';
import * as endpoints from './endpoints';
import KEYS from './keys';