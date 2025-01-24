import React, { useState } from "react";
import axios from "axios";
import Button from "./Button";
import { Confirm } from "notiflix/build/notiflix-confirm-aio";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const PostForm = ({ selectedPost, fetchPosts }) => {
  const [formData, setFormData] = useState(
    selectedPost || { title: "", content: "" }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      Notify.failure("Title is required!");
      return false;
    }
    if (!formData.content.trim()) {
      Notify.failure("Content is required!");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    try {
      if (formData.id) {
        // Update existing post
        await axios.put(
          `http://127.0.0.1:8000/api/posts/${formData.id}`,
          formData
        );
      } else {
        // Add new post
        await axios.post("http://127.0.0.1:8000/api/posts", formData);
      }
      // Reset form after submission
      setFormData({ title: "", content: "" });
      // fetchPosts();
     
       await axios.get(
      'http://127.0.0.1:8000/api/posts?'
      );
      // fetchPosts();
      Notify.success("Post saved successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      Notify.failure("Failed to save the post!");
    }
  };

  const handleConfirmSave = () => {
    // Validate form before showing confirmation dialog
    if (!validateForm()) return;

    const title = formData.id ? "Update Post" : "Add Post";
    const message = formData.id
      ? "Are you sure you want to update this post?"
      : "Are you sure you want to add this post?";

    Confirm.show(
      title,
      message,
      "Yes",
      "No",
      () => handleSubmit(), // Execute submit logic if confirmed
      () => {}, // No action on cancel
      { backOverlay: true } // Optional: Add overlay to modal
    );
  };

  return (
    <form
      className="container border rounded p-4 shadow-sm"
      style={{ marginBottom: "2rem", maxWidth: "600px" }}
    >
      <h2 className="mb-4">{formData.id ? "Edit Post" : "Add Post"}</h2>
      
      {/* Input untuk judul */}
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter title"
          required
          className="form-control"
        />
      </div>

      {/* Input untuk konten */}
      <div className="mb-3">
        <label htmlFor="content" className="form-label">
          Content <span className="text-danger">*</span>
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Enter content"
          required
          rows="5"
          className="form-control"
        ></textarea>
      </div>

      {/* Tombol */}
      <Button
        type="button" // Change to "button" to prevent form auto-submit
        className="btn btn-primary w-100"
        onClick={handleConfirmSave} // Attach confirmation logic here
      >
        Save
      </Button>
    </form>
  );
};

export default PostForm;
