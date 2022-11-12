import React, { useState } from "react";
import { ExpenseCategory, IncomeCategory } from "../../helpers/ArrOfCaregory";
import { formatDateForTheForm } from "../../helpers/FormatDate";
import FormAddOperation from "../Form/FormAddOperation";

const ModalEditOperation = ({
  setViewModal,
  editOperation,
  editionOper,
  alert,
  type,
  id,
}) => {
  return (
    <div className="fixed top-0 w-full h-screen left-0 backdrop-brightness-50">
      <div className="flex justify-center my-32">
        {type === "expense" ? (
          <div className="w-full sm:w-2/3 xl:w-1/3 px-4 lg:px-20">
            <FormAddOperation
              setViewModal={setViewModal}
              functionUser={editOperation}
              amount={editionOper.amount}
              concept={editionOper.concept}
              category={editionOper.category}
              date={formatDateForTheForm(editionOper.date)}
              editing={true}
              id={id}
              arrCategory={ExpenseCategory.map((e) => e.categories)}
              type={true}
              alert={alert}
            />
          </div>
        ) : (
          <div className=" w-full sm:w-2/3 xl:w-1/3 px-4 lg:px-20">
            <FormAddOperation
              setViewModal={setViewModal}
              functionUser={editOperation}
              amount={editionOper.amount}
              concept={editionOper.concept}
              category={editionOper.category}
              date={formatDateForTheForm(editionOper.date)}
              id={id}
              editing={true}
              arrCategory={IncomeCategory.map((e) => e.categories)}
              alert={alert}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalEditOperation;
