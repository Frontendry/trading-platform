// React Modules
import { useEffect, useState } from "react";

// API
import API from "./api";

// Interfaces
import {
  SymbolData,
  SingleSyntheticSymbolData,
  SingleSyntheticSymbolDataAdjust,
  SymbolsRequest,
} from "./utils/interfaces";

// Context
import syntheticIndicesContext from "./context/syntheticIndicesContext";
import Table from "./components/Table";
import Title from "./components/Title";
import Footer from "./components/Footer";

const App = () => {
  const [syntheticResData, setSyntheticResData] = useState<
    SingleSyntheticSymbolData[]
  >([]);
  const [marketClosed, setMarketClosed] = useState<boolean>(false);

  useEffect(() => {
    const allSymbolsReq: SymbolsRequest = {
      active_symbols: "brief",
      product_type: "basic",
    };

    const createSyntheticDataTable = (
      newSyntheticDataArg: SingleSyntheticSymbolData,
      syntheticDataAdjustments: SingleSyntheticSymbolDataAdjust[]
    ) => {
      setSyntheticResData((current) => {
        const checkAvailability = (
          arr: SingleSyntheticSymbolData[],
          val: string
        ) => {
          return arr.some((arrVal) => val === arrVal.symbol);
        };

        if (checkAvailability(current, newSyntheticDataArg.symbol)) {
          const updatedSyntheticArr = current.map((obj) => {
            if (obj.symbol === newSyntheticDataArg.symbol) {
              return {
                ...obj,
                ask: newSyntheticDataArg.ask,
                bid: newSyntheticDataArg.bid,
                epoch: newSyntheticDataArg.epoch,
                id: newSyntheticDataArg.id,
                pip_size: newSyntheticDataArg.pip_size,
                quote: newSyntheticDataArg.quote,
              };
            }

            return obj;
          });

          return updatedSyntheticArr;
        } else {
          const filteredRelatedSyntheticAdjustment =
            syntheticDataAdjustments.filter(
              (syntheticData) =>
                syntheticData.symbol === newSyntheticDataArg.symbol
            );

          // console.log(newSyntheticDataArg);
          newSyntheticDataArg.display_name =
            filteredRelatedSyntheticAdjustment[0].display_name;

          return [...current, newSyntheticDataArg];
        }
      });
    };

    API.onopen = function (evt) {
      API.send(JSON.stringify(allSymbolsReq));
    };

    API.onmessage = function (msg) {
      const allSymbolsData = JSON.parse(msg.data);

      try {
        if (allSymbolsData.msg_type === "active_symbols") {
          const activeSymbols = allSymbolsData.active_symbols;

          const syntheticIndex = activeSymbols.filter(
            (activeSymbol: SymbolData) =>
              activeSymbol.market === "synthetic_index"
          );

          const syntheticIndexSymbolsPlusDisplayName = syntheticIndex.map(
            (syntheticIndexSymbol: SymbolData) => ({
              symbol: syntheticIndexSymbol.symbol,
              display_name: syntheticIndexSymbol.display_name,
            })
          );

          const syntheticIndexSymbols = syntheticIndex.map(
            (syntheticIndexSymbol: SymbolData) => syntheticIndexSymbol.symbol
          );

          API.send(
            JSON.stringify({
              ticks: syntheticIndexSymbols,
              subscribe: 1,
            })
          );

          API.onmessage = function (msg) {
            const selectedSyntheticData = JSON.parse(msg.data);

            try {
              if (
                selectedSyntheticData.msg_type === "tick" &&
                !selectedSyntheticData.hasOwnProperty("error")
              ) {
                createSyntheticDataTable(
                  selectedSyntheticData.tick,
                  syntheticIndexSymbolsPlusDisplayName
                );
              } else {
                setMarketClosed(true);
              }
            } catch (error) {
              console.log(error);
            }
          };

          API.onclose = () => {
            API.close();
          };
        }
      } catch (error) {
        console.log(error);
      }
    };

    return () => {
      //API.close();
    };
  }, []);

  return (
    <main className="bg-indigo-980 min-h-screen flex flex-col items-center justify-center">
      {marketClosed ? (
        <p>Market is currently closed.</p>
      ) : (
        <>
          <syntheticIndicesContext.Provider
            value={{
              syntheticIndicesResults: syntheticResData,
            }}
          >
            <Title />
            <Table />
            <Footer />
          </syntheticIndicesContext.Provider>
        </>
      )}
    </main>
  );
};

export default App;
