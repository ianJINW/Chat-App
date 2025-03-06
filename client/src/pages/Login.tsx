import React, { useState } from "react";
import { useLoginMutation } from "../utils/query";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const loginMutation = useLoginMutation();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		loginMutation.mutate({ email, password });
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100 text-black">
			<div className="bg-white p-8 rounded shadow-md w-full max-w-md">
				<h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-gray-700">Email:</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							disabled={loginMutation.status === "pending"}
							className="w-full invalid:border-red-600 disabled:border-teal-800 p-2 border border-gray-300 rounded mt-1 invalid:border-red-600 invalid:outline-none"
						/>
					</div>
					<div>
						<label className="block text-gray-700">Password:</label>
						<div className="flex items-center">
							<input
								type={showPassword ? "text" : "password"}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								disabled={loginMutation.status === "pending"}
								className="w-full invalid:border-red-600 disabled:border-teal-800 p-2 border border-gray-300 rounded mt-1 invalid:border-red-600 invalid:outline-none"
							/>
							<button
								type="button"
								onClick={() => setShowPassword((prev) => !prev)}
								className="ml-2 text-blue-500"
							>
								{showPassword ? "Hide" : "Show"}
							</button>
						</div>
					</div>
					<button
						type="submit"
						disabled={loginMutation.status === "pending"}
						className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
					>
						{loginMutation.status === "pending" ? "Logging in..." : "Login"}
					</button>
				</form>
				<Link to="/register" className="block text-center text-blue-500 mt-4">
					Register
				</Link>
				{loginMutation.isError && (
					<p className="text-red-500 mt-4">
						Error:{" "}
						{loginMutation.error instanceof Error &&
							loginMutation.error.message}
					</p>
				)}
			</div>
		</div>
	);
};

export default Login;
