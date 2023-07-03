import { Fragment, useContext, useEffect, useState } from "react";
import CustomInput from "../components/formInputs/Input";
import CustomButton from "../components/formInputs/Button";
import Table from "../components/table/Table";
import { useNavigate } from "react-router-dom";
import Dropdown from "../components/dropdown/Dropdown";
import ProductContext from "../context/ProductContext";
import { Product } from "../types/types";
import { deleteProduct, getProducts } from "../api/ProductApi";
import "./productsPage.css"

const headers = [
  {
    key: "logoImg",
    display: "Logo",
  },
  {
    key: "name",
    display: "Nombre del producto",
  },
  {
    key: "description",
    display: "Descripción",
  },
  {
    key: "date_release",
    display: "Fecha liberación",
  },
  {
    key: "date_revision",
    display: "Fecha restructuración",
  },
  {
    key: "action",
    display: "",
  },
];

const ProductsPage = () => {
  const { setProduct } = useContext(ProductContext);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();

  const goToForm = () => {
    navigate("/product/create");
  };

  const formatProducts = (productsList: Product[]) => {
    return productsList.map((product) => {
      return {
        ...product,
        date_release: formatDate(product.date_release),
        date_revision: formatDate(product.date_revision),
      };
    });
  };

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(formatProducts(response));
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logoImg = (imgSrc: string, productName: string) => {
    return (
      <img src={imgSrc} alt={productName} className="logo-img" loading="lazy" />
    );
  };

  const onEdit = (id: string) => {
    const findProduct = products.find((product) => product.id === id);
    if (!findProduct) {
      return;
    }
    setProduct(findProduct);
    navigate("/product/edit");
  };

  const onDelete = async (id: string) => {
    if (!confirm("Estas seguro de eliminar este producto?")) {
      return;
    }
    const data = await deleteProduct(id);
    if (data.error){
      return;
    }
    setProducts(products.filter(product => product.id !== id));
  };

  const formatDate = (date: string) => {
    const splitDate = date.split("T");
    return splitDate[0];
  };

  const formatData = () => {
    return products.map((product) => {
      return {
        ...product,
        action: (
          <Dropdown onEdit={onEdit} onDelete={onDelete} id={product.id} />
        ),
        logoImg: logoImg(product.logo, product.name),
      };
    });
  };

  return (
    <Fragment>
      <div className="actionBar">
        <div>
          <CustomInput
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <CustomButton color="primary" variant="contained" onClick={goToForm}>
          Agregar
        </CustomButton>
      </div>
      <div className="table-container">
        <Table
          headers={headers}
          rows={formatData()}
          height={300}
          searchTerm={searchTerm}
        />
      </div>
    </Fragment>
  );
};

export default ProductsPage;
