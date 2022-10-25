import { FC } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { DispatchAction } from 'src/App';

import styles from './Search.module.scss';

interface SearchProps {
  searchTerm: string;
  dispatch: (action: DispatchAction) => void;
}

export const Search: FC<SearchProps> = props => {
  const { dispatch, searchTerm } = props;

  const onChange = value => {
    dispatch({type: 'setSearchTerm', payload: value})
  };

  return (
    <OutlinedInput
      className={styles.input}
      placeholder="Search by country/name/username"
      value={searchTerm}
      type="search"
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
      onChange={e => onChange(e.target.value)}
    />
  );
};
