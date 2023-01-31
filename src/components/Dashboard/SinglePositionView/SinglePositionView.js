import axios from "axios";
import React, { useEffect, useState } from "react";
import "./singlePositionView.css";
import { useParams } from "react-router-dom";

const SinglePositionView = () => {
  const [dataFromApi, setDataFromApi] = useState([]);
  const [showInvites, setShowInvites] = useState(true);
  const [showEditPositionDetails, setShowEditPositionDetails] = useState(false);

  const params = useParams();

  const deleteQuestion = async (id) => {
    const response = await axios.delete(
      `http://localhost:8080/api/jobs/deleteSingleQuestion/${id}`
    );

    setDataFromApi({
      ...dataFromApi,
      questions: dataFromApi.questions.filter((item) => item.id !== id),
    });
  };

  useEffect(() => {
    const renderSinglePosition = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/jobs/singlePosition/${params.id}`
      );
      setDataFromApi(response.data);
    };
    renderSinglePosition();
  }, []);

  const positionDetailsBtn = () => {
    setShowInvites(false);
    setShowEditPositionDetails(true);
  };
  const showInvitesBtn = () => {
    setShowInvites(true);
    setShowEditPositionDetails(false);
  };

  const editQuestion = (id) => {
    console.log(id);
  };

  return (
    <div className="singlePositionBody">
      <div>
        <button onClick={showInvitesBtn}>Invites</button>
        <button>To Evalute</button>
        <button onClick={positionDetailsBtn}>Edit Position Details</button>
      </div>

      {showInvites ? (
        <>
          <div>
            <h3>
              You have invited {dataFromApi.invitations} candidates for this
              positon
            </h3>
          </div>

          <form>
            <div>
              <input placeholder="Full Name"></input>
              <input placeholder="Email"></input>
              <input type="submit" value="Invite"></input>
            </div>
          </form>
        </>
      ) : null}
      {showEditPositionDetails ? (
        <div>
          <div>
            <h1>{dataFromApi.title}</h1>
          </div>
          {dataFromApi.questions.map((question) => (
            <div key={question.id}>
              <div>{question.question}</div>
              <button
                onClick={() => {
                  deleteQuestion(question.id);
                }}
              >
                x
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SinglePositionView;
