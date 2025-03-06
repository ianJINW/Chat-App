import React, { useState } from "react";
import { useRegisterMutation } from "../utils/query";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
	// Local state for form fields and image preview
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [profile, setProfileImage] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [show, setShow] = useState<boolean>(false);
	const [type, setType] = useState<boolean>(false);

	// Destructure mutation properties from your custom hook
	const { mutate, isPending, isError, error } = useRegisterMutation();

	// Handle file input change: read the file and set preview
	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setProfileImage(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	// Handle form submission: build FormData and trigger mutation
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("email", email);
		formData.append("username", username);
		formData.append("password", password);
		if (profile) {
			formData.append("profile", profile);
		}
		mutate(formData);
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100 text-black">
			<div className="bg-white p-8 rounded shadow-md w-full max-w-md">
				<h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
				<form
					encType="multipart/form-data"
					onSubmit={handleSubmit}
					className="space-y-4"
				>
					<div>
						<label className="block text-gray-700">Email:</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="w-full p-2 border border-gray-300 rounded mt-1 invalid:border-red-600 invalid:border-red-600 invalid:outline-black"
						/>
					</div>
					<div>
						<label className="block text-gray-700">Username:</label>
						<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
							className="w-full p-2 border border-gray-300 rounded mt-1 invalid:border-red-600 invalid:border-red-600 invalid:outline-black"
						/>
					</div>
					<div>
						<label className="block text-gray-700">Password:</label>
						<section className="flex items-center">
							<input
								type={type ? "text" : "password"}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								className="w-full p-2 border border-gray-300 rounded mt-1 invalid:border-red-600 invalid:border-red-600 invalid:outline-black"
							/>
							<button
								onClick={(e) => {
									e.preventDefault();
									setType((prev) => !prev);
									setShow((prev) => !prev);
								}}
								className="ml-2 text-blue-500"
							>
								{show ? "Hide Password" : "Show Password"}
							</button>
						</section>
					</div>
					<div>
						<label className="block text-gray-700">Profile Image:</label>
						<input
							type="file"
							accept="image/*"
							name="profile"
							onChange={handleImageChange}
							className="w-full p-2 border border-gray-300 rounded mt-1 invalid:border-red-600 invalid:border-red-600 invalid:outline-black"
						/>
					</div>
					{imagePreview && (
						<div className="flex justify-center mt-4">
							<img
								src={imagePreview}
								alt="Profile Preview"
								className="w-24 h-24 rounded-full"
							/>
						</div>
					)}
					<button
						type="submit"
						disabled={isPending}
						className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
					>
						{isPending ? "Registering..." : "Register"}
					</button>
				</form>

				<Link className="block text-center text-blue-500 mt-4" to="/login">
					Login
				</Link>
				{isError && (
					<p className="text-red-500 mt-4">
						{error instanceof Error ? error.message : "Registration failed"}
					</p>
				)}
			</div>
		</div>
	);
};

export default Register;
