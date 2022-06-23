import ReactPaginate from 'react-paginate'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import PropTypes from 'prop-types'

const TablePagination = ({ pageCount, onChangePage, currentPage, totalItems }) => {
  const handleChangePage = ({ selected }) => {
    if (selected + 1 !== currentPage) {
      onChangePage(selected + 1)
    }
  }

  return pageCount ? (
    <div className="flex flex-col items-center px-8 py-4 text-sm sm:flex-row">
      <ReactPaginate
        previousLabel={<FiChevronLeft size={'1rem'} />}
        nextLabel={<FiChevronRight size={'1rem'} />}
        breakLabel="..."
        breakClassName="flex justify-center items-center h-8 w-8  ml-1 rounded-full"
        pageCount={pageCount}
        initialPage={currentPage - 1}
        forcePage={currentPage - 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handleChangePage}
        pageLabelBuilder={(p) => <div className="flex h-8 w-8 items-center justify-center rounded-md">{p}</div>}
        containerClassName="flex pagination"
        pageClassName="custom__pagination__item"
        previousClassName="custom__pagination__item"
        nextClassName="custom__pagination__item"
        subContainerClassName="pages pagination"
        activeClassName="custom__pagination__item custom__pagination__item--active"
      />
      {currentPage && (
        <div className="mt-2 ml-2 sm:mt-0">
          Trang {currentPage}/{pageCount} {totalItems && `- Tổng: ${totalItems}`}
        </div>
      )}
    </div>
  ) : null
}

TablePagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number,
}

TablePagination.defaultProps = {
  pageCount: 0,
  onChangePage: () => {},
  currentPage: 0,
  totalItems: 0,
}

export default TablePagination
