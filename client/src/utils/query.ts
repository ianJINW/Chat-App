import {
	useQuery,
	UseQueryResult,
	useMutation,
	useQueryClient,
	QueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { getApuUrl } from "./url";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../useAuth";

interface User {
	id: number;
	email: string;
	username: string;
	image: string;
	token: string;
}

interface RegisterData {
	email: string;
	password: string;
	username: string;
	image: File | null;
}

interface LoginData {
	email: string;
	password: string;
}

interface LoginResponse {
	message: string;
	user: User;
}

export const useFetchData = (url: any) => {
	const urls = getApuUrl(url);

	return useQuery({
		queryKey: [url],
		queryFn: async () => {
			const response = await axios.get(urls, { withCredentials: true });
			return response.data;
		},
	});
};

export const postData = (url: any, userData: FormData) => {
	const urls = getApuUrl(url);
	const { login } = useAuth();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: async (urls: any) => {
			const { data } = await axios.post(urls, userData, {
				withCredentials: true,
			});
			return data;
		},
		onSuccess: (data: any) => {
			data.user ? login(data.user) : navigate("/fyp");
		},
		onError: (error: Error) => {
			console.error("Post error:", error);
		},
	});
};

const register = async (userData: FormData): Promise<User> => {
	try {
		const { data } = await axios.post(getApuUrl("/register"), userData, {
			withCredentials: true,
		});
		return data;
	} catch (error) {
		throw axios.isAxiosError(error)
			? new Error(error.response?.data?.error || "Registration failed")
			: error;
	}
};

const loginUser = async (userData: LoginData): Promise<LoginResponse> => {
	try {
		const { data } = await axios.post<LoginResponse>(
			getApuUrl("/login"),
			userData,
			{
				withCredentials: true,
			}
		);
		return data;
	} catch (error) {
		throw axios.isAxiosError(error)
			? new Error(error.response?.data?.error || "Login failed")
			: error;
	}
};

const logout = async (userId: number): Promise<any> => {
	console.log(userId);
	try {
		const { data } = await axios.post(
			getApuUrl("/api/users/logout"),
			{ id: userId },
			{ withCredentials: true }
		);
		return data;
	} catch (error) {
		throw axios.isAxiosError(error)
			? new Error(error.response?.data?.error || "Logout unsuccessful")
			: error;
	}
};

export const useLogoutMutation = () => {
	const navigate = useNavigate();
	const { logout: logoutContext } = useAuth();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: logout,
		onSuccess: () => {
			logoutContext();
			queryClient.clear();
			navigate("/");
		},
		onError: (error: Error) => {
			console.error("Logout error:", error);
		},
	});
};

export const useRegisterMutation = () => {
	const navigate = useNavigate();

	return useMutation<User, Error, FormData>({
		mutationFn: register,
		onSuccess: () => {
			navigate("/login");
		},
		onError: (error: Error) => {
			console.error("Registration error:", error);
			navigate("/register");
		},
	});
};

export const useLoginMutation = () => {
	const navigate = useNavigate();
	const { login } = useAuth();

	return useMutation<LoginResponse, Error, LoginData>({
		mutationFn: loginUser,
		onSuccess: (data: LoginResponse) => {
			if (data.user) {
				login(data.user);
			}
			navigate("/fyp");
		},
		onError: (error: Error) => {
			console.error("Login error:", error);
		},
	});
};
