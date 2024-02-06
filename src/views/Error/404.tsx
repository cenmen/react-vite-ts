import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
	const navigate = useNavigate();
	const goHome = () => {
		navigate('/');
	};
	return <Result status='404' title='404' subTitle='找不到访问页面' extra={<Button onClick={goHome}>返回</Button>} />;
};

export default NotFound;
