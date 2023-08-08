import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { URL } from "../utils/URL";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Subscription() {
  const [s_sub, sets_sub] = useState("");
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const onClickSubscription = async () => {
    try {
      if (s_sub) {
        const data = {
          subscription: {
            user_id: user?.id,
            plan_id: s_sub,
          },
        };

        const res = await axios.post(`${URL}subscriptions`, data, {
          Headers: {
            Accept: "application/json",
            Authorization: token,
          },
        });
        console.log(res.data);
        if (res.data?.success) {
          alert("Subscription created successfully");
          navigate("/");
        }
      } else {
        alert("Please select a plan first");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-100 w-100 subscription-screen">
      <div className="content-container text-container">
        <div className="contents ">
          <h4 className="d-block welcome-text">Welcome to the open ai </h4>
          <h1>Select Your Magiks plan</h1>
          <p className="sub-heading">
            It is a long established fact that a reade
          </p>

          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy. Various versions have evolved over the
            years, sometimes by accident, sometimes on purpose (injected humour
            and the like).
          </p>
          <p className="sub-heading">
            It is a long established fact that a reade
          </p>
          <p className="sub-heading">
            It is a long established fact that a reade
          </p>
        </div>
      </div>
      <div className="content-container subscription-container">
        {[
          { id: 1, title: "Trail" },
          { id: 2, title: "Basic" },
          { id: 3, title: "Pro" },
        ].map((item, index) => (
          <div key={index} className="subscription-cards">
            <div
              onClick={() => sets_sub(item?.id)}
              className={
                s_sub === item.id
                  ? `subscription-card-active`
                  : `subscription-card`
              }
            >
              <div className="radio-button-container">
                {s_sub === item.id ? (
                  <div className="active-radio">
                    <div className="active-radio-inner"></div>
                  </div>
                ) : (
                  <div className="inactive-radio" />
                )}
              </div>
              <div className="subscription-heading">
                <p className="subscription-name">{item?.title}</p>
                <p className="subscription-detail">
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout
                </p>
              </div>
              <div className="price-container">
                <p className="subscription-name">{item.price}</p>
              </div>
            </div>
          </div>
        ))}
        <Button
          onClick={onClickSubscription}
          color="#03FFFF"
          className="btn-primary continue-btn"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
