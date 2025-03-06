import React, { useState } from "react";
import { postData, useFetchData } from "../utils/query";
import { useAuth } from "../useAuth";

const Posts: React.FC = () => {
	const { data: posts, error, isLoading } = useFetchData("/api/posts");
	const [post, setPost] = useState("");
	const [postImage, setPostImage] = useState<File | null>(null);
	const { user } = useAuth();
	const id = user?.id?.toString(); // Ensure id is a string

	if (isLoading) {
		return <p className="text-center text-gray-500">Loading...</p>;
	}

	if (error) {
		return <p className="text-center text-red-500">Error: {error.message}</p>;
	}

	if (!posts || posts.length === 0) {
		return <p className="text-center text-gray-500">No posts available</p>;
	}

	return (
		<div className="flex flex-col min-h-screen bg-gray-100 p-4">
			<div className="flex-grow overflow-auto">
				<h2 className="text-3xl font-bold mb-6 text-center">Posts</h2>
				<main className="flex flex-row flex-wrap justify-center gap-4 mb-6">
					{posts.map((post: any) => (
						<article
							key={post.id}
							className="flex flex-col items-center p-4 shadow-md bg-white rounded-lg w-80"
						>
							<p className="mb-2">{post.post}</p>
							{post.media && post.media.trim() !== "" && (
								<img
									src={post.media}
									alt="Post media"
									className="w-full h-auto rounded-lg"
								/>
							)}
						</article>
					))}
				</main>
			</div>
			<section className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md mt-auto">
				<form
					encType="multipart/form-data"
					className="flex items-center space-x-4"
					onSubmit={(e) => {
						e.preventDefault();
						const formData = new FormData();
						formData.append("post", post);
						formData.append("authorId", id!);
						if (postImage) {
							formData.append("media", postImage);
						}
						postData(`api/posts/`, formData);
					}}
				>
					<div className="flex-1">
						<label htmlFor="media" className="block text-gray-700">
							Media
						</label>
						<input
							type="file"
							name="media"
							id="media"
							className="w-full p-2 border border-gray-300 rounded mt-1"
							onChange={(e) => {
								e.preventDefault();
								setPostImage(e.target.files![0]);
							}}
							placeholder="Media"
						/>
					</div>
					<div className="flex-1">
						<label htmlFor="post" className="block text-gray-700">
							Post
						</label>
						<input
							type="text"
							name="post"
							id="post"
							className="w-full p-2 border border-gray-300 rounded mt-1"
							onChange={(e) => setPost(e.target.value)}
							placeholder="Post"
						/>
					</div>
					<button
						type="submit"
						className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
					>
						{isLoading ? "Post submitting" : "Submit"}
					</button>
				</form>
			</section>
		</div>
	);
};

export default Posts;
