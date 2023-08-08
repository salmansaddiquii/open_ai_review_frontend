import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { URL } from "../utils/URL";
import moment from "moment";

export default function Home() {
  const { setuser, setisLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const [feedback, setfeedback] = useState("");

  const [AllFeedbacks, setAllFeedbacks] = useState([]);

  const [loading, setloading] = useState(false);

  const onPressLogoot = () => {
    setisLoggedIn(false);
    setuser(null);
  };

  const onClickContinue = async () => {
    try {
      if (feedback) {
        setloading(true);
        setfeedback("");
        const data = {
          review: {
            user_id: user?.id,
            content: feedback,
          },
        };
        const res = await axios.post(`${URL}reviews`, data, {
          Headers: {
            Accept: "application/json",
            Authorization: user?.auth_token,
          },
        });
        if (res.data?.success) {
          setloading(false);
          setAllFeedbacks((pre) => [...pre, res?.data?.data]);
        } else {
          setloading(false);
          alert(`${res.data?.message}`);
          navigate("/subscription");
        }
      } else {
        alert("Feedback couldn't be empty");
      }
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };

  return (
    <div>
      <div className="header">
        <p className="user-name">Welconme {user?.username}</p>
        <div className="d-flex">
          <div className="ml-3">
            <span
              className="material-icons-outlined"
              onClick={() => navigate("/subscription")}
            >
              subscriptions
            </span>
          </div>
          <span onClick={onPressLogoot} className="material-icons-outlined">
            logout
          </span>
        </div>
      </div>
      <div className="home-container">
        <div className="review-container">
          <p>Add Reviews</p>
          <input
            type="text"
            placeholder="Enter your review..."
            className="form-control"
            value={feedback}
            onChange={(e) => setfeedback(e.target.value)}
          />
          <Button onClick={onClickContinue} className="continue-button">
            {loading ? (
              <div className="spinner-border text-light" role="status" />
            ) : (
              "Submit"
            )}
          </Button>
        </div>
        <div className="feedbacks">
          {AllFeedbacks.map((item, index) => {
            return (
              <div key={index} className="card mb-3">
                <h5 className="card-header">GPT Response</h5>
                <div className="card-body">
                  <h5 className="card-title">{item?.content}</h5>
                  <p className="date-text">
                    {" "}
                    {moment(item?.review_date).fromNow()}
                  </p>
                  <p className="card-text">{item?.response_content}</p>
                  <p className="date-text">
                    {" "}
                    {moment(item?.response_date).fromNow()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
