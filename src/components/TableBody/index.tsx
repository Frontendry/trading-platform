// React Modules
import { useContext } from "react";

// Context
import syntheticIndicesContext from "../../context/syntheticIndicesContext";
import Loader from "./Loader";

// Components
import TableBodyRow from "./TableBodyRow";

const TableBody = () => {
  const contextVal = useContext(syntheticIndicesContext);
  const syntheticIndicesResults = contextVal?.syntheticIndicesResults;

  return (
    <div className="text-white">
      {typeof syntheticIndicesResults !== "undefined" &&
      syntheticIndicesResults?.length < 1 ? (
        <Loader />
      ) : (
        syntheticIndicesResults?.map((syntheticIndex, index) => (
          <TableBodyRow
            key={syntheticIndex.id}
            syntheticIndexItemData={syntheticIndex}
            index={index}
          />
        ))
      )}
    </div>
  );
};

export default TableBody;
