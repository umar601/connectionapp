import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { fetchPost, updatePost, addComment, deleteComment } from "../services/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../assets/styling/homepage.css";

export default function HomePage() {
  let { message, user, checking } = useAuth();
  let { postId } = useParams();

  console.log(user)

  let [post, setPost] = useState([]);
  let [error, setError] = useState("");
  let [comments, setComments] = useState("");
  let [commentFormData, setCommentFormData] = useState({ content: "" });
  let [index, setIndex] = useState(null);
  let [likeState, setLikeState] = useState(false);
  let [userId, setUserId] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    user._id ? setUserId(user._id) : setUserId(user.id);
    fetchPost().then((res) => {
      setPost([...res.data.allPost]);
    }).catch((err) => {
      setError(err);
    });
  }, [postId, user]);

  function handleLikes(postId, likes, index) {
    if (!likeState) {
      likes += 1;
      setLikeState(true);
    } else {
      likes -= 1;
      setLikeState(false);
    }
    updatePost(postId, { likes: likes }).then((res) => {
      navigate("/home");
    }).catch((err) => {
      setError(err);
    });
  }

  async function handleComments(index) {
    setIndex(index);
    setComments(post[index].comments);
  }

  async function handleCommentSubmit(event) {
    event.preventDefault();
    let postId = post[index]._id;
    addComment(postId, commentFormData).then(() => {
      fetchPost().then((res) => {
        setPost([...res.data.allPost]);
      }).catch((err) => {
        setError(err);
      });
      setComments("");
      setCommentFormData({ content: "" });
      console.log("added");
    }).catch((err) => {
      console.log(err);
      setError(err);
    });
  }

  function handlCommentChange(event) {
    setCommentFormData({ ...commentFormData, [event.target.name]: event.target.value });
  }

  async function handleDeletComment(commentId) {
    await deleteComment(commentId, userId).then((res) => {
      console.log("deleted success");
      setComments("");
      fetchPost().then((res) => {
        setPost([...res.data.allPost]);
      }).catch((err) => {
        setError(err);
      });
      navigate("/home");
    }).catch((err) => {
      console.log(err);
      setError(err);
    });
  }

  return (
    <div className="homepage-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/home" className="navbar-logo">
            <span>Social</span>App
          </Link>
        </div>
        <div className="navbar-search">
          <input type="text" placeholder="Search..." />
        </div>
        <div className="navbar-right">
          <div className="navbar-user">
            <div className="user-avatar">
              {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
            </div>
            <span className="username-display">{user?.username || "User"}</span>
          </div>
          <button 
            className="navbar-btn" 
            onClick={() => { navigate("/home/profile"); }}
          >
            🔗 Connections
          </button>
        </div>
      </nav>

      {/* Main Layout - 3 Columns */}
      <div className="main-layout">
        {/* Left Sidebar */}
        <div className="left-sidebar">
          <div className="profile-card">
            <div className="profile-cover"></div>
            <div className="profile-avatar-large">
              {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="profile-name">{user?.username || "User"}</div>
            <div className="profile-title">Member • SocialApp</div>
            <div className="profile-stats">
              <div className="profile-stat">
                <span className="number">{post.length}</span>
                <span className="label">Posts</span>
              </div>
              <div className="profile-stat">
                <span className="number">0</span>
                <span className="label">Followers</span>
              </div>
              <div className="profile-stat">
                <span className="number">0</span>
                <span className="label">Following</span>
              </div>
            </div>
            <div className="profile-premium">
              <a href="#">Try Premium for free</a>
            </div>
          </div>

          <div className="trending-topics">
            <h4>📈 Trending Topics</h4>
            <div className="trending-item">
              <span className="hash">#</span> Technology
              <span className="posts-count">12.5K posts</span>
            </div>
            <div className="trending-item">
              <span className="hash">#</span> Innovation
              <span className="posts-count">8.3K posts</span>
            </div>
            <div className="trending-item">
              <span className="hash">#</span> Community
              <span className="posts-count">5.7K posts</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {message && <div className="message-banner">{message}</div>}

          {/* Create Post Box */}
          <div className="create-post-box" onClick={() => navigate("/addpost")}>
            <div className="mini-avatar">
              {user?.username ? user.username.charAt(0).toUpperCase() : "U"}
            </div>
            <input type="text" placeholder="Start a post..." readOnly />
          </div>

          {/* Feed Header */}
          <div className="feed-header">
            <h2>
              <span className="feed-icon">📰</span> Feed
            </h2>
            <span className="feed-count">{post.length} posts</span>
          </div>

          {comments ? (
            <div className="comments-section">
              <div className="comments-header">
                <h1>Comments ({comments.length})</h1>
                <button className="close-comments" onClick={() => setComments("")}>×</button>
              </div>

              {comments.length > 0 ? (
                comments.map((comment, idx) => (
                  <div key={idx} className="comment-item">
                    {userId == comment.owner._id && (
                      <button 
                        className="comment-delete-btn" 
                        onClick={() => { handleDeletComment(comment._id); }}
                      >
                        Delete
                      </button>
                    )}
                    <p className="comment-owner">{comment.owner.username}</p>
                    <p className="comment-text">{comment.content}</p>
                    <p className="comment-time">Posted At: {comment.createdAt.toString().slice(0, 10)}</p>
                  </div>
                ))
              ) : (
                <div className="no-comments">No comments yet</div>
              )}

              <form className="comment-form" onSubmit={handleCommentSubmit}>
                <label>add comment </label>
                <input 
                  type="text" 
                  name="content" 
                  placeholder="Write a comment..." 
                  value={commentFormData.content} 
                  onChange={handlCommentChange} 
                  required 
                />
                <button type="submit">Post Comment</button>
              </form>
            </div>
          ) : (
            <div className="posts-feed">
              {post.length > 0 ? (
                post.map((pos, idx) => (
                  <div key={pos._id} className="post-card">
                    <div className="post-header">
                      <div className="post-avatar">
                        {pos.owner.username ? pos.owner.username.charAt(0).toUpperCase() : "A"}
                      </div>
                      <div className="post-owner-info">
                        <div className="post-owner-name">
                          {pos.owner.username ? pos.owner.username : "Anonymous"}
                        </div>
                        <div className="post-meta">
                          <span>Posted now</span>
                          <span className="dot"></span>
                          <span>🌐 Public</span>
                        </div>
                      </div>
                    </div>

                    <div className="post-content">{pos.content}</div>

                    <div className="post-actions">
                      <button 
                        className="post-action-btn like-btn" 
                        onClick={() => { handleLikes(pos._id, pos.likes, idx); }}
                      >
                        <Link to={`/post/${pos._id}`}>
                          <span className="icon">❤️</span> Like <span className="count">{pos.likes}</span>
                        </Link>
                      </button>

                      <button 
                        className="post-action-btn" 
                        onClick={() => { handleComments(idx); }}
                      >
                        <span className="icon">💬</span> Comment <span className="count">{pos.comments.length}</span>
                      </button>

                      <button className="post-action-btn">
                        <span className="icon">🔄</span> Repost <span className="count">{pos.repots.length}</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-posts">
                  <span className="empty-icon">📝</span>
                  <h1>No posts yet</h1>
                  <p>Be the first to share something with the community!</p>
                  <Link to={"/addpost"} className="add-post-link">
                    ✍️ Create Your First Post
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="right-sidebar">
          <div className="sidebar-card">
            <h4>🔔 Notifications</h4>
            <div className="sidebar-item">
              <span className="icon">❤️</span>
              <span className="text">New likes on your posts</span>
              <span className="badge">3</span>
            </div>
            <div className="sidebar-item">
              <span className="icon">💬</span>
              <span className="text">Comments on your posts</span>
              <span className="badge blue">2</span>
            </div>
            <div className="sidebar-item">
              <span className="icon">👤</span>
              <span className="text">New connection requests</span>
              <span className="badge">1</span>
            </div>
          </div>

          <div className="sidebar-card">
            <h4>📰 Latest News</h4>
            <div className="news-item">
              <div className="headline">Tech industry sees major shift in 2024</div>
              <span className="source">TechCrunch • 2h ago</span>
            </div>
            <div className="news-item">
              <div className="headline">New innovations in AI and machine learning</div>
              <span className="source">Wired • 4h ago</span>
            </div>
            <div className="news-item">
              <div className="headline">Community building in the digital age</div>
              <span className="source">Forbes • 6h ago</span>
            </div>
          </div>

          <div className="sidebar-card">
            <div className="ads-placeholder">
              <span className="ad-icon">📢</span>
              <div>Ad Space Available</div>
              <div style={{ fontSize: '11px', marginTop: '4px' }}>Promote your brand here</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}