import { Row } from 'src/components';

const search = (rows: Row[], searchTerm: string): Row[] => {
  if (!searchTerm) return rows;

  const helper = (a, b) => a.toLowerCase().includes(b.toLowerCase());

  const filtered = rows.filter(({name, country, username}) => 
    [name, country, username].some((v) => helper(v, searchTerm)));

  return filtered;
}

export default search;