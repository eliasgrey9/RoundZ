import axios from "axios";
import React, { useEffect, useState } from "react";
import "./singlePositionView.css";
import { useParams } from "react-router-dom";

const SinglePositionView = () => {
  const [dataFromApi, setDataFromApi] = useState({});

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

  return <div className="singlePositionBody">Not sure if I need this page</div>;
};

export default SinglePositionView;
