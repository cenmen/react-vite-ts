import { useEffect } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { pick } from 'lodash-es';
import { fetchAuthInfo } from '@/api';
import { routers, RouterItem } from '@/routers';
import { useAuthStore } from '@/store';

// 默认父级菜单下没有子菜单则过滤掉父菜单
// const getAuthRoutes = (authInfo, routes) => {
// 	return routes.reduce((total, cur) => {
// 		if (cur.children) cur.children = getAuthRoutes(authInfo, cur.children);
// 		return !cur.auth || authInfo.includes(cur.auth) ? [...total, cur] : total;
// 	}, []);
// };

type AuthRouterProps = {
	routes: RouterItem[] | null;
};

const Router = () => {
	const { currentRouter, updateAuthStore } = useAuthStore(state => pick(state, ['updateAuthStore', 'currentRouter']));

	const loadAuthInfo = async () => {
		const authInfo = await fetchAuthInfo();
		// const routes = getAuthRoutes(authInfo, routers);
		updateAuthStore({ authInfo, currentRouter: routers });
	};

	useEffect(() => {
		loadAuthInfo();
	}, []);

	const AuthRouter: React.FC<AuthRouterProps> = props => useRoutes(props.routes);

	return <BrowserRouter>{currentRouter && <AuthRouter routes={currentRouter} />}</BrowserRouter>;
};

export default Router;
