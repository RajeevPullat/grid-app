import React from "react";
import ContainsFilter from "./ContainsFilter";
import DropdownFilter from "./DropdownFilter";

const columns = [
  {
    id: "Id",
    Header: "Id",
    accessor: "id",
    disableFilters: true,
    disableSortBy: true,
  },
  {
    id: "FName",
    Header: "First Name",
    accessor: "first_name",
    Filter: ContainsFilter,
  },
  {
    id: "LName",
    Header: "Last Name",
    accessor: "last_name",
    Filter: ContainsFilter,
  },
  {
    id: "Email",
    Header: "Email",
    accessor: "email",
    Filter: ContainsFilter,
  },
  {
    id: "Gender",
    Header: "Gender",
    accessor: "gender",
    Filter: (props) => (
      <DropdownFilter
        {...props}
        options={[
          { id: 1, text: "M" },
          { id: 2, text: "F" },
        ]}
      />
    ),
  },
  ,
];

export default columns;
