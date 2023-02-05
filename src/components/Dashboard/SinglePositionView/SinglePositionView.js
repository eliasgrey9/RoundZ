import axios from "axios";
import React, { useEffect, useState } from "react";
import "./singlePositionView.css";
import { useParams } from "react-router-dom";
import EmailInviteForm from "./EmailInviteForm";

const SinglePositionView = () => {
  const [dataFromApi, setDataFromApi] = useState({});
  const [showInvites, setShowInvites] = useState(true);

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

  const showInvitesBtn = () => {
    setShowInvites(true);
  };

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
        <button onClick={showInvitesBtn}>Invites</button>
        <button>To Evalute</button>
      </div>

      {showInvites ? (
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
    </div>
  );
};

export default SinglePositionView;
