const TableHead = () => {
  return (
    <div className="grid grid-cols-4">
      <div className="text-xs tracking-widest uppercase font-medium text-indigo-200 px-6 py-6">
        Synthetic Indices
      </div>
      <div className="text-xs tracking-widest uppercase font-medium text-indigo-200 px-6 py-6">
        Bid
      </div>
      <div className="text-xs tracking-widest uppercase font-medium text-indigo-200 px-6 py-6">
        Ask
      </div>
      <div className="text-xs tracking-widest uppercase font-medium text-indigo-200 px-6 py-6">
        Spread
      </div>
    </div>
  );
};

export default TableHead;
