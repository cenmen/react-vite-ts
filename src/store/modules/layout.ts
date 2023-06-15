import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
interface LayoutState {
	isCollapse?: boolean;
}

interface LayoutStateFunc {
	resetLayoutStore: () => void;
	updateLayoutStore: (values: LayoutState) => void;
}

const initLayoutState = {
	isCollapse: false
};

export const useLayoutStore = create<LayoutState & LayoutStateFunc>()(
	devtools(
		set => ({
			...initLayoutState,
			resetLayoutStore: () => set(initLayoutState, true),
			updateLayoutStore: (values: LayoutState) =>
				set((state: LayoutState) => ({
					...state,
					...values
				}))
		}),
		{ name: 'layout' }
	)
);
