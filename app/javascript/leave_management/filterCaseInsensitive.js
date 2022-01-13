export default (filter, row) => {
  const id = filter.pivotId || filter.id;
  return (
    row[id] !== undefined ? String(row[id]).toLowerCase().startsWith(filter.value.toLowerCase()) : true
  );
};
