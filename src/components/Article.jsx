import React, { useState, useEffect } from "react";
import Slider from "./Slider";
import SideBar from "./SideBar";
import axios from "axios";
import Global from "./Global";
import defaultImg from "../assets/images/sinImagen.jpg";
import Moment from "react-moment";
import "moment/locale/es";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Article = () => {
  const url = Global.url;
  const [article, setArticle] = useState({});
  const params = useParams();
  const articleId = params.id; //esto tambien lo podria hacer como: const {id}=useParams() pero debo crear la variable con el mismo nombre que me devuelve el useParams() o no me va a funcionar
  const [error, setError] = useState(1);
  let title = "";
  const navigate = useNavigate();

  const getArticle = () => {
    axios
      .get(url + "article/" + articleId)
      .then((res) => {
        setArticle(res.data.article);
      })
      .catch((err) => {
        console.log(err);
        setError(2);
      });
  };

  const deleteArticle = () => {
    Swal.fire({
      title: "Estás seguro?",
      text: "No podrás recuperar el artículo despúes",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4dbad8",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Borrar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${url}article/${articleId}`)
          .then((res) => {
            if (res.data.status.toLowerCase() === "success") {
              Swal.fire({
                title: "Borrado!",
                text: "El artículo ha sido borrado",
                icon: "success",
                confirmButtonColor:'#4dbad8'
              });
              navigate("/blog");
            }
          })
          .catch(() => {
            Swal.fire({
              title: "Error",
              text: "Hubo un error al borrar el artículo",
              icon: "error",
            });
          });
      }
    });
  };

  if (error === 2) {
    title = "No existe el artículo";
  }

  useEffect(() => {
    getArticle()
  }, []);

  return (
    <React.Fragment>
      <Slider size="slider-small" title={title} />
      <div className="center">
        <section id="content">
          <article className="article-item article-detail">
            <h1 className="sub-header">{article.title}</h1>
            <div className="image-wrap">
              {article.image == null ? (
                <img src={defaultImg} alt={article.title} />
              ) : (
                <img
                  src={url + "get-image/" + article.image}
                  alt={article.title}
                />
              )}
            </div>

            <span className="date">
              <Moment fromNow>{article.date}</Moment>
            </span>
            <p>{article.content}</p>
            <div className="clearfix"></div>
          </article>
          <div className="clearfix" />
          <div className="btnEDE">
            <NavLink to={`/blog/edit/${articleId}`} className="btn btn-edit">
              editar
            </NavLink>
            <button className="btn btn-delete" onClick={deleteArticle}>
              borrar
            </button>
          </div>
        </section>
        <SideBar create />
      </div>
    </React.Fragment>
  );
};

export default Article;
