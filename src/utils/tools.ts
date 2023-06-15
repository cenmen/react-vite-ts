import { useAuthStore } from '@/store';

export const getToken = () => {
	const tokenInfo = useAuthStore.getState().tokenInfo;
	return tokenInfo;
};

export const delay = (timeout: number) => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(true);
		}, timeout);
	});
};
