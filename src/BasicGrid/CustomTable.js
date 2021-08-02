import React, { useEffect, useRef } from "react";
import { useTable, useFilters, useSortBy, usePagination } from "react-table";

function CustomTable({
  data,
  columns,
  isLoading,
  fetchData,
  enableFiltering,
  enableSorting,
  enablePagination,
  filters,
  sortBy,
  pageIndex,
  pageSize,
  numberOfPages,
  totalRecords,
}) {
  const initialRender = useRef(true);

  const memoizedFilters = React.useMemo(() => filters, []);
  const memoizedSortBy = React.useMemo(() => sortBy, []);

  const tableOptions = {
    data: data,
    columns: columns,
  };

  if (filters && filters.length > 0) {
    if (!tableOptions.initialState) {
      tableOptions.initialState = {};
    }
    tableOptions.initialState = {
      ...tableOptions.initialState,
      filters: memoizedFilters,
    };
  }

  if (sortBy && sortBy.length > 0) {
    if (!tableOptions.initialState) {
      tableOptions.initialState = {};
    }
    tableOptions.initialState = {
      ...tableOptions.initialState,
      sortBy: memoizedSortBy,
    };
  }

  const tableFeatures = [];
  if (enableFiltering) {
    tableOptions.manualFilters = true;
    tableFeatures.push(useFilters);
  }
  if (enableSorting) {
    tableOptions.manualSortBy = true;
    tableFeatures.push(useSortBy);
  }
  if (enablePagination) {
    tableOptions.manualPagination = true;
    tableOptions.pageCount = numberOfPages;
    tableFeatures.push(usePagination);
  }

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,

    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,

    state: {
      filters: filtersIns,
      sortBy: sortByIns,
      pageIndex: pageIndexIns,
      pageSize: pageSizeIns,
    },
  } = useTable(tableOptions, ...tableFeatures);

  useEffect(() => {
    if (initialRender.current === true) {
      initialRender.current = false;
    } else {
      console.log("Filter/Sort changed..");
      console.log(sortByIns);
      fetchData(filtersIns || [], sortByIns || [], pageIndexIns, pageSizeIns);
    }
  }, [fetchData, filtersIns, sortByIns, pageIndexIns, pageSizeIns]);

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
                  <div {...(enableSorting && col.getSortByToggleProps())}>
                    {col.render("Header")}

                    {enableSorting && col.isSorted
                      ? col.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </div>
                  {enableFiltering && (
                    <div>{col.canFilter ? col.render("Filter") : null}</div>
                  )}
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
        <tfoot>
          <tr>
            <td colSpan="10000">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <div className="ps-2">
                  Showing {pageIndexIns * pageSizeIns + 1} -{" "}
                  {pageIndexIns * pageSizeIns + pageSizeIns > totalRecords
                    ? totalRecords
                    : pageIndexIns * pageSizeIns + pageSizeIns}{" "}
                  of {totalRecords} results
                </div>
                <span className="me-2">
                  Page{" "}
                  <strong>
                    {pageIndex + 1} of {pageOptions.length}
                  </strong>{" "}
                </span>
              </div>

              <nav
                aria-label="Page navigation example"
                className="d-flex align-items-center justify-content-between ps-2"
              >
                <ul className="pagination">
                  <li
                    className={
                      !canPreviousPage ? "page-item disabled" : "page-item"
                    }
                  >
                    <button
                      className="page-link"
                      onClick={() => gotoPage(0)}
                      disabled={!canPreviousPage}
                    >
                      {"<<"}
                    </button>
                  </li>

                  <li
                    className={
                      !canPreviousPage ? "page-item disabled" : "page-item"
                    }
                  >
                    <button
                      className="page-link"
                      onClick={() => previousPage()}
                      disabled={!canPreviousPage}
                    >
                      {"<"}
                    </button>
                  </li>
                  <li
                    className={
                      !canNextPage ? "page-item disabled" : "page-item"
                    }
                  >
                    <button
                      className="page-link"
                      onClick={() => nextPage()}
                      disabled={!canNextPage}
                    >
                      {">"}
                    </button>
                  </li>
                  <li
                    className={
                      !canNextPage ? "page-item disabled" : "page-item"
                    }
                  >
                    <button
                      className="page-link"
                      onClick={() => gotoPage(pageCount - 1)}
                      disabled={!canNextPage}
                    >
                      {">>"}
                    </button>
                  </li>
                </ul>
                <div className="d-flex align-items-center">
                  <span className="flex-shrink-0 pe-2">Go to page: </span>
                  <input
                    className="form-control form-control-sm me-2"
                    type="number"
                    defaultValue={pageIndex + 1}
                    onChange={(e) => {
                      const page = e.target.value
                        ? Number(e.target.value) - 1
                        : 0;
                      gotoPage(page);
                    }}
                    style={{ width: "100px" }}
                  />

                  <select
                    className="form-select form-select-sm me-2"
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                    }}
                  >
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                      </option>
                    ))}
                  </select>
                </div>
              </nav>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default CustomTable;
