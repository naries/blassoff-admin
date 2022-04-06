import React, { useMemo } from "react";
import { useTable } from "react-table";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import MOCK_DATA from "./data.json";
import { COLUMNS } from "./colums";
import "./table.css";

export const BasicTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <>
      <Table>
        <Thead>
          {/* {headerGroups.map((headerGroup) => ( */}
          <Tr>
            {headerGroups[0].headers.map((column, index) => (
              <Th key={index}>{column.render("Header")}</Th>
            ))}
          </Tr>
          {/* ))} */}
        </Thead>

        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
};
