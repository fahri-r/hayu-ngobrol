import { createContext } from "react";

import ContextProps from "@/common/types/Context";

const initialValues = {
  selectedChat: "",
  setSelectedChat: () => undefined,
};

const AppContext = createContext<ContextProps>(initialValues);

export default AppContext;
