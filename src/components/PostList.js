import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./Table"; // Import reusable Table component
import { Confirm } from "notiflix/build/notiflix-confirm-aio";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const uniqueParam = `timestamp=${new Date().getTime()}`;

const PostList = ({ onEdit }) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State to manage loading

  // UseEffect to fetch posts whenever the component mounts
  useEffect(() => {
    fetchPosts();
  }, []); // No dependencies needed, fetches once on mount

  const fetchPosts = async () => {
    setIsLoading(true); // Show loading
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/posts?${uniqueParam}`
      );
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false); // Hide loading
    }
  };

  const handleDelete = async (id) => {
    Loading.hourglass("Deleting post...");
    try {
      await axios.delete(`http://127.0.0.1:8000/api/posts/${id}`);
      fetchPosts(); // Refresh posts after deletion
    } catch (error) {
      console.error("Error deleting post:", error);
      Notify.failure("Error deleting post", { 
        position: 'right-top',
        timeout: 3000 ,
        showOnlyTheLastOne: true
      });
    } finally {
      Loading.remove(); // Remove loading after deletion
      Notify.info("Post deleted successfully", { 
        position: 'right-top',
        timeout: 2000 ,
        showOnlyTheLastOne: true
      });
      
      
    }
  };

  const handleModaldelete = (id) => {
    Confirm.show(
      "Delete Post",
      "Are you sure you want to delete this post?",
      "Yes",
      "No",
      () => handleDelete(id),
      () => {}, // No action on cancel
      { backOverlay: true } // Optional: Add overlay to modal
    );
  };

  // Define columns for the Table component
  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Title", accessor: "title" },
    { header: "Content", accessor: "content" },
  ];

  // Define actions for the Table component
  const actions = [
    {
      label: "Edit",
      className: "btn-warning",
      onClick: (row) => onEdit(row), // Pass selected row to onEdit callback
    },
    {
      label: "Delete",
      className: "btn-danger",
      onClick: (row) => handleModaldelete(row.id), // Pass row ID to handleDelete
    },
  ];

  return (
    <div>
      <h2>Posts</h2>

      {isLoading ? (
        <p>Loading...</p> // Show loading message while data is being fetched
      ) : (
        <Table columns={columns} data={posts} actions={actions} />
      )}
    </div>
  );
};

export default PostList;
