import React, { createContext, ReactNode, useState } from "react";

interface User {
	id: number;
	email: string;
	username: string;
	token: string;
	image: string;
}

export interface AuthContextType {
	user: User | null;
	login: (userData: User) => void;
	logout: () => void;
	isDark: boolean;
	dark: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>(null);
	const [isDark, setDark] = useState<boolean>(false);
	const login = (userData: User) => {
		setUser(userData);
	};

	const dark = () => {
		setDark((prevMode) => !prevMode);
	};
	const logout = () => {
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, login, logout, dark, isDark }}>
			{children}
		</AuthContext.Provider>
	);
};
