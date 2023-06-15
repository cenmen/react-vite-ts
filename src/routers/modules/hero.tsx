import React from 'react';
import { AreaChartOutlined } from '@ant-design/icons';
import lazyLoad from '@/routers/lazyLoad';
import LayoutIndex from '@/layout/Layout';
import {
	VIEW_HERO,
	VIEW_HERO_LIST,
	VIEW_HERO_TEST_ERROR,
	VIEW_HERO_DETAIL,
	VIEW_HERO_BLANK,
	VIEW_HERO_BLANK_1,
	VIEW_HERO_BLANK_2,
	VIEW_HERO_BLANK_3
} from '@/constants';

// 数据模块
const heroRouter = [
	{
		title: '示例数据',
		path: VIEW_HERO,
		element: <LayoutIndex />,
		icon: <AreaChartOutlined />,
		redirect: VIEW_HERO_BLANK,
		children: [
			{
				title: '测试页面错误',
				path: VIEW_HERO_TEST_ERROR,
				element: lazyLoad(React.lazy(() => import('@/views/Home')))
			},
			{
				title: '数据列表',
				path: VIEW_HERO_LIST,
				element: lazyLoad(React.lazy(() => import('@/views/Home')))
			},
			{
				isHide: true,
				title: '数据详情',
				path: VIEW_HERO_DETAIL,
				element: lazyLoad(React.lazy(() => import('@/views/Home')))
			},
			{
				title: '调试权限',
				path: VIEW_HERO_BLANK,
				redirect: VIEW_HERO_BLANK_1,
				children: [
					{
						title: '调试权限 - keepAlive',
						path: VIEW_HERO_BLANK_1,
						element: lazyLoad(React.lazy(() => import('@/views/Home')))
					},
					{
						title: '调试权限 - noKeepAlive',
						path: VIEW_HERO_BLANK_2,
						element: lazyLoad(React.lazy(() => import('@/views/Home')))
					},
					{
						title: '调试权限 - 2（无权限）',
						path: VIEW_HERO_BLANK_3,
						element: lazyLoad(React.lazy(() => import('@/views/Home')))
					}
				]
			}
		]
	}
];

export default heroRouter;
