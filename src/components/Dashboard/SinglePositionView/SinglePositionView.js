import axios from "axios";
import React, { useEffect, useState } from "react";
import "./singlePositionView.css";
import { useParams } from "react-router-dom";

const SinglePositionView = () => {
  const [dataFromApi, setDataFromApi] = useState({});
  const [showInvites, setShowInvites] = useState(true);
  const [showEditPositionDetails, setShowEditPositionDetails] = useState(false);
  const [newQuestionInput, setNewQuestionInput] = useState("");
  const [newQuestionsArray, setNewQuestionsArray] = useState([]);

  const params = useParams();

  const deleteQuestion = async (id) => {
    if (!id) {
      return;
    } else {
      await axios.delete(
        `http://localhost:8080/api/jobs/deleteSingleQuestion/${id}`
      );
    }

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

  const renderNewQuestionBeforeSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      question: newQuestionInput,
    };

    setDataFromApi({
      ...dataFromApi,
      questions: [...dataFromApi.questions, payload],
    });

    newQuestionsArray.push(newQuestionInput);

    setNewQuestionInput("");
  };

  const updateDetails = async (e) => {
    e.preventDefault();

    if (newQuestionsArray.length) {
      const payload = {
        positionId: dataFromApi.id,
        questions: newQuestionsArray,
      };
      const response = await axios.put(
        "http://localhost:8080/api/jobs/updateDetails/",
        payload
      );

      const result = { ...dataFromApi, ...response.data };
      setDataFromApi(result);
      setNewQuestionsArray([]);
      setNewQuestionInput("");
    } else {
      return;
    }
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
              position
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

          <form onSubmit={updateDetails}>
            <input
              onChange={(e) => {
                setNewQuestionInput(e.target.value);
              }}
              placeholder="Add another question"
              value={newQuestionInput}
            ></input>
            <button onClick={renderNewQuestionBeforeSubmit}>
              Add Question
            </button>
            <input type="submit" value="Update Details"></input>
          </form>
          <button
            onClick={() => {
              window.location.reload();
            }}
          >
            Discard changes
          </button>

          {dataFromApi.questions.map((question) => (
            <div key={question.id}>
              {question.id ? (
                <div>
                  <div>{question.question}</div>
                  <button
                    onClick={() => {
                      deleteQuestion(question.id);
                    }}
                  >
                    x
                  </button>
                </div>
              ) : (
                <div>{question.question}</div>
              )}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SinglePositionView;
