import React from 'react';
import { GoldOutlined } from '@ant-design/icons';
import lazyLoad from '@/routers/lazyLoad';
import LayoutIndex from '@/layout/Layout';

const DemoRouter = [
	{
		title: '示例菜单',
		path: '/demo2',
		element: <LayoutIndex />,
		icon: <GoldOutlined />,
		redirect: 'demo2/c',
		children: [
			{
				title: '示例菜单C',
				path: '/demo2/c',
				element: lazyLoad(React.lazy(() => import('@/views/Home')))
			},
			{
				title: '示例菜单D',
				path: '/demo2/d',
				redirect: 'demo2/d/1',
				children: [
					{
						title: '示例菜单D-1',
						path: '/demo2/d/1',
						element: lazyLoad(React.lazy(() => import('@/views/Home')))
					},
					{
						title: '示例菜单D-2',
						path: '/demo2/d/2',
						element: lazyLoad(React.lazy(() => import('@/views/Home')))
					}
				]
			}
		]
	}
];

export default DemoRouter;
