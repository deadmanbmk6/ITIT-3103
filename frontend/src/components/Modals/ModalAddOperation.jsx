import React, { useEffect, useState } from "react";
import FormAddOperation from "../Form/FormAddOperation";
import { ExpenseCategory, IncomeCategory } from "../../helpers/ArrOfCaregory";
import ButtonFormtype from "../Buttons/ButtonFormtype";

import { MdArrowBack } from "react-icons/md";
import ButtonClose from "../Buttons/ButtonClose";

const ModalAddOperation = ({ setViewModal, addOperation, alert, id }) => {
  const [isIncome, setIsIncome] = useState(false);
  const [isExpense, setIsExpense] = useState(false);

  const handleChangeOperation = (type, typeTwo) => {
    type(true);
    typeTwo(false);
  };

  const handleComeBack = () => {
    setIsIncome(false);
    setIsExpense(false);
  };

  return (
    <div className="fixed top-0 w-full h-screen left-0 backdrop-brightness-50 px-2">
      <div className="shadow-2xl bg-gray-100 flex justify-center my-10 md:my-32  w-full sm:w-2/3 xl:w-1/3 mx-auto py-20 relative rounded-md border-2 border-teal-200">
        {isExpense === true || isIncome === true ? (
          <div className="absolute top-0 left-0 p-5 px-5 font-bold">
            <button
              className="flex items-center gap-2 text-gray-500 hover:text-gray-900 duration-200"
              onClick={() => handleComeBack(false)}
            >
              {" "}
              <MdArrowBack /> Return{" "}
            </button>
          </div>
        ) : null}

        <ButtonClose onClick={() => setViewModal(false)} />

        {isExpense !== true && isIncome !== true && (
          <div className="flex flex-col items-center font-medium">
            <h2 className="font-medium text-lg">Whats is the operation?</h2>

            <div className="flex gap-5 items-center mt-10">
              <ButtonFormtype
                onClick={() => handleChangeOperation(setIsIncome, setIsExpense)}
                text="income"
              />
              <ButtonFormtype
                onClick={() => handleChangeOperation(setIsExpense, setIsIncome)}
                text="expense"
              />
            </div>
          </div>
        )}

        {isExpense && (
          <div className="w-full px-4 lg:px-20">
            <h1 className="text-center mb-5 text-2xl font-bold uppercase text-red-600 underline tracking-wider">
              Expense
            </h1>
            <FormAddOperation
              setViewModal={setViewModal}
              functionUser={addOperation}
              amount={""}
              concept={""}
              category={""}
              date={""}
              arrCategory={ExpenseCategory.map((e) => e.categories)}
              handleComeBack={handleComeBack}
              type={true}
              alert={alert}
              id={id}
            />
          </div>
        )}

        {isIncome && (
          <div className="w-full px-4 lg:px-20">
            <h1 className="text-center mb-5 text-2xl font-bold uppercase text-teal-600 tracking-wider underline">
              Income
            </h1>

            <FormAddOperation
              setViewModal={setViewModal}
              functionUser={addOperation}
              amount={""}
              concept={""}
              category={""}
              arrCategory={IncomeCategory.map((e) => e.categories)}
              date={""}
              handleComeBack={handleComeBack}
              alert={alert}
              id={id}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalAddOperation;
