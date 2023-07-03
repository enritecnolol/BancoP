import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Product } from "../../types/types";
import CustomInput from "../formInputs/Input";
import { FormType } from "../../enum/enum";
import CustomButton from "../formInputs/Button";
import "./productForm.css";
import { verifyProductId } from "../../api/ProductApi";
import { useState } from "react";

interface ProductFormProps {
  productFormSchema: Yup.ObjectSchema<Product>;
  initialValues: Product;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleSubmit: (values: Product, action: any) => void;
  action: string;
}

const ProductForm = ({
  productFormSchema,
  initialValues,
  handleSubmit,
  action,
}: ProductFormProps) => {

  const [idExists, setIdExists] = useState(false);

  const addYearToDate = (date: string) => {
    const aYearFromNow = new Date(date);
    aYearFromNow.setFullYear(aYearFromNow.getFullYear() + 1);
    return aYearFromNow.toISOString().split("T")[0];
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const verifyIdExistence = async (values: Product, actions: any) => {
    try {
      const response = await verifyProductId(values.id);
      if (!response) {
        handleSubmit(values, actions)
        return;
      }
      setIdExists(response)
      actions.setSubmitting(false);
    } catch (error) {
      console.log('error:', error)
    }
  }

  return (
    <Formik
      enableReinitialize={true}
      validationSchema={productFormSchema}
      onSubmit={verifyIdExistence}
      initialValues={initialValues}
    >
      {({
        errors,
        touched,
        handleChange,
        values,
        setFieldValue,
        handleReset,
        submitCount
      }) => (
        <Form>
          <div className="col-container">
            {/* Column 1 */}
            <div className="col">
              <div className="mt-30">
                <div className="form-container">
                  <CustomInput
                    label="id"
                    name="id"
                    onChange={handleChange}
                    value={values.id}
                    disabled={action === FormType.EDIT}
                    error={(!!(touched.id && errors.id) || idExists)}
                  />
                  {touched.id && errors.id && (
                    <span className="validation-error">{errors.id}</span>
                  )}
                  {idExists && (
                    <span className="validation-error">id no valido</span>
                  )}
                </div>
                <div className="form-container">
                  <CustomInput
                    label="Descripción"
                    name="description"
                    onChange={handleChange}
                    value={values.description}
                    error={!!(touched.description && errors.description)}
                  />
                  {touched.description && errors.description && (
                    <span className="validation-error">
                      {errors.description}
                    </span>
                  )}
                </div>
                <div className="form-container">
                  <CustomInput
                    type="date"
                    label="Fecha Liberación"
                    name="date_release"
                    onChange={(e) => {
                      handleChange(e);
                      setFieldValue(
                        "date_revision",
                        addYearToDate(e.target.value)
                      );
                    }}
                    value={values.date_release}
                    error={!!(touched.date_release && errors.date_release)}
                  />

                  {touched.date_release && errors.date_release && (
                    <span className="validation-error">
                      {errors.date_release}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="col">
              <div className="mt-30">
                <div className="form-container">
                  <CustomInput
                    label="Nombre"
                    name="name"
                    onChange={handleChange}
                    value={values.name}
                    error={!!(touched.name && errors.name)}
                  />
                  {touched.name && errors.name && (
                    <span className="validation-error">{errors.name}</span>
                  )}
                </div>
                <div className="form-container">
                  <CustomInput
                    label="Logo"
                    name="logo"
                    onChange={handleChange}
                    value={values.logo}
                    error={!!(touched.logo && errors.logo)}
                  />
                  {touched.logo && errors.logo && (
                    <span className="validation-error">{errors.logo}</span>
                  )}
                </div>
                <div className="form-container">
                  <CustomInput
                    type="date"
                    label="Fecha Revisión"
                    name="date_revision"
                    onChange={handleChange}
                    value={values.date_revision}
                    disabled={true}
                    error={!!(touched.date_revision && errors.date_revision)}
                  />
                  {touched.date_revision && errors.date_revision && (
                    <span className="validation-error">
                      {errors.date_revision}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Buttons */}
          <div className="flex-center mt-40 mb-30">
            <CustomButton
              color="secondary"
              variant="contained"
              style={{ marginRight: "30px" }}
              type="reset" onClick={handleReset}
            >
              Reiniciar
            </CustomButton>
            <CustomButton
              color="primary"
              variant="contained"
              type="submit"
              disabled={submitCount === 0 ? false : Object.keys(errors).length > 0}
            >
              Enviar
            </CustomButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;
