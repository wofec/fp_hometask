import { Row } from 'src/components';

const sortRowsBy = (rows: Row[], sortBy: string): Row[] => {
  switch (sortBy) {
    case 'asc': {
      return rows.sort((a, b) => a.lastPayments - b.lastPayments);
    }
    case 'desc': {
      return rows.sort((a, b) => b.lastPayments - a.lastPayments);
    }
    default: {
      return rows;
    }
  }
};

export default sortRowsBy;