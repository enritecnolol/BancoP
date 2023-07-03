import { useContext, useEffect, useState } from "react";
import ProductContext from "../context/ProductContext";
import { Product } from "../types/types";
import { useNavigate, useParams } from "react-router-dom";
import { FormType } from "../enum/enum";
import ProductForm from "../components/form/ProductForm";
import productFormSchema from "../yup/productFormSchema";
import { saveProduct } from "../api/ProductApi";
import "./productPage.css"

const _initialValues = {
  id: "",
  name: "",
  description: "",
  date_release: "",
  date_revision: "",
  logo: "",
};

const ProductPage = () => {
  const { product, setProduct } = useContext(ProductContext);
  const [initialValues, setInitialValues] = useState<Product>(_initialValues);
  const { action } = useParams();
  const navigate = useNavigate();
  const isEdit = action === FormType.EDIT && product;

  useEffect(() => {
    if (isEdit) {
      setInitialValues({
        id: product.id,
        name: product.name,
        description: product.description,
        date_release: product.date_release,
        date_revision: product.date_revision,
        logo: product.logo,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const saveProductChanges = async (product: Product) => {
    try {
      await saveProduct(product, isEdit as boolean);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (values: Product, actions: any) => {
    await saveProductChanges(values);
    actions.setSubmitting(false);
    setProduct(null);
    navigate("/");
  };

  return (
    <div className="flex-center w-100">
      <div className="form-card">
        <div
          className="form-title"
        >
          <h1>Formulario de Registro</h1>
        </div>

        <ProductForm
          initialValues={initialValues}
          handleSubmit={handleSubmit}
          action={action as string}
          productFormSchema={productFormSchema}
        />
      </div>
    </div>
  );
};

export default ProductPage;
