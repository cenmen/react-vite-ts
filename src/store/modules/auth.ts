import { pick } from 'lodash-es';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';
import { RouterItem } from '@/routers';

interface AuthState {
	tokenInfo?: object;
	authInfo?: object;
	userInfo?: object;
	currentRouter?: RouterItem[] | null;
}

interface AuthStateFunc {
	resetAuthStore: () => void;
	updateAuthStore: (values: AuthState) => void;
}

const initAuthState = {
	tokenInfo: {},
	authInfo: {},
	userInfo: {},
	currentRouter: null
};

export const useAuthStore = create<AuthState & AuthStateFunc>()(
	devtools(
		persist(
			set => ({
				...initAuthState,
				resetAuthStore: () => set(initAuthState, true),
				updateAuthStore: (values: AuthState) => set((state: AuthState) => ({ ...state, ...values }))
			}),
			{
				name: 'auth-storage',
				storage: createJSONStorage(() => localStorage),
				partialize: state => pick(state, ['tokenInfo', 'authInfo', 'userInfo'])
			}
		),
		{ name: 'auth' }
	)
);
