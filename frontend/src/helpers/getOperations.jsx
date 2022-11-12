// total amount of types
export const sumAmountTypes = async (type, operations) => {
  const filterOperType = await operations.filter(
    (e) => e.type.toString().toLowerCase() === type.toString().toLowerCase()
  );

  const amount = filterOperType?.map((pro) => pro.amount);

  const reduceAmount = amount.reduce(
    (acc, currentAmount) => acc + Number(currentAmount),
    0
  );

  return reduceAmount;
};

export const getOperation = async (type, operations) => {
  const filterOperType = await operations.filter(
    (e) => e.type.toString().toLowerCase() === type.toString().toLowerCase()
  );

  const category = filterOperType?.map((pro) => {
    const amount = pro.amount;
    const category = pro.category;

    const amountCateg = { amount, category };

    return amountCateg;
  });

  // group the categories
  const groupByCategory = await category.reduce((group, product) => {
    const { category } = product;

    group[category] = group[category] ?? [];

    const p = Number(product.amount);

    group[category].push(p);

    return group;
  }, {});

  // Push each category into a new array and add the amounts of the categories
  const arrWithSumCategories = [];

  for (let key in groupByCategory) {
    const sumCategory = () => {
      const ammount = groupByCategory[key].reduce(
        (acc, currentAmount) => acc + currentAmount,
        0
      );

      const categAmount = {
        [key]: ammount,
      };

      return categAmount;
    };

    const sum = sumCategory();

    arrWithSumCategories.push(sum);
  }

  return arrWithSumCategories;
};

// filter the categories already grouped

export const getAmountCategories = (type, category) => {
  const shop = category.filter(
    (e) =>
      Object.keys(e).toString().toLowerCase().split(" ")[0] ===
      type.toString().toLowerCase()
  );

  const value = shop.map((e) => Object.values(e));

  return value;
};

// get amounts of the categories already grouped
export const getAllAmout = (type, category) => {
  let objCategory = [];

  const categ = getAmountCategories(type, category);
  categ.map((e) => objCategory.push(Object.values(e)));

  return objCategory.length > 0 ? objCategory[0][0] : 0;
};
