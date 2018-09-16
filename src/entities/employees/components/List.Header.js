import React from "react";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

export const columns = [
  {
    Header: "UID",
    accessor: "uid",
    show: false
  },
  {
    Header: "로그인ID",
    accessor: "id"
  },
  {
    Header: "이름",
    accessor: "firstname"
  },
  {
    Header: "성",
    accessor: "lastname"
  },
  {
    Header: "생일",
    accessor: "birthday",
    show: false
  },
  {
    Header: "성별",
    accessor: "gender",
    show: false
  },
  {
    Header: "핸드폰",
    accessor: "phone"
  },
  {
    Header: "이메일",
    accessor: "email"
  },
  {
    expander: true,
    width: 32,
    Expander: ({ isExpanded }) =>
      isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />
  }
];
