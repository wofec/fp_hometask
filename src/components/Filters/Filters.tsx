import { useState, FC } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { Row } from 'src/components';

import styles from './Filters.module.scss';

interface FiltersProps {
  // store?: {};
  // updateStore?: (val) => void;
  setFilterFns: (val) => void;
}

const OPTIONS = [
  {
    title: 'Without posts',
    filterFn: (row: Row) => row.posts === 0,
  },
  {
    title: 'More than 100 posts',
    filterFn: (row: Row) => row.posts > 100,
  },
];

export const Filters: FC<FiltersProps> = props => {
  const { setFilterFns } = props;

  const [selectedFilter, setSelectedFilter] = useState<string[]>([]);

  const onChange = ({ title }) => {
    console.log(title); // for debugging

    let updatedFilters;

    if (selectedFilter.find(filter => filter === title)) {
      updatedFilters = selectedFilter.filter(filter => filter !== title);
    } else {
      updatedFilters = [...selectedFilter, title];
    }

    setSelectedFilter(updatedFilters);

    const filterFns = OPTIONS.filter((o) => updatedFilters.includes(o.title)).map((o) => o.filterFn)
    setFilterFns(filterFns);
  };

  return (
    <div className={styles.group}>
      <div className={styles.title}>Filter by posts</div>
      <ul className={styles.list}>
        {OPTIONS.map(option => (
          <li
            value={option.title}
            key={option.title}
            onClick={() => onChange(option)}
          >
            <Checkbox
              checked={!!selectedFilter.find(filter => filter === option.title)}
              value={option.title}
              size="small"
              color="primary"
              onChange={() => onChange(option)}
            />{' '}
            {option.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
