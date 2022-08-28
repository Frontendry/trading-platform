import { createContext } from "react";

import { SyntheticIndicesDataContext } from "../utils/interfaces";

const syntheticIndicesContext =
  createContext<SyntheticIndicesDataContext | null>(null);

export default syntheticIndicesContext;
