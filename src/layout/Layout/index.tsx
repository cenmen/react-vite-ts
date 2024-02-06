import { useEffect, useMemo } from 'react';
import { Layout } from 'antd';
import { useOutlet, useLocation, useNavigate } from 'react-router-dom';
import { shallow } from 'zustand/shallow';
import { useLayoutStore, useAuthStore } from '@/store';
import { RouterItem } from '@/routers';
import LayoutMenu from '../Menu';
import LayoutHeader from '../Header';

const { Sider, Content } = Layout;

type Props = {
	children?: React.ReactNode;
};

const getTargetRouteItem = (pathname: string, routes: RouterItem[] | null | undefined): RouterItem | void => {
	if (!routes) return;
	for (const item of routes) {
		if (item.path === pathname) return item;
		if (item.children) {
			const target = getTargetRouteItem(pathname, item.children);
			if (target) return target;
		}
	}
};

const LayoutIndex: React.FC<Props> = props => {
	const { children } = props;
	const currentRouter = useAuthStore(state => state.currentRouter);
	const { isCollapse, updateLayoutStore } = useLayoutStore(
		state => ({ isCollapse: state.isCollapse, updateLayoutStore: state.updateLayoutStore }),
		shallow
	);
	const outlet = useOutlet();
	const { pathname } = useLocation();
	const navigate = useNavigate();

	// 监听窗口大小变化
	const listeningWindowResize = () => {
		window.addEventListener('resize', () => {
			const screenWidth = document.body.clientWidth;
			if (isCollapse === false && screenWidth < 1200) updateLayoutStore({ isCollapse: true });
		});
	};

	const currentRoute = useMemo(() => getTargetRouteItem(pathname, currentRouter), [pathname, currentRouter]);

	useEffect(() => {
		listeningWindowResize();
	}, []);

	useEffect(() => {
		if (currentRoute?.redirect) navigate(currentRoute.redirect);
	}, [currentRoute]);

	const childrenContent = children || outlet;

	return (
		<Layout className='h-screen bg-[#f0f2f5]'>
			<Sider className='shadow-[2px_0_6px_rgba(0,21,41,0.35)]' trigger={null} collapsed={isCollapse} width={220} theme='dark'>
				<LayoutMenu />
			</Sider>
			<Layout>
				<LayoutHeader />
				<Content>{childrenContent}</Content>
			</Layout>
		</Layout>
	);
};

export default LayoutIndex;
