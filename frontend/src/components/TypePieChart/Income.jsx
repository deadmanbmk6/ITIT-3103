import React, { useEffect } from "react";
import { useState } from "react";
import { IncomeCategory } from "../../helpers/ArrOfCaregory";
import {
  getAllAmout,
  getOperation,
  sumAmountTypes,
} from "../../helpers/getOperations";
import { PieChart } from "../PieChart/PieChart";

const Income = ({ operations }) => {
  const [categoryAmount, setCategoryAmount] = useState([]);
  const [sumAmout, setSumAmout] = useState();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getOperationType = async () => {
      const result = await getOperation("income", operations);

      const resultSum = await sumAmountTypes("income", operations);

      setSumAmout(resultSum);
      setCategoryAmount(result);
    };

    getOperationType();
  }, [operations]);

  useEffect(() => {
    const getCategoriesAmount = async () => {
      const salary = getAllAmout("salary", categoryAmount);
      const interest = getAllAmout("interest", categoryAmount);
      const gift = getAllAmout("gift", categoryAmount);
      const others = getAllAmout("others", categoryAmount);

      setCategories([salary, interest, gift, others]);
    };

    getCategoriesAmount();
  }, [categoryAmount]);

  return (
    <div>
      <PieChart
        sumAmount={sumAmout}
        categories={categories}
        type={IncomeCategory}
      />
    </div>
  );
};

export default Income;
