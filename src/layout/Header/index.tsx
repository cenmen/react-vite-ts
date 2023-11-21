import { Layout } from 'antd';
import AvatarIcon from './components/AvatarIcon';
import CollapseIcon from './components/CollapseIcon';

const LayoutHeader = () => {
	const { Header } = Layout;

	return (
		<Header className='flex items-center justify-between bg-white h-12 px-4'>
			<div className='flex items-center'>
				<CollapseIcon />
			</div>
			<div className='flex items-center'>
				<span className='mr-5 text-sm'>Hooks</span>
				<AvatarIcon />
			</div>
		</Header>
	);
};

export default LayoutHeader;
