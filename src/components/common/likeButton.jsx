import React from "react";

const LikeButton = ({ liked, onClick }) => {
  let classes = "btn btn-sm fa fa-heart";
  if (!liked) classes += "-o";
  return <i className={classes} onClick={onClick} aria-hidden="true" />;
};

export default LikeButton;
