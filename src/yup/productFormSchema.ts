import * as Yup from "yup";

const productFormSchema = Yup.object().shape({
  id: Yup.string()
    .min(3, "id debe tener al menos 3 caracteres")
    .max(10, "id debe tener como máximo 10 caracteres")
    .required("Este campo es requerido"),
  name: Yup.string()
    .min(5, "id debe tener al menos 5 caracteres")
    .max(100, "id debe tener como máximo 100 caracteres")
    .required("Este campo es requerido"),
  description: Yup.string()
    .min(10, "id debe tener al menos 10 caracteres")
    .max(200, "id debe tener como máximo 200 caracteres")
    .required("Este campo es requerido"),
  logo: Yup.string().required("Este campo es requerido"),
  date_release: Yup.string().required("Este campo es requerido"),
  date_revision: Yup.string().required("Este campo es requerido"),
});

export default productFormSchema;
