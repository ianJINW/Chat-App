import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../useAuth";
import { useLogoutMutation } from "../utils/query";

const Navbar: React.FC = () => {
	const { user, isDark, dark } = useAuth();
	const logoutMutation = useLogoutMutation();

	const handleLogout = (e: React.FormEvent) => {
		e.preventDefault();
		logoutMutation.mutate(Number(user?.id));
	};

	return (
		<div className="bg-blue-500 dark:bg-gray-800 flex flex-row p-2 justify-between items-center text-white text-white">
			{user && (
				<img
					src={user.image}
					alt={user.username}
					className="profile-image w-10 h-10 rounded-full"
				/>
			)}
			{user && <h3 className="ml-2">{user.username}</h3>}
			<button
				onClick={dark}
				className="ml-4 bg-gray-500 hover:bg-gray-100 p-2 rounded dark:text-black dark:bg-white "
			>
				{isDark ? "Light Mode" : "Dark Mode"}
			</button>
			<nav className="flex space-x-4">
				<Link
					className="bg-gray-500 hover:bg-gray-100 hover:text-black p-2 rounded"
					to="/"
				>
					Home
				</Link>
				<Link
					className="bg-gray-500 hover:bg-gray-100 hover:text-black p-2 rounded"
					to="/fyp"
				>
					Posts
				</Link>
				{user ? (
					<>
						<Link
							className="bg-gray-500 hover:bg-gray-100 hover:text-black p-2 rounded"
							to="/Chats"
						>
							Chats
						</Link>
						<Link
							className="bg-gray-500 hover:bg-gray-100 hover:text-black p-2 rounded"
							to="/account"
						>
							Account
						</Link>
						<form onSubmit={handleLogout} className="inline">
							<button
								type="submit"
								className="bg-gray-500 hover:bg-gray-100 hover:text-black p-2 rounded"
							>
								{logoutMutation.isPending ? "Logging out" : "Log out"}
							</button>
						</form>
					</>
				) : (
					<>
						<Link
							className="bg-gray-500 hover:bg-gray-100 hover:text-black p-2 rounded"
							to="/login"
						>
							Login
						</Link>
						<Link
							className="bg-gray-500 hover:bg-gray-100 hover:text-black p-2 rounded"
							to="/register"
						>
							Register
						</Link>
					</>
				)}
			</nav>
		</div>
	);
};

export default Navbar;
