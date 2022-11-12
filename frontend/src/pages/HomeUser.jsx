import React, { useState } from "react";
import ButtonsTypeTransaction from "../components/Buttons/ButtonsTypeTransaction";
import ButtonTransaction from "../components/Buttons/ButtonTransaction";
import ModalAddOperation from "../components/Modals/ModalAddOperation";
import Expense from "../components/TypePieChart/Expense";
import Income from "../components/TypePieChart/Income";
import useAuth from "../hooks/useAuth";
import useOperation from "../hooks/useOperation";

const HomeUser = () => {
  const { auth, alert } = useAuth();

  const { addOperation, operations } = useOperation();

  const [viewModal, setViewModal] = useState(false);

  const [isExpense, setIsExpense] = useState(true);

  return (
    <div className="pb-10">
      <h2 className="text-center text-2xl md:text-3xl capitalize font-bold mb-6">{`👋 Hi ${auth.name}!`}</h2>

      <div className="flex justify-center mb-8">
        <ButtonTransaction
          text="Add Transaction"
          onClick={() => setViewModal(true)}
        />
      </div>

      <div className="flex gap-5 md:gap-10 justify-center mb-2">
        <ButtonsTypeTransaction
          type={false}
          onClick={() => setIsExpense(false)}
        />
        <ButtonsTypeTransaction
          type={true}
          onClick={() => setIsExpense(true)}
        />
      </div>

      <div className="mt-10 w-full md:w-1/2 lg:w-1/3 mx-auto">
        {isExpense ? (
          <Expense operations={operations} />
        ) : (
          <Income operations={operations} />
        )}
      </div>

      {viewModal && (
        <ModalAddOperation
          setViewModal={setViewModal}
          addOperation={addOperation}
          alert={alert}
          id={auth._id}
        />
      )}
    </div>
  );
};

export default HomeUser;
