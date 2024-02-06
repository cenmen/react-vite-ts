import { pick } from 'lodash-es';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';
import { RouterItem } from '@/routers';

interface AuthState {
	tokenInfo: object | null;
	authInfo: object | null;
	userInfo: object | null;
	currentRouter: RouterItem[] | null;
}

interface AuthStateFunc {
	resetAuthStore: () => void;
	updateAuthStore: (values: Partial<AuthState>) => void;
}

const initAuthState = {
	tokenInfo: null,
	authInfo: null,
	userInfo: null,
	currentRouter: null
};

export const useAuthStore = create<AuthState & AuthStateFunc>()(
	devtools(
		persist(
			set => ({
				...initAuthState,
				resetAuthStore: () => set(initAuthState, true),
				updateAuthStore: (values: Partial<AuthState>) => set((state: AuthState) => ({ ...state, ...values }))
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
