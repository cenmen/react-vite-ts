import http from '@/services/http';
import { AUTH_API } from '@/config/env';
import { AuthInfoRes } from './types';

/**
 * @namespace '登录权限模块'
 */

const AUTH_PREFIX = `${AUTH_API}/work`;

// 获取用户信息
export const fetchAuthInfo = () => http.get<AuthInfoRes>(`${AUTH_PREFIX}/auths`);
