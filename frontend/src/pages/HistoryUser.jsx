import React, { useState } from "react";
import ButtonsTypeTransaction from "../components/Buttons/ButtonsTypeTransaction";
import ModalEditOperation from "../components/Modals/ModalEditOperation";
import TableTransactions from "../components/Table/TableTransactions";
import useAuth from "../hooks/useAuth";
import useOperation from "../hooks/useOperation";

const HistoryUser = () => {
  const {
    operations,
    deleteOperation,
    editionOper,
    setEdition,
    updateOperation,
  } = useOperation();

  const { alert, auth } = useAuth();

  const [isViewExpen, setIsViewExpen] = useState(true);

  const [viewModal, setViewModal] = useState(false);

  const [isType, setIstype] = useState("");

  return (
    <div>
      <h1 className="text-center uppercase text-xl md:text-2xl text-teal-800 underline font-bold mb-14">
        transaction history
      </h1>

      <div className="flex justify-center gap-5 md:gap-10 mb-20">
        <ButtonsTypeTransaction
          type={false}
          onClick={() => setIsViewExpen(false)}
        />

        <ButtonsTypeTransaction
          type={true}
          onClick={() => setIsViewExpen(true)}
        />
      </div>

      {isViewExpen ? (
        <div className="pb-32">
          <TableTransactions
            type="expense"
            operations={operations}
            deleteOperation={deleteOperation}
            viewModal={viewModal}
            setViewModal={setViewModal}
            setEdition={setEdition}
            _id={auth._id}
            isType={setIstype}
          />
        </div>
      ) : (
        <div className="pb-32">
          <TableTransactions
            type="income"
            operations={operations}
            deleteOperation={deleteOperation}
            viewModal={viewModal}
            setViewModal={setViewModal}
            setEdition={setEdition}
            _id={auth._id}
            isType={setIstype}
          />
        </div>
      )}

      {viewModal && (
        <ModalEditOperation
          setViewModal={setViewModal}
          editing={true}
          editionOper={editionOper}
          alert={alert}
          editOperation={updateOperation}
          id={auth._id}
          type={isType}
        />
      )}
    </div>
  );
};

export default HistoryUser;
