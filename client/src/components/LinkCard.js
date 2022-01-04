import React, { useEffect, useState } from "react";

const LinkCard = ({ link }) => {
  return (
    <div className="pt-1">
      <h2>Links</h2>
      <p>
        Your link:{" "}
        <a href={link.to} target="_blank">
          {link.to}
        </a>{" "}
      </p>

      <p>
        From:{" "}
        <a href={link.from} target="_blank">
          {link.from}
        </a>{" "}
      </p>

      <p>
        Count of clicks: <strong>{link.clicks}</strong>{" "}
      </p>

      <p>
        Created at: <strong>{new Date(link.date).toLocaleDateString()}</strong>{" "}
      </p>
    </div>
  );
};

export default LinkCard;
