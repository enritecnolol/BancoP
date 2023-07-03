import { toast } from "react-toastify";
import { Product } from "../types/types";

const BaseUrl = import.meta.env.VITE_API_URL;
const authorId = import.meta.env.VITE_API_AUTHORID;

const errorMessageResponse = (code: number): string => {
  const statusCodes: { [key: number]: string } = {
    400: 'ha pasado un error',
    404: 'id de producto no encontrado',
    401: 'debes ser el dueño'
  }
  return statusCodes[code] || ''
}

const getProducts = async () => {
  try {
    const response = await fetch(BaseUrl, {
      method: "GET",
      headers: {
        authorId,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error: ", error);
    return error;
  }
};

const verifyProductId = async (id: string) => {
  try {
    const response = await fetch(BaseUrl + `/verification?id=${id}`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error: ", error);
    return error;
  }
};

const deleteProduct = async (productId: string) => {
  try {
    const response = await fetch(
      BaseUrl + `?id=${productId}`,
      {
        method: "DELETE",
        headers: {
          authorId,
        },
      }
    );

    if(response.status !== 200) {
      const errorMessage = errorMessageResponse(response.status);
      toast.error(errorMessage)
      throw {
        error: errorMessage
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error: ", error);
    return error;
  }
};

const saveProduct = async (product: Product, isEdit: boolean) => {
  try {
    const response = await fetch(BaseUrl, {
      method: isEdit ? "PUT" : "POST",
      headers: {
        authorId,
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        ...product,
      }),
    });

    if(response.status !== 200) {
      const errorMessage = errorMessageResponse(response.status);
      toast.error(errorMessage)
      throw {
        error: errorMessage
      }
    }

    const data = await response.json();
    toast.success("producto guardado con exito!")
    return data;
  } catch (error) {
    console.log("error: ", error);
    return error
  }
};

export {
    getProducts,
    deleteProduct,
    saveProduct,
    verifyProductId
}