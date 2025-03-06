import React from "react";
import { useAuth } from "../useAuth";

const Home: React.FC = () => {
	const { user } = useAuth();
	interface UserProfile {
		username: string;
	}

	return (
		<main className="flex flex-col items-center">
			<img className="rounded" src={user?.image} alt={user?.username} />

			<main>
				<p>Hello </p>
			</main>
		</main>
	);
};

export default Home;
