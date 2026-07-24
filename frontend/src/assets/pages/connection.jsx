import { seeRecievedRequests, getAllUsers, sendRequest, seeRequestSend, acceptRequest, rejectRequest, seeConnections } from "../services/api";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styling/connection.css";

export default function Connection() {
  let [seeRequestRecieved, setseeRequestRecieved] = useState("");
  let [RequestSend, setRequestSend] = useState("");
  let [error, setError] = useState("");
  let [users, setUsers] = useState([]);
  let [connections, setConnections] = useState("");
  let navigate = useNavigate();
  let { user } = useAuth();
  let id = user._id ? user._id : user.id;

  useEffect(() => {
    getAllUsers(id).then((res) => {
      setUsers([...res.data.user]);
    }).catch((err) => {
      setError(err);
    });

    seeRecievedRequests(id)
      .then((res) => {
        setseeRequestRecieved([...res.data.requests]);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });

    seeRequestSend(id)
      .then((res) => {
        setRequestSend([...res.data.requests]);
      }).catch((err) => {
        console.log(err);
        setError(err);
      });

    seeConnections(id)
      .then((res) => {
        setConnections([...res.data.connection]);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  }, [seeRecievedRequests, connections]);

  async function handlSendRequest(senderId) {
    let data = {
      userId: id,
      sendTo: senderId
    };
    sendRequest(data).then((res) => {
      seeRequestSend(id)
        .then((res) => {
          setRequestSend([...res.data.requests]);
        }).catch((err) => {
          console.log(err);
          setError(err);
        });
      console.log("send successfully");
    }).catch((err) => {
      console.log(err.status);
      if (err.status == 404) {
        setError("request already exist");
      } else {
        console.log("some error", err);
        setError(err);
      }
    });
  }

  async function handleAcceptRequest(senById) {
    let data = {
      sendBy: senById,
      userId: id
    };
    acceptRequest(data).then(() => {
      console.log("request accepted successfully");
    }).catch((err) => {
      console.log("error", err);
      setError(err);
    });
  }

  async function handleRejectRequest(senById) {
    let data = {
      sendBy: senById,
      userId: id
    };
    rejectRequest(data).then(() => {
      seeRecievedRequests(id)
        .then((res) => {
          setseeRequestRecieved([...res.data.requests]);
        })
        .catch((err) => {
          console.log(err);
          setError(err);
        });
      console.log("request rejected successfully");
    }).catch((err) => {
      console.log("error", err);
      setError(err);
    });
  }

  return (
    <div className="connection-container">
      <div className="connection-wrapper">
        {/* Header */}
        <div className="connection-header">
          <h1>
            <span className="icon">🔗</span> Connections
          </h1>
          <button className="back-btn" onClick={() => navigate("/home")}>
            Back to Home
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {/* Connections Section */}
        <div className="section">
          <div className="section-header">
            <h2>👥 My Connections <span className="count">{connections.length || 0}</span></h2>
          </div>
          {connections.length > 0 ? (
            connections.map((request, index) => {
              return (
                <div key={index} className="connection-item">
                  <div className="user-info">
                    <div className="user-avatar">
                      {request.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-name">{request.username}</div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-data">
              <span className="emoji">🤝</span>
              No connections yet
            </div>
          )}
        </div>

        {/* Request Send Section */}
        <div className="section">
          <div className="section-header">
            <h2>📤 Sent Requests <span className="count blue">{RequestSend.length || 0}</span></h2>
          </div>
          {RequestSend.length > 0 ? (
            RequestSend.map((request, index) => {
              return (
                <div key={index} className="connection-item">
                  <div className="user-info">
                    <div className="user-avatar">
                      {request.sendTo.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-name">{request.sendTo.username}</div>
                  </div>
                  <span className="btn btn-secondary" style={{ fontSize: '12px' }}>⏳ Pending</span>
                </div>
              );
            })
          ) : (
            <div className="no-data">
              <span className="emoji">📭</span>
              No requests sent yet
            </div>
          )}
        </div>

        {/* Request Received Section */}
        <div className="section">
          <div className="section-header">
            <h2>📩 Received Requests <span className="count blue">{seeRequestRecieved.length || 0}</span></h2>
          </div>
          {seeRequestRecieved.length > 0 ? (
            seeRequestRecieved.map((request, index) => {
              return (
                <div key={index} className="connection-item">
                  <div className="user-info">
                    <div className="user-avatar">
                      {request.sendBy.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-name">{request.sendBy.username}</div>
                  </div>
                  <div className="action-btns">
                    <button className="btn btn-success" onClick={() => { handleAcceptRequest(request.sendBy._id); }}>
                      ✅ Accept
                    </button>
                    <button className="btn btn-danger" onClick={() => { handleRejectRequest(request.sendBy._id); }}>
                      ❌ Reject
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-data">
              <span className="emoji">📪</span>
              No requests received
            </div>
          )}
        </div>

        {/* Add to Network Section - FIXED */}
        <div className="section">
          <div className="section-header">
            <h2>🌐 Add to Your Network</h2>
          </div>
          <div className="users-grid">
            {users
              .filter(user => user._id != id) // Filter out current user
              .map((user, index) => {
                return (
                  <div key={index} className="user-card">
                    <div className="user-avatar-large">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-name">{user.username}</div>
                    <button className="btn btn-primary" onClick={() => { handlSendRequest(user._id); }}>
                      ➕ Send Request
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}