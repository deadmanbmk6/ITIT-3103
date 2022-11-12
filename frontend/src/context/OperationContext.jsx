import React, { useEffect, useState } from "react";
import { createContext } from "react";
import Axios from "../config/Axios";
import checkToken from "../helpers/checkToken";

import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2/dist/sweetalert2.all.js";

const OperationContext = createContext();

const MySwal = withReactContent(Swal);

export const OperationProvider = ({ children }) => {
  const [operations, setOperations] = useState([]);

  const [loadingOper, setLoadingOper] = useState(true);

  const [editionOper, setEditionOper] = useState([]);

  const token = localStorage.getItem("token_user000123040501");

  useEffect(() => {
    const getOperation = async () => {
      try {
        const { data } = await Axios("/", checkToken(token));

        setOperations(data);
      } catch (error) {
        console.log(error);
      }

      setLoadingOper(false);
    };

    getOperation();
  }, [operations]);

  const addOperation = async (value) => {
    try {
      console.log("CALLED")
      const { data } = await Axios.post(
        "http://localhost:4000/",
        value,
        checkToken(token)
      );

      setOperations([data, ...operations]);

      await MySwal.fire({
        position: "top-end",
        icon: "success",
        title: `The ${value.type} was added successfully`,
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      await MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error?.response.data.msg}`,
        confirmButtonText:
          '<a href="/home/profile">I want to confirm my account</a>',
        showCancelButton: true,
      });
    }
  };

  const updateOperation = async (values) => {
    try {
      const { data } = await Axios.put(
        `/${editionOper._id}`,
        values,
        checkToken(token)
      );

      const updatedOperations = operations.map((oper) =>
        oper._id === data._id ? data : oper
      );

      setOperations(updatedOperations);

      await MySwal.fire({
        position: "top-end",
        icon: "success",
        title: "Operation edited successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const setEdition = (oper) => {
    setEditionOper(oper);
  };

  const deleteOperation = async ({ id, _id }) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await Axios.post(
            `operation/${id[0]}`,
            { _id },
            checkToken(token)
          ).then(await Axios.delete(`operation/${id[0]}`, checkToken(token)));

          const operationsDelete = operations.filter(
            (operation) => operation._id !== id
          );

          setOperations(operationsDelete);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <OperationContext.Provider
      value={{
        addOperation,
        updateOperation,
        deleteOperation,
        setEdition,
        editionOper,
        operations,
        loadingOper,
      }}
    >
      {children}
    </OperationContext.Provider>
  );
};

export default OperationContext;
