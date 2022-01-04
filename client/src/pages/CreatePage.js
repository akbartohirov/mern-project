import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import useHttp from "../hooks/http.hooks";
import { useHistory } from "react-router-dom";
import Loading from "../components/Loading";
import baseURL from "../baseURL";

const CreatePage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const { postReq, loading, error } = useHttp();
  const [link, setLink] = useState("");

  const onKeyPress = async (e) => {
    if (e.key === "Enter") {
      try {
        const newLink = await postReq(
          `${baseURL}/api/link/generate`,
          { from: link },
          { Authorization: "Bearer " + auth.token }
        );
        const id = newLink.data.link._id;
        history.push(`/detail/${id}`);
      } catch (err) {}
    }
  };

  if (loading) {
    return <Loading />;
  } else if (error) {
    return (
      <div>
        <h1> {error} </h1>
      </div>
    );
  } else {
    return (
      <div className="row">
        <div className="col s8 offset-s2 pt-1">
          <div className="input-field">
            <input
              onChange={(e) => setLink(e.target.value)}
              value={link}
              type="text"
              id="link"
              placeholder="Provide your link"
              required
              onKeyPress={(e) => onKeyPress(e)}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default CreatePage;
