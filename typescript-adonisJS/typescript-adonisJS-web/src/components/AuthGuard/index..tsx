import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import UrlPattern from 'url-pattern';

import { useAuth } from '@store/auth';

import ROUTE_PATHS from 'Router/paths';

import routes from 'Router/routes';

import PageLoader from 'components/PageLoader';

import { hasPermission } from 'utils';