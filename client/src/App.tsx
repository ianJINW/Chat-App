import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Account from "./pages/Account";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuth } from "./useAuth";

const App: React.FC = () => {
	const { isDark } = useAuth();

	return (
		<div
			className={`${
				isDark ? "dark" : ""
			} bg-gray-200 flex flex-col min-h-screen text-black dark:bg-black-400 dark:text-gray-200`}
		>
			<Router>
				<Navbar />
				<div className="flex-grow">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/fyp" element={<Posts />} />
						<Route path="/account" element={<Account />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
					</Routes>
				</div>
			</Router>
		</div>
	);
};

export default App;
