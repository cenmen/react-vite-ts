import { useEffect, useState } from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLayoutStore, useAuthStore } from '@/store';
import type { RouterItem } from '@/routers';
import Logo from './components/Logo';

interface MenuItem {
	label: string;
	icon?: React.ReactNode;
	path: string;
	key: string;
	children?: MenuProps['items'];
}

// 将 router 数据提取菜单
const getMenuItems = (routes: RouterItem[] | null): MenuProps['items'] => {
	if (!routes) return [];
	const menus = routes.filter(val => !val.isHide);
	return menus.map(item => {
		const { path, title, icon } = item;
		const menuItem: MenuItem = { label: title as string, icon, path, key: path };
		if (item.children) {
			menuItem.children = getMenuItems(item.children);
		}
		return menuItem;
	});
};

const LayoutMenu = () => {
	const currentRouter = useAuthStore(state => state.currentRouter);
	const isCollapse = useLayoutStore(state => state.isCollapse);
	const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
	const [openKeys, setOpenKeys] = useState<string[]>([]);
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const menuList = getMenuItems(currentRouter);

	// 刷新页面菜单保持高亮
	useEffect(() => {
		setSelectedKeys([pathname]);
		if (isCollapse) return setOpenKeys([]);
		const openKeys: string[] = pathname.split(/(?=\/)/).reduce((total, cur) => {
			const last = total[total.length - 1] ? total[total.length - 1] : '';
			return [...total, `${last}${cur}`];
		}, [] as string[]);
		setOpenKeys(openKeys);
	}, [pathname, isCollapse]);

	return (
		<div className='flex flex-col justify-between'>
			<Logo />
			<Menu
				theme='dark'
				mode='inline'
				triggerSubMenuAction='click'
				items={menuList}
				openKeys={openKeys}
				selectedKeys={selectedKeys}
				onOpenChange={openKeys => setOpenKeys(openKeys)}
				onClick={({ key: path }) => navigate(path)}
			/>
		</div>
	);
};

export default LayoutMenu;
