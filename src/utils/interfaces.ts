export interface SymbolsRequest {
  active_symbols: string;
  product_type: string;
}

export interface SyntheticSymbolsRequest {
  ticks: string[];
  subscribe: number;
}

export interface SymbolData {
  allow_forward_starting: number;
  display_name: string;
  exchange_is_open: number;
  is_trading_suspended: number;
  market: string;
  market_display_name: string;
  pip: number;
  submarket: string;
  submarket_display_name: string;
  symbol: string;
  symbol_type: string;
}

export interface SingleSyntheticSymbolData {
  ask: number;
  bid: number;
  epoch: number;
  id: string;
  pip_size: number;
  quote: number;
  symbol: string;
  display_name?: string;
}

export interface SingleSyntheticSymbolDataAdjust {
  symbol: string;
  display_name: string;
}

export interface SyntheticIndicesDataContext {
  syntheticIndicesResults: SingleSyntheticSymbolData[];
}

export interface TableProps {
  syntheticIndicesItemsData: SingleSyntheticSymbolData[];
}

export interface TableBodyRowProps {
  syntheticIndexItemData: SingleSyntheticSymbolData;
  index: number;
}
