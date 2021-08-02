import React, { useMemo } from "react";
import { useTable, useFilters } from "react-table";
import MockData from "../data/MOCK_DATA";
import TableColumns from "./BasicGridColumns";

function BasicGrid() {
  const memoizedData = useMemo(() => MockData, []);
  const memoizedColumns = useMemo(() => TableColumns, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        data: memoizedData,
        columns: memoizedColumns,
        manualFilters: true,
      },
      useFilters
    );

  return (
    <div>
      <table
        className="table table-sm table-hover table-bordered"
        {...getTableProps()}
      >
        <thead className="table-light">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((col) => (
                <th {...col.getHeaderProps()}>
                  {col.render("Header")}
                  <div>{col.canFilter ? col.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default BasicGrid;
