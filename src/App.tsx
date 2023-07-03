import { Fragment } from "react";
import "./App.css";
import Header from "./layout/Header";
import Main from "./layout/Main";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <Fragment>
      <Header />
      <ToastContainer />
      <Main>
        <Routes>
          <Route path="/" element={<ProductsPage />}/>
          <Route path="/product/:action" element={<ProductPage />}/>
        </Routes>
      </Main>
    </Fragment>
  );
};

export default App;
