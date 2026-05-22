"use client";
import { useEffect, useState } from "react";

export default function CommentsList() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await fetch("/api/comments");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }

    fetchComments();
  }, []);

  return (
    <div className="space-y-4">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-lg font-semibold">{comment.name}</h2>
            <p className="text-gray-600">{comment.comment}</p>
            <p className="text-sm text-gray-400">
              Submitted on {new Date(comment.created_at).toLocaleDateString()}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No comments yet.</p>
      )}
    </div>
  );
}
