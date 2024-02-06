import React from 'react';
import { AreaChartOutlined } from '@ant-design/icons';
import lazyLoad from '@/routers/lazyLoad';
import LayoutIndex from '@/layout/Layout';

const DemoRouter = [
	{
		title: '示例菜单',
		path: '/demo1',
		element: <LayoutIndex />,
		icon: <AreaChartOutlined />,
		redirect: 'demo1/a',
		children: [
			{
				title: '示例菜单A',
				path: '/demo1/a',
				element: lazyLoad(React.lazy(() => import('@/views/Home')))
			},
			{
				title: '示例菜单B',
				path: '/demo1/b',
				redirect: 'demo1/b/1',
				children: [
					{
						title: '示例菜单B-1',
						path: '/demo1/b/1',
						element: lazyLoad(React.lazy(() => import('@/views/Home')))
					},
					{
						title: '示例菜单B-2',
						path: '/demo1/b/2',
						element: lazyLoad(React.lazy(() => import('@/views/Home')))
					}
				]
			}
		]
	}
];

export default DemoRouter;
