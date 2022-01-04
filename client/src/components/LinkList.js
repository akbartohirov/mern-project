import React from "react";
import { Link } from "react-router-dom";

const LinkList = ({ links }) => {
  return links ? (
    <div className="pt-1">
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Original links</th>
            <th>Short link</th>
            <th>Open link</th>
          </tr>
        </thead>

        <tbody>
          {links.map((link, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <th>{link.from}</th>
              <th>{link.to}</th>
              <th>
                <Link to={`/detail/${link._id}`}>Open</Link>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div>
      <h1> There is no link </h1>
    </div>
  );
};

export default LinkList;
