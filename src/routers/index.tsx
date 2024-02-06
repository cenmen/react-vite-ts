import NotFound from '@/views/Error/404';
import demoRouter1 from './modules/demo1';
import demoRouter2 from './modules/demo2';
import homeRouter from './modules/home';

export interface RouterItem {
	path: string;
	element: React.ReactNode;
	icon?: React.ReactNode;
	isHide?: boolean;
	title?: string;
	redirect?: string;
	children?: RouterItem[];
}

/**
 * @description 路由配置项参数说明
 * @param {String} path 路由路径（React Router 参数）
 * @param {ReactNode} element 路由渲染组件（React Router 参数）
 * @param {ReactNode} icon 左侧菜单栏首级图标
 * @param {Boolean} isHide 是否在左侧菜单栏隐藏
 * @param {String} title 左侧菜单栏和 tabbar 名称
 * @param {String} redirect 路由重定向
 * @remark 非 React Router 参数会在各个 layout 组件中被手动使用
 */
export const routers = [
	...homeRouter,
	...demoRouter1,
	...demoRouter2,
	{
		path: '*',
		isHide: true,
		element: <NotFound />
	}
];
