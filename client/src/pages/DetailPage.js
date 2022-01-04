import React, { useState, useEffect, useCallback, useContext } from "react";
import useHttp from "../hooks/http.hooks";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Loading from "../components/Loading";
import LinkCard from "../components/LinkCard";
import baseURL from "../baseURL";

const DetailPage = () => {
  const { getReq, loading } = useHttp();
  const linkId = useParams().id;
  const { token } = useContext(AuthContext);
  const [link, setLink] = useState(null);

  const getLink = useCallback(async () => {
    try {
      const data = await getReq(`${baseURL}/api/link/${linkId}`, {
        Authorization: "Bearer " + token,
      });
      setLink(data);
    } catch (err) {}
  }, [token, linkId, getReq]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (loading) {
    return <Loading />;
  }

  return <React.Fragment>{!loading && link && <LinkCard link={link.data.link} />}</React.Fragment>;
};

export default DetailPage;
