import React from 'react';
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  usePagination,
} from 'react-table';
import { MdChevronRight, MdLastPage, MdChevronLeft, MdFirstPage } from 'react-icons/md'
import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';
import './forms.scss';

const Styles = styled.div`
  padding: 1rem;
  display: inline-block;
  display: flex;
  white-space: pre-wrap;
  width: auto;
  heigth: 30px;
  justify-content: center;
  margin:auto !important;
  input,textarea {
    background-color: rgb(255, 255, 255);
    border-collapse: collapse;
    border-color: rgb(118, 118, 118);
    border-style: solid;
    border-width: 1px;
    box-sizing: border-box;
    color: rgb(0, 0, 0);
    cursor: text;
    display: inline-block;
    flex-direction: column;
    font-size: 13.3333px;
    font-weight: 400;
    height: 32px;
    max-height:34px;
    letter-spacing: normal;
    line-height: normal;
    margin: 0px;
    overflow-wrap: break-word;
    padding: 2px;
    resize: both;
    text-align: start;
    white-space: pre-wrap;
  }

  select {
    width: auto;
  }
  span {
    width: auto;
  }
  button {
    align-items: flex-start;
    background-color: #0c4465;
    border-color: rgb(255, 255, 255);
    border-radius: 5px;
    border-style: none;
    border-width: 0px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 2px 0px;
    box-sizing: border-box;
    color: rgb(255, 255, 255);
    cursor: default;
    display: block;
    font-size: 13.3333px;
    font-stretch: 100%;
    font-weight: 400;
    height: 30px;
    letter-spacing: normal;
    line-height: normal;
    margin: 0px;
    padding: 1px 6px;
    text-align: center;
    width: 30.25px;
    word-spacing: 0px;
  }
`;

function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <Styles
      style={{
        justifyContent: 'start',
      }}
    >
      <h4>
        Busqueda Global 🔎 :
        <TextareaAutosize
          style={{
            width: 'auto',
          }}
          value={value || ''}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} filas...`}
        />
      </h4>
      <br/>
    </Styles>
  );
}

function SelectColumnFilter({ column: { filterValue, setFilter, preFilteredRows, id }, }) {
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <div className="row" style={{
      margin: "0.5rem",
      minWidth: "0px",
      maxHeight:"34px",
    }}>
      <select
        className="text-input"
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
        style={{
          minWidth: "0px",
          maxHeight:"34px",
        }}
      >
        <option value="">All</option>
        {options.sort().map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;
  return (
    <div className="row" style={{
      margin: "0.5rem",
      minWidth: "0px"
    }}>
      <TextareaAutosize
        className="text-input"
        minRows={1}
        maxRows={2}
        value={filterValue || ''}

        onChange={(e) => {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`${count} Registros `}

      />
    </div>
  );
}

function MyTable({ columns, data, noPagination, hiddenColumns, globalSearch }) {
  const defaultColumn = React.useMemo(() => {
    return {
      Filter: DefaultColumnFilter,
    };
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
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
    state: { pageIndex, pageSize},
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      disableMultiSort: false,
      initialState: {
        pageSize: 50,
        hiddenColumns: hiddenColumns,
      },
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,
  );
  const pageSizeOptions = [10, 20, 50, 100];
  return (
    <div >
      <div className="row" style={{
            display: globalSearch,
          }}>
        <div className="col">
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        </div>
      </div>
      <div className="row align-items-start">
        <div className="col-12">
          <div
            className="table-responsive"
          // style={{
          //   maxWidth: screen.width - 20,
          // }}
          >
            <table
              className="table table-bordered table-hover align-middle text-center"
              style={{
                tableHoverColor: '#85c4ffd0',
              }}
              {...getTableProps()}
            >
              <thead className="thead-light">
                {headerGroups.map((headerGroup,key ) => (
                  <tr key={key} {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column,key) => {
                      // console.log(column)
                      return(
                      <th key={key} scope="col" {...column.style} {...column.getHeaderProps({
                        style: { minWidth: column.minWidth, width: column.width },
                      })}>
                        <div {...column.getSortByToggleProps()} >
                          {column.render('Header')}
                          {/* Add a sort direction indicator */}
                          {column.isSorted
                            ? column.isSortedDesc
                              ? `${"     "}🔽`
                              : `${"     "}🔼`
                            : `${"     "}`}
                          {/* Render the columns filter UI */}
                        </div>
                        <hr style={{ border: "2px"}} />
                        {column.canFilter ? column.render('Filter') : null}
                      </th>
                    )})}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row, key) => {
                  prepareRow(row);
                  return (
                    <tr key={key}{...row.getRowProps()}>
                      {row.cells.map((cell,key ) => (
                        <td key={key} {...cell.getCellProps()} >{cell.render('Cell')}</td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <Styles
          style={{
            display: noPagination,
            
          }}
        >

          <MdFirstPage onClick={() => gotoPage(0)} disabled={!canPreviousPage} style={{fontSize:"30px"}}/>
          <MdChevronLeft onClick={() => previousPage()} disabled={!canPreviousPage} style={{fontSize:"30px"}} />
          <span>
            Pagina
            <strong>
              {pageIndex + 1} de {pageOptions.length}
            </strong>
          </span>
          <span>| Ir a la pagina: </span>
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{
              width: '100px',
            }}
          />
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {pageSizeOptions.map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Mostrar {pageSize} Filas
              </option>
            ))}
          </select>
          <MdChevronRight onClick={() => nextPage()} disabled={!canNextPage} style={{fontSize:"30px"}}></MdChevronRight>
          <MdLastPage onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} style={{fontSize:"30px"}}></MdLastPage>
        </Styles>
      </div>
    </div>
  );
}

const App = (props) => {
  const { data } = props;
  const { columns } = props;
  const nopag = props.nopag ? 'none' : 'flex';
  const hiddenColumns  = props.hiddenColumns? props.hiddenColumns: [];
  const noGlobalS= props.noGlobalSearch? 'none': 'flex';
  return (
    <div style={{maxWidth: "95vw"}}>
      <MyTable columns={columns} data={data} noPagination={nopag} hiddenColumns={hiddenColumns} globalSearch={noGlobalS}/>
    </div>
  );
};

export default App;
export { SelectColumnFilter, Styles };
