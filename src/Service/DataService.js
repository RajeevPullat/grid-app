import MockData from "../data/MOCK_DATA";

const isNullOrUndefined = (x) => x === null || x === undefined;

function comparator(s1, s2, fieldName, desc) {
  const a = s1[fieldName];
  const b = s2[fieldName];

  if (!desc) {
    if (typeof a === "number" && typeof b === "number") {
      return a - b;
    } else {
      return a.localeCompare(b);
    }
  } else {
    if (typeof a === "number" && typeof b === "number") {
      return b - a;
    } else {
      return b.localeCompare(a);
    }
  }
}

export function SearchData(
  firstName,
  lastName,
  email,
  gender,
  sortBy,
  pageIndex,
  pageSize
) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const paginate = (array, pageIndex, pageSize) => {
        return array.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
      };

      let filteredData = MockData.filter((x) => {
        return (
          (x.first_name.indexOf(firstName) > -1 ||
            isNullOrUndefined(firstName)) &&
          (x.last_name.indexOf(lastName) > -1 || isNullOrUndefined(lastName)) &&
          (x.email.indexOf(email) > -1 || isNullOrUndefined(email)) &&
          (x.gender === gender || isNullOrUndefined(gender))
        );
      });

      let sortedData = filteredData;

      if (sortBy) {
        sortBy.forEach((s) => {
          switch (s.id) {
            case "FName":
              sortedData = sortedData.sort((a, b) =>
                comparator(a, b, "first_name", s.desc)
              );
              break;
            case "LName":
              sortedData = sortedData.sort((a, b) =>
                comparator(a, b, "last_name", s.desc)
              );
              break;
            case "Email":
              sortedData = sortedData.sort((a, b) =>
                comparator(a, b, "email", s.desc)
              );
              break;
            case "Gender":
              sortedData = sortedData.sort((a, b) =>
                comparator(a, b, "gender", s.desc)
              );
              break;
          }
        });
      }

      const paginatedData = paginate(sortedData, pageIndex, pageSize);

      const pagedResult = {
        data: paginatedData,
        pageIndex: pageIndex,
        pageSize: pageSize,
        pageCount: Math.ceil(sortedData.length / pageSize),
        totalRecords: sortedData.length,
      };

      console.log(pagedResult);
      resolve(pagedResult);
    }, 200);
  });
}
