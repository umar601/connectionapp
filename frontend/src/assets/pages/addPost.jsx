import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPost } from "../services/api";
import "../../assets/styling/addpost.css";

export default function AddPost() {
  let [data, setData] = useState({ content: "" });
  let [error, setError] = useState("");
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  async function handleOnSubmit(event) {
    event.preventDefault();
    setLoading(true);
    await addPost(data).then(() => {
      console.log("added successfully");
      setLoading(false);
      navigate("/home");
    }).catch((err) => {
      console.log(err);
      setError(err);
      setLoading(false);
    });
  }

  function handleOnChange(event) {
    setData({ ...data, [event.target.name]: event.target.value });
  }

  return (
    <div className="addpost-container">
      <div className="addpost-wrapper">
        <div className="addpost-header">
          <div className="icon">✍️</div>
          <h1 className="addpost-title">Create Post</h1>
          <p className="addpost-subtitle">Share your thoughts with the community</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleOnSubmit} className="addpost-form">
          <div className="form-group">
            <label className="form-label">
              <span className="label-icon">📝</span>
              What's on your mind?
            </label>
            <textarea
              className="form-textarea"
              name="content"
              placeholder="Write something interesting..."
              value={data.content}
              required
              onChange={handleOnChange}
              maxLength="500"
            />
            <div className={`char-count ${data.content.length >= 450 ? 'limit' : ''}`}>
              {data.content.length}/500
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="submit" 
              className={`submit-btn ${loading ? 'loading' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Posting...
                </>
              ) : (
                <>
                  <span className="btn-icon">🚀</span>
                  Add Post
                </>
              )}
            </button>
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => navigate("/home")}
            >
              Cancel
            </button>
          </div>
        </form>

        {/* Live Preview */}
        {data.content && (
          <div className="post-preview">
            <div className="post-preview-title">📄 Preview</div>
            <div className="post-preview-content">
              {data.content || "Your post will appear here..."}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}