import React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";

//Importar componentes
import Peliculas from "./Peliculas";
import PruebasComp from "./PruebasComp";
import Home from "./Home";
import Form from "./Form";
import Blog from "./Blog";
import ErrorPage from "./ErrorPage";
import Header from "./Header";
import Footer from "./Footer";
import CreateArticle from "./CreateArticle";
import Article from './Article'
import Search from "./Search";
import EditArticle from "./EditArticle";

const Router = ()=> {
  
    return (
      <BrowserRouter>
        {/*En react, los componentes principales de una pagina se deben cargar dentro del Router y luego se carga el Router en App */}
        <Header />

        {/*Configurar rutas y paginas */}
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/peliculas" element={<Peliculas />} />
          <Route path="/pruebas" element={<PruebasComp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/form" element={<Form />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/search/:searchString" element={<Search />} />
          <Route path='redirect/searchString'/>
          <Route path="/blog/article/:id" element={<Article />} />
          <Route path="/blog/create" element={<CreateArticle />} />
          <Route path="/blog/edit/:id" element={<EditArticle />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>

        <div className="clearfix"></div>

        <Footer />
      </BrowserRouter>
    );
  
}

export default Router;
