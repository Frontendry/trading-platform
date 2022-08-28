import { useEffect, useState } from "react";

// API
import API from "../api";

// Interfaces
import { SymbolData, SymbolsRequest } from "./interfaces";

const useCustomWebSocket = (dataRequest: SymbolsRequest) => {
  /*  const [allSymbolsResData, setAllSymbolsResData] = useState([]);
  useEffect(() => {
    API.onopen = function (evt) {
      API.send(JSON.stringify(dataRequest));
    };

    API.onmessage = function (msg) {
      const symbolsData = JSON.parse(msg.data);

      const activeSymbols = symbolsData.active_symbols;
      const forexSymbols = activeSymbols.filter(
        (activeSymbol: SymbolData) => activeSymbol.market === "forex"
      );

      console.log(forexSymbols);
      setAllSymbolsResData(forexSymbols);

    
    };

    //return () => API.close();
  }, [dataRequest]);

  return allSymbolsResData; */
};

export default useCustomWebSocket;
