import styled from '@emotion/styled';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: 'var(--neutral)',
  '&:hover': {
    backgroundColor: 'var(--neutral)',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: '100%',
  },
}));

const SearchIconWrapper = styled('div')(() => ({
  paddingLeft: '8px',
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--black)'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  position: 'relative',
  color: 'var(--lightGray)',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('lg')]: {
      width: '22ch',
    },
    [theme.breakpoints.up('md')]: {
      width: '14ch',
    },
  },
}));

function CustomSearchbar({ style, handleSearchChange, searchValue }) {
  return (
    <Search style={style}>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search or type..."
        inputProps={{ 'aria-label': 'search' }}
        value={searchValue}
        onChange={handleSearchChange}
      />
    </Search>
  )
}

export default CustomSearchbar;
