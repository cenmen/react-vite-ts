import { Avatar, Dropdown, message } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useAuthStore } from '@/store';

const AvatarIcon = () => {
	const resetAuthStore = useAuthStore(state => state.resetAuthStore);
	// 退出登录
	const logout = () => {
		setTimeout(() => {
			resetAuthStore();
		}, 0);
		message.success('已退出登录');
		// navigate('/login');
	};

	const items = [
		{
			key: 'logout',
			label: (
				<span className='dropdown-item' onClick={logout}>
					退出登录
				</span>
			),
			icon: <LogoutOutlined />
		}
	];

	return (
		<Dropdown menu={{ items }} placement='bottomRight' arrow>
			<Avatar
				className='w-8 h-8 duration-500 ease-in-out overflow-hidden grayscale-[30%] hover:scale-110 hover:grayscale-0'
				src='https://img01.yzcdn.cn/vant/logo.png'
			/>
		</Dropdown>
	);
};

export default AvatarIcon;
