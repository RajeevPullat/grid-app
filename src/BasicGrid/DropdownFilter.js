import React from "react";

function DropdownFilter({ column: { filterValue, setFilter }, options }) {
  return (
    <div>
      <select
        className="form-select form-select-sm"
        value={filterValue ? filterValue.id : "0"}
        onChange={(e) => {
          const selectedOption = e.target.selectedOptions[0];
          setFilter({
            id: selectedOption.value,
            text: selectedOption.text,
          });
        }}
      >
        <option key={0} value={0}>
          Any
        </option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.text}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropdownFilter;
