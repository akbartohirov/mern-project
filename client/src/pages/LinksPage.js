import React, { useState, useContext, useCallback, useEffect } from "react";
import useHttp from "../hooks/http.hooks";
import AuthContext from "../context/AuthContext";
import baseURL from "../baseURL";
import Loading from "../components/Loading";
import LinkList from "../components/LinkList";

const LinksPage = () => {
  const [links, setLinks] = useState([]);
  const { loading, getReq } = useHttp();
  const { token } = useContext(AuthContext);

  const getLinks = useCallback(async () => {
    try {
      const data = await getReq(`${baseURL}/api/link`, { Authorization: "Bearer " + token });
      setLinks(data.data);
    } catch (err) {}
  }, [token, getReq]);

  useEffect(() => {
    getLinks();
  }, [getLinks]);

  if (loading) {
    return <Loading />;
  }

  console.log(links);

  return <div>{!loading && links && <LinkList links={links} />}</div>;
};

export default LinksPage;
