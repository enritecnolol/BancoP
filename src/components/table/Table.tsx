import React, { Fragment, useState } from "react";
import "./table.css";
import CustomButton from "../formInputs/Button";
import CustomSelect from "../formInputs/Select";

interface TableRow {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface Header {
  key: string;
  display: string;
}

interface TableProps {
  headers: Header[];
  rows: TableRow[];
  height: number;
  searchTerm: string;
}

const Table = ({ headers, rows, height, searchTerm }: TableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredRows = rows.filter((row) =>
    headers.some((header) =>
      String(row[header.key]).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = filteredRows.slice(startIndex, endIndex);

  const handleNext = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, totalPages));
  };

  const handlePrevious = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const totalOfRows = searchTerm ? filteredRows.length : rows.length;

  return (
    <Fragment>
      <table
        className="custom-table"
        style={{
          height: Math.abs(height),
        }}
      >
        <thead>
          <tr>
            {headers.map(({ key, display }) => (
              <th key={key}>{display}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, indexRow) => (
            <tr key={indexRow}>
              {headers.map(({ key }, index) => (
                <td key={index}>{row[key]}</td>
              ))}
            </tr>
          ))}
          {currentRows.length === 0 && (
            <tr>
              <td colSpan={headers.length} align="center"> no hay datos disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="table-footer">
        <div className="rowsLength">{totalOfRows} Resultados</div>
        <div className="pagination">
          <CustomButton
            onClick={handlePrevious}
            disabled={currentPage === 1}
            color="primary"
            variant="contained"
          >
            Anterior
          </CustomButton>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <CustomButton
            onClick={handleNext}
            disabled={currentPage === totalPages}
            color="primary"
            variant="contained"
          >
            Siguiente
          </CustomButton>
          <CustomSelect
            options={[5, 10, 20]}
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Table;
