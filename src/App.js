import React, { useEffect } from "react";
import { useState } from "react";
import TableColumns from "./BasicGrid/BasicGridColumns";
import CustomTable from "./BasicGrid/CustomTable";
import { SearchData } from "./Service/DataService";

function App() {
  const [pData, setData] = useState({
    data: [],
    pageCount: 0,
    pageIndex: 0,
    pageSize: 10,
    totalRecords: 0,
  });
  const [isLoading, setLoading] = useState(false);

  const initFilter = [];
  // const initFilter = [
  //   {
  //     id: "FName",
  //     value: "S",
  //   },
  //   {
  //     id: "Gender",
  //     value: {
  //       id: 2,
  //       text: "F",
  //     },
  //   },
  // ];

  const initSort = [];
  // const initSort = [
  //   {
  //     id: "FName",
  //     desc: true,
  //   },
  // ];

  const fetchData = React.useCallback(
    async (filters, sortBy, pageIndex, pageSize) => {
      console.log("Here...");
      const fnameVal = filters.find((x) => x.id === "FName")?.value;
      const lnameVal = filters.find((x) => x.id === "LName")?.value;
      const emailVal = filters.find((x) => x.id === "Email")?.value;
      const genderFilter = filters.find((x) => x.id === "Gender")?.value;

      let genderVal = undefined;

      if (genderFilter && genderFilter.id !== "0") {
        genderVal = genderFilter.text;
      }

      setLoading(true);
      const pagedResult = await SearchData(
        fnameVal,
        lnameVal,
        emailVal,
        genderVal,
        sortBy,
        pageIndex,
        pageSize
      );

      setData((d) => ({
        ...d,
        data: pagedResult.data,
        pageIndex: pagedResult.pageIndex,
        pageSize: pagedResult.pageSize,
        pageCount: pagedResult.pageCount,
        totalRecords: pagedResult.totalRecords,
      }));
      setLoading(false);
    },
    []
  );

  useEffect(() => {
    console.log("UseEFFECT fire");

    fetchData(initFilter, initSort, 0, 10);
  }, [fetchData]);

  const memoizedColumns = React.useMemo(() => TableColumns, []);

  return (
    <div className="App">
      <CustomTable
        columns={memoizedColumns}
        data={pData.data}
        isLoading={isLoading}
        fetchData={fetchData}
        filters={initFilter}
        enableSorting={true}
        enableFiltering={true}
        enablePagination={true}
        sortBy={initSort}
        pageIndex={pData.pageIndex}
        pageSize={pData.pageSize}
        numberOfPages={pData.pageCount}
        totalRecords={pData.totalRecords}
      />
    </div>
  );
}

export default App;
