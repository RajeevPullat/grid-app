import React from "react";
import { useAsyncDebounce } from "react-table";

function ContainsFilter({ column: { filterValue, setFilter } }) {
  const onChange = useAsyncDebounce((value) => {
    setFilter(value);
  }, 200);

  return (
    <div className="input-group input-group-sm">
      <input
        type="text"
        className="form-control form-control-sm"
        value={filterValue || ""}
        onChange={(e) => {
          onChange(e.target.value || undefined);
        }}
      />
      <button
        className="btn btn-secondary"
        type="button"
        id="button-addon2"
        onClick={(e) => {
          setFilter(undefined);
        }}
      >
        &times;
      </button>
    </div>
  );
}

export default ContainsFilter;
