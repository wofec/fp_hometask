import { FC } from 'react';
import { useState, useEffect, useReducer } from 'react';
import { StyledEngineProvider } from '@mui/material/styles';

import { Image, User, Account } from '../types';
import { Table, Filters, Sort, Search, Row } from './components';
import { getImages, getUsers, getAccounts } from './mocks/api';
import dataConverter from 'src/utils/dataConverter';
import sortRowsBy from 'src/utils/sortRowsBy';
import search from 'src/utils/search';

import styles from './App.module.scss';

export interface DispatchAction {
  type: string;
  payload: string;
};

interface State {
  sortBy: string;
  searchTerm: string;
}

const initialState = {
  sortBy: '',
  searchTerm: '',
};

export const App: FC = () => {
  const [data, setData] = useState<Row[]>([]);
  const [processedRows, setProcessedRows] = useState<Row[]>([]);

  const [filterFns, setFilterFns] = useState<Function[]>([]);

  const [store, dispatch] = useReducer((state: State, action: DispatchAction) => {
    switch (action.type) {
      case 'setSortBy':
        return {...state, sortBy: action.payload};
      case 'setSearchTerm': {
        return {...state, searchTerm: action.payload};
      }
      default:
        return {...state}; 
    }
  }, initialState);

  useEffect(() => {
    // fetching data from API
    Promise.all([
      getImages(),
      getUsers(),
      getAccounts(),
    ]).then(([images, users, accounts]: [Image[], User[], Account[]]) => {
      setData(dataConverter(users, accounts, images));
    });
  }, []);

  useEffect(() => {
    setProcessedRows(
      sortRowsBy(
        search(
          data.filter((r) => 
            !filterFns.length || filterFns.some((fn) => fn(r))),
          store.searchTerm,
        ),
        store.sortBy,
      ),
    );
  }, [store, data, filterFns]);

  return (
    <StyledEngineProvider injectFirst>
      <div className="App">
        <div className={styles.container}>
          <div className={styles.sortFilterContainer}>
            <Filters setFilterFns={setFilterFns}/>
            <Sort dispatch={dispatch} />
          </div>
          <Search dispatch={dispatch} searchTerm={store.searchTerm}/>
        </div>
        <Table rows={processedRows} />
      </div>
    </StyledEngineProvider>
  );
};
