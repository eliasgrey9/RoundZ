import axios from "axios";
import React, { useEffect, useState } from "react";
import "./singlePositionView.css";
import { useParams } from "react-router-dom";
import EmailInviteForm from "./EmailInviteForm";
import Candidates from "./Candidates";

const SinglePositionView = () => {
  const SHOW_TO_EVALUATE_TAB = "SHOW_TO_EVALUATE_TAB";
  const SHOW_INVITES_TAB = "SHOW_INVITES_TAB";

  const [dataFromApi, setDataFromApi] = useState({});
  const [activeTab, setActiveTab] = useState(SHOW_INVITES_TAB);
  const [boolClicker, setBoolClicker] = useState(false);

  const displayShowToEvaluateTab = () => {
    setActiveTab(SHOW_TO_EVALUATE_TAB);
    setBoolClicker(!boolClicker);
  };
  const displayInvitesTab = () => setActiveTab(SHOW_INVITES_TAB);

  const isShowToEvaluateTabActive = activeTab === SHOW_TO_EVALUATE_TAB;
  const isInvitesTabActive = activeTab === SHOW_INVITES_TAB;

  const params = useParams();

  useEffect(() => {
    const renderSinglePosition = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/jobs/singlePosition/${params.id}`
      );
      setDataFromApi(response.data);
    };
    renderSinglePosition();
  }, [params.id]);

  const updateInvitations = (response) => {
    const updatedInvites = {
      ...dataFromApi,
      invitations: response.invitations,
    };
    setDataFromApi(updatedInvites);
  };

  return (
    <div className="singlePositionBody">
      <div>
        <button onClick={displayInvitesTab}>Invites</button>
        <button onClick={displayShowToEvaluateTab}>To Evalute</button>
      </div>

      {isInvitesTabActive ? (
        <>
          <div>
            <h3>
              You have invited {dataFromApi.invitations} candidates for this
              position
            </h3>
          </div>

          <EmailInviteForm
            position_id={params.id}
            updateInvitations={updateInvitations}
          />
        </>
      ) : null}

      {isShowToEvaluateTabActive ? (
        <>
          <Candidates positionId={params.id} boolClicker={boolClicker} />
        </>
      ) : null}
    </div>
  );
};

export default SinglePositionView;
