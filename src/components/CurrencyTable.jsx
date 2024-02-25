import React from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { FaArrowCircleDown } from "react-icons/fa";
import PropTypes from "prop-types";

function CurrencyTable({ allConversions }) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Currency Code",
        accessor: "currencyCode",
      },
      {
        Header: "Currency Name",
        accessor: "currencyName",
      },

      {
        Header: "Exchange Rate",
        accessor: "exchangeRate",
      },
    ],
    []
  );

  const data = React.useMemo(() => {
    return Object.keys(allConversions).map((currency) => ({
      currencyName: currency,
      currencyCode: currency,
      exchangeRate: allConversions[currency],
    }));
  }, [allConversions]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    state: { pageIndex },
    pageCount,
  } = useTable({ columns, data }, useSortBy, usePagination);

  return (
    <>
      <div className="table-container">
        <table
          className="responsive-table"
          {...getTableProps()}
          style={{
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            borderCollapse: "collapse",
            width: "100%",
            borderRadius: "5px",
          }}
        >
          <thead style={{ textAlign: "justify" }}>
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    key={column.id}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    {column.isSorted && (
                      <span style={{ margin: "5px" }}>
                        {column.isSortedDesc ? (
                          <FaArrowAltCircleUp />
                        ) : (
                          <FaArrowCircleDown />
                        )}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr key={row.id} {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td key={cell.id} {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="btnContainer">
          <button
            className="btn-styled"
            disabled={!canPreviousPage}
            onClick={previousPage}
          >
            prev
          </button>
          <span>
            {pageIndex + 1} of {pageCount}
          </span>
          <button
            className="btn-styled"
            disabled={!canNextPage}
            onClick={nextPage}
          >
            next
          </button>
        </div>
      </div>
    </>
  );
}

CurrencyTable.propTypes = {
  allConversions: PropTypes.object.isRequired,
};

export default CurrencyTable;
