import React, { useEffect } from "react";
import { useState } from "react";
import { ExpenseCategory } from "../../helpers/ArrOfCaregory";
import {
  getAllAmout,
  getOperation,
  sumAmountTypes,
} from "../../helpers/getOperations";
import { PieChart } from "../PieChart/PieChart";

const Expense = ({ operations }) => {
  const [categoryAmount, setCategoryAmount] = useState([]);
  const [sumAmout, setSumAmout] = useState();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getOperationType = async () => {
      const result = await getOperation("expense", operations);

      const resultSum = await sumAmountTypes("expense", operations);

      setCategoryAmount(result);

      setSumAmout(resultSum);
    };

    getOperationType();
  }, [operations]);

  useEffect(() => {
    const getCategoriesAmount = async () => {
      const shopping = getAllAmout("Shopping", categoryAmount);
      const health = getAllAmout("Health", categoryAmount);
      const leisure = getAllAmout("Leisure", categoryAmount);
      const restaurant = getAllAmout("Restaurant", categoryAmount);
      const food = getAllAmout("Food", categoryAmount);
      const services = getAllAmout("Services", categoryAmount);
      const others = getAllAmout("others", categoryAmount);

      setCategories([
        shopping,
        health,
        leisure,
        restaurant,
        food,
        services,
        others,
      ]);
    };

    getCategoriesAmount();
  }, [categoryAmount]);

  return (
    <div>
      <PieChart
        sumAmount={sumAmout}
        categories={categories}
        type={ExpenseCategory}
      />
    </div>
  );
};

export default Expense;
