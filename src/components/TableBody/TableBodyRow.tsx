// React Modules
import { useEffect, useRef } from "react";

// Indicators
import { UpIndicator, DownIndicator } from "../Indicators/Indicators";

import { TableBodyRowProps } from "../../utils/interfaces";

const usePrevious = <T extends unknown>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const TableBodyRow = ({ syntheticIndexItemData, index }: TableBodyRowProps) => {
  const { ask, bid, display_name } = syntheticIndexItemData;
  const prevAskCount = usePrevious(ask);
  const prevBidCount = usePrevious(bid);

  const amountChangeColor = (currentValue: number, prevValue: number) => {
    let colorChange = "";

    if (currentValue > prevValue) {
      colorChange = "text-green-400";
    } else {
      colorChange = "text-red-400";
    }

    return colorChange;
  };

  const zebraLines = () => {
    if (index % 2 === 0) {
      return "bg-indigo-970";
    }
  };

  return (
    <div className={`${zebraLines()} w-full grid grid-cols-4`}>
      <div className="py-4 text-sm font-medium">{display_name}</div>

      <div
        className={`${
          typeof prevBidCount !== "undefined"
            ? amountChangeColor(bid, prevBidCount)
            : ""
        } py-4 text-sm font-medium`}
      >
        {bid}

        <span className="ml-4">
          {typeof prevBidCount !== "undefined" && bid > prevBidCount ? (
            <UpIndicator />
          ) : (
            <DownIndicator />
          )}
        </span>
      </div>

      <div
        className={`${
          typeof prevAskCount !== "undefined"
            ? amountChangeColor(ask, prevAskCount)
            : ""
        } py-4 text-sm font-medium`}
      >
        {ask}

        <span className="ml-4">
          {typeof prevAskCount !== "undefined" && ask > prevAskCount ? (
            <UpIndicator />
          ) : (
            <DownIndicator />
          )}
        </span>
      </div>

      <div className="py-4 text-sm font-medium">
        {Math.round((ask - bid + Number.EPSILON) * 100) / 100}
      </div>
    </div>
  );
};

export default TableBodyRow;
