import { Formik } from "formik";
import { useState } from "react";
import exp_reg from "../../helpers/Exp_reg";
import AlertAuth from "../Alerts/AlertAuth";
import AlertInputs from "../Alerts/AlertInputs";
import ButtonForm from "../Buttons/ButtonForm";
import InputsForm from "../InputsForm/InputsForm";
import SelectForm from "../InputsForm/SelectForm";
import SpinnerLoaded from "../Spinner/SpinnerLoaded";

const FormAddOperation = ({
  functionUser,
  setViewModal,
  amount,
  concept,
  category,
  date,
  editing,
  type,
  arrCategory,
  alert,
  id,
}) => {
  const { name_exp, budget_exp } = exp_reg;

  const [isLoading, setLoading] = useState(false);

  return (
    <>
      <div className="shadow-2xl bg-gray-100 rounded">
        <Formik
          initialValues={{
            amount,
            concept,
            category,
            date,
          }}
          validate={({ amount, concept, category, date }) => {
            let errors = {};

            if (!amount) {
              errors.amount = "Enter a valid amount.";
            } else if (!budget_exp.test(amount)) {
              errors.amount = "Please only numbers and at most 12 digits.";
            } else if (amount < 0) {
              errors.amount = "Please only numbers greater than 0.";
            }

            if (!category) {
              errors.category = "Please choose a category.";
            } else if (!arrCategory.some((e) => [category].includes(e))) {
              errors.category = "Enter a valid category.";
            }

            if (!concept) {
              errors.concept = "Enter a valid concept.";
            } else if (concept.length > 30) {
              errors.concept = "No more than 30 characters allowed";
            } else if (!name_exp.test(concept)) {
              errors.concept = "No special characters allowed.";
            }

            if (!date) {
              errors.date = "Enter a valid date.";
            }

            return errors;
          }}
          onSubmit={async (values) => {
            if (editing) {
              const { amount, concept, category, date } = values;
              const value = { amount, concept, category, date, _id: id };

              functionUser(value);

              setLoading(true);

              setTimeout(() => {
                setLoading(false);

                setViewModal(false);
              }, 1500);

              return;
            }

            const typeOperation = type ? "expense" : "income";

            const { amount, concept, category, date } = values;

            const value = {
              amount,
              concept,
              category,
              date,
              type: typeOperation,
              id,
            };

            functionUser(value);

            setLoading(true);

            setTimeout(() => {
              setViewModal(false);

              setLoading(false);
            }, 1500);
          }}
        >
          {({
            handleSubmit,
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
          }) => (
            <div className="flex relative">
              {alert.msg && <AlertAuth text={alert.msg} error={alert.error} />}

              <form
                action=""
                onSubmit={handleSubmit}
                className=" w-full flex flex-col gap-5 p-5 py-7"
              >
                <div>
                  <InputsForm
                    type="number"
                    value={values.amount}
                    onChange={handleChange}
                    name="amount"
                    touched={touched.amount}
                    error={errors.amount}
                    onBlur={handleBlur}
                  />
                  <div className="mt-1">
                    {errors.amount && touched.amount && (
                      <AlertInputs error={errors.amount} />
                    )}
                  </div>
                </div>

                <div className="w-full mx-auto">
                  <SelectForm
                    name="category"
                    onChange={handleChange}
                    value={values.category}
                    touched={touched.category}
                    error={errors.category}
                    onBlur={handleBlur}
                  >
                    {arrCategory.map((cat) => (
                      <option value={cat} key={cat}>
                        {cat}
                      </option>
                    ))}
                  </SelectForm>
                  <div className="mt-1">
                    {errors.category && touched.category && (
                      <AlertInputs error={errors.category} />
                    )}
                  </div>
                </div>

                <div>
                  <InputsForm
                    type="text"
                    value={values.concept}
                    onChange={handleChange}
                    name="concept"
                    touched={touched.concept}
                    error={errors.concept}
                    onBlur={handleBlur}
                  />
                  <div className="mt-1">
                    {errors.concept && touched.concept && (
                      <AlertInputs error={errors.concept} />
                    )}
                  </div>
                </div>

                <div>
                  <InputsForm
                    type="date"
                    value={values.date}
                    onChange={handleChange}
                    name="date"
                    touched={touched.date}
                    error={errors.date}
                    onBlur={handleBlur}
                  />
                  <div className="mt-1">
                    {errors.date && touched.date && (
                      <AlertInputs error={errors.date} />
                    )}
                  </div>
                </div>

                {!isLoading ? (
                  editing ? (
                    <div className="flex flex-col mt-2 gap-4">
                      <ButtonForm text="Save" />
                      <button
                        className="text-white bg-red-700 hover:bg-red-800 duration-300 font-semibold p-3 px-5 rounded-md w-full"
                        onClick={() => setViewModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="mt-2">
                      <ButtonForm text="Add" />
                    </div>
                  )
                ) : (
                  <div className="mt-2">
                    <SpinnerLoaded />
                  </div>
                )}
              </form>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
};

export default FormAddOperation;
