const joinList = (list: string[]): string => {
  return list.map((item: string): string =>
    item.trim(),
  ).join(' ');
};

export const fragmentsToString = (fragments: string[]): string => {
  return fragments ? joinList(fragments) : '';
};
