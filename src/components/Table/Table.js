import TablePagination from 'components/Pagination/TablePagination'
import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { HiOutlineDocumentSearch } from 'react-icons/hi'
import classNames from 'classnames'
import SpinnerLoading from 'components/SpinnerLoading'
import { ReactSortable } from 'react-sortablejs'

const Table = ({
  isLoading,
  data,
  tableColumns,
  headCellsClassName,
  bodyCellsClassName,
  tableClassName,
  totalPage,
  currentPage,
  totalItems,
  onChangePage,
  isBusy,
  onChangeSort,
  onUpdateSort,
}) => {
  const key = useMemo(() => Date.now(), [data?.length, isBusy])

  return (
    <>
      <div className="overflow-x-auto overflow-y-visible">
        <table className={classNames(tableClassName, 'min-h-4xs min-w-full')}>
          <thead>
            <tr>
              {
                // Loop over the header rows
                tableColumns?.map((item, i) => (
                  // Apply the header row props
                  <th key={i} scope="col" className={`whitespace-nowrap p-4 ${headCellsClassName || ''}`}>
                    {item.Header}
                  </th>
                ))
              }
            </tr>
          </thead>
          {/* Apply the table body props */}
          <ReactSortable
            key={key}
            tag="tbody"
            disabled={isBusy}
            list={data.map((x) => ({ ...x, chosen: true }))}
            setList={(newState) => {
              onChangeSort(newState)
            }}
            onUpdate={onUpdateSort}
            animation={220}
          >
            {data?.map((item) => (
              <tr key={item._id}>
                {tableColumns.map((colum, i) => (
                  <td key={i} className={`whitespace-nowrap p-4 ${bodyCellsClassName || ''}`}>
                    {colum.Cell(item)}
                  </td>
                ))}
              </tr>
            ))}
          </ReactSortable>
          {
            // Table rows is loading
            isLoading && (
              <tbody className="relative">
                <tr>
                  <td>
                    <div
                      className={`bg-black-3-90% absolute top-0 left-0 z-1 flex h-full w-full items-center justify-center`}
                    >
                      <SpinnerLoading className="h-8 text-primary" />
                    </div>
                  </td>
                </tr>
              </tbody>
            )
          }
          {
            // Table no data
            !isLoading && data?.length === 0 && (
              <tbody>
                <tr>
                  <td colSpan={tableColumns.length}>
                    <div className={`flex w-full items-center justify-center py-4 text-center ${bodyCellsClassName}`}>
                      <HiOutlineDocumentSearch size={'2rem'} className="mr-2" />
                      Không tìm thấy dữ liệu
                    </div>
                  </td>
                </tr>
              </tbody>
            )
          }
        </table>
      </div>
      <TablePagination
        pageCount={totalPage}
        onChangePage={onChangePage}
        currentPage={currentPage}
        totalItems={totalItems}
      />
    </>
  )
}

Table.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  headCellsClassName: PropTypes.string,
  bodyCellsClassName: PropTypes.string,
  tableClassName: PropTypes.string,
  totalPage: PropTypes.number,
  currentPage: PropTypes.number,
  totalItems: PropTypes.number,
  onChangePage: PropTypes.func,
}

Table.defaultProps = {
  isLoading: false,
  data: [],
  columns: [],
  headCellsClassName: '',
  bodyCellsClassName: '',
  tableClassName: '',
  totalPage: 0,
  currentPage: 0,
  totalItems: 0,
  onChangePage: () => {},
}

export default Table
