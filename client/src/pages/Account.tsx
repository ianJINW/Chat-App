import React, { useEffect } from "react";
import { useFetchData } from "../utils/query";
import { useAuth } from "../useAuth";

const Account: React.FC = () => {
	const { user } = useAuth();
	console.log(user);

	useEffect(() => {
		console.log("Current user:", user);
	}, [user]);

	const {
		data: userInfo,
		error,
		isLoading,
	} = useFetchData(`/api/users/${user?.id}`);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) { 
		return <div>Error: {error.message}</div>;
	}

	if (!userInfo) {
		return <div>No user information found</div>;
	}

	return (
		<section className="account-section">
			<div className="profile-container">
				{userInfo.image && (
					<img
						src={userInfo.image}
						alt={userInfo.username}
						className="profile-image"
					/>
				)}
				<div className="user-info">
					<h2>{userInfo.username}</h2>
					<p>{userInfo.email}</p>
				</div>
			</div>
		</section>
	);
};

export default Account;
