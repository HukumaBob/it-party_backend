import React from "react";
import MuiPagination from "@mui/material/Pagination";
import useMediaQuery from '@mui/material/useMediaQuery'

type TProps = {
  pageNumber: number;
  pageCount: number;
  handlePageChange: (_: any, pageNumber: number) => void;
}

export const Pagination: React.FC<TProps> = ({pageNumber, pageCount, handlePageChange}) => {
  const isPhoneSM = useMediaQuery('(max-width: 576px)')

  return (
    <MuiPagination
      count={pageCount}
      page={pageNumber}
      onChange={handlePageChange}
      shape="rounded"
      siblingCount={isPhoneSM ? 0 : 1}
      sx={{
        margin: '20px auto 0',
        '.MuiPaginationItem-root': {
          color: 'var(--c-def-black)',
          fontSize: '16px',
          '&:hover': {
            backgroundColor: 'var(--c-black-300)',
          },
        },
        '.Mui-selected': {
          backgroundColor: 'var(--c-def-blue) !important',
          color: 'var(--c-def-white)',
        },
        '@media (min-width: 768px)': {
          '.MuiPaginationItem-root': {
            fontSize: '18px',
            minWidth: 42,
            minHeight: 42,
          },
        },
      }}
    />
  );
};
