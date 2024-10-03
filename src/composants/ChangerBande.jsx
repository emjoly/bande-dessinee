import './ChangerBande.scss';
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import LastPageOutlinedIcon from '@mui/icons-material/LastPageOutlined';
import FirstPageOutlinedIcon from '@mui/icons-material/FirstPageOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

export default function ChangerBande({ page, setPage, totalPages }) {
  const changementBande = (event, value) => {
    setPage(value);
  };

  return (
    <div className="ChangerBande">
      <Stack spacing={2}>
        <Pagination
          page={page}
          count={totalPages}
          showFirstButton
          showLastButton
          onChange={changementBande}
          renderItem={(item) => (
            <PaginationItem
              slots={{ first: FirstPageOutlinedIcon, previous: ArrowBackOutlinedIcon, next: ArrowForwardOutlinedIcon, last: LastPageOutlinedIcon }}
              {...item}
            />
          )}
        />
      </Stack>
    </div>
  );
}
