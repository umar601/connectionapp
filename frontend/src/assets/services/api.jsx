 import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Login
export const userLogin = (data) => {
  return api.post("/login", data);
};

// Signup
export const userSignUp = (data) => {
  return api.post("/signup", data);
};

// Check Login
export const fetechLogin = () => {
  return api.get("/me");
};

// Fetch Posts
export const fetchPost = () => {
  return api.get("/post");
};

// Add Post
export const addPost = (data) => {
  return api.post("/post", data);
};

// Update Post
export const updatePost = (postId, data) => {
  return api.patch(`/post/${postId}`, data);
};

// Add Comment
export const addComment = (postId, data) => {
  return api.post(`/post/comment/${postId}`, data);
};

// Delete Comment
export const deleteComment = (commentId, userId) => {
  return api.delete(`/post/comment/${commentId}/${userId}`);
};

// Received Requests
export const seeRecievedRequests = (userId) => {
  return api.get(`/request/recieved/${userId}`);
};

// All Users
export const getAllUsers = (userId) => {
  return api.get(`/home/user/${userId}`);
};

// Send Request
export const sendRequest = (data) => {
  return api.post("/request", data);
};

// Sent Requests
export const seeRequestSend = (userId) => {
  return api.get(`/request/send/${userId}`);
};

// Accept Request
export const acceptRequest = (data) => {
  return api.post("/request/accept", data);
};

// Reject Request
export const rejectRequest = (data) => {
  return api.post("/request/reject", data);
};

// Connections
export const seeConnections = (userId) => {
  return api.get(`/request/connection/${userId}`);
};

export default api;