import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
	id: number | null;
	email: string | null;
	username: string | null;
	/* 	token: string | null ; */
	image: string | null;
	login: (user: Partial<Omit<User, "login" | "logout">>) => void;
	logout: () => void;
}

const useAuthStore = create<User>((set) => ({
	id: null,
	email: null,
	username: null,
	image: null,
	login: (user) => set((state) => ({ ...state, ...user })),
	logout: () => set({ id: null, email: null, username: null, image: null }),
}));

export default useAuthStore;
