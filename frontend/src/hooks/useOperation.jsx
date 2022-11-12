import { useContext } from "react";
import OperationContext from "../context/OperationContext";

const useOperation = () => {
  return useContext(OperationContext);
};

export default useOperation;
