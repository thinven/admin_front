import React from "react";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

import { Codes } from "support/utils";

export const columns = useCodes => [
  {
    Header: "UID",
    accessor: "uid",
    show: false
  },
  {
    Header: "공통코드그룹명",
    accessor: "commonCodeGroup.name"
  },
  {
    Header: "코드",
    accessor: "code"
  },
  {
    Header: "코드명",
    accessor: "name"
  },
  {
    Header: "표시순서",
    accessor: "ordered"
  },
  {
    Header: "사용여부",
    id: "use",
    accessor: d => Codes.label(useCodes, d.use)
  },
  {
    expander: true,
    width: 40,
    Expander: ({ isExpanded }) =>
      isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />
  }
];
