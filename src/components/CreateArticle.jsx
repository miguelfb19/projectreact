import React, { useEffect, useState } from "react";
import Slider from "./Slider";
import SideBar from "./SideBar";
import axios from "axios";
import Global from "./Global";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateArticle = () => {
  const url = Global.url;
  let titleRef = React.createRef();
  let contentRef = React.createRef();
  let [article, setArticle] = useState({});
  const navigate = useNavigate();
  let [file, setFile] = useState(null);

  let changeState = () => {
    setArticle(
      (article = {
        title: titleRef.current.value,
        content: contentRef.current.value,
      })
    );
  };

  const saveArticle = async (event) => {
    event.preventDefault();
    try {
      let response = await axios.post(`${url}save/`, article);
      if (
        response.data.article &&
        response.data.status.toLowerCase() == "success"
      ) {
        let id = response.data.article._id;
        if (file === null) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Se creo el artículo sin imagen",
            showConfirmButton: true,
            confirmButtonColor: "#4dbad8",
          });
          setTimeout(() => {
            navigate("/blog");
          }, 500);
        } else {
          if (!file.type.includes("image")) {
            axios.delete(`${url}article/${id}`);
            Swal.fire({
              title: "Error 404",
              text: "Extensión de archivo inválida, inténtalo de nuevo",
              icon: "error",
              showCloseButton: true,
              confirmButtonColor: "#4dbad8",
            });
          } else {
            const formData = new FormData();
            formData.append("file0", file, file.name);
            try {
              let res = await axios.post(`${url}upload-image/${id}`, formData);
              if (res.data.article) {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Se creo el artículo correctamente",
                  showConfirmButton: true,
                  confirmButtonColor: "#4dbad8",
                });
                setTimeout(() => {
                  navigate("/blog");
                }, 1000);
              }
            } catch {
              Swal.fire({
                title: "Error 500",
                text: "Hubo algún problema al subir la imagen, intentalo despúes",
                icon: "warning",
                showCloseButton: true,
                confirmButtonColor: "#4dbad8",
              });
              navigate("/blog");
            }
          }
        }
      } else {
        throw new Error();
      }
    } catch {
      Swal.fire({
        title: "Error 500",
        text: "No se pudo guardar el artículo en el servidor, intentalo más tarde",
        icon: "warning",
        showCloseButton: true,
        confirmButtonColor: "#4dbad8",
      });
    }
  };

  const fileChange = async (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <React.Fragment>
      <Slider size={"slider-small"} title="Crear Artículo" />
      <div className="center">
        <section id="content">
          <div className="sub-header"></div>
          <br />
          <form
            className="mid-form"
            onSubmit={saveArticle}
            onChange={changeState}
          >
            <div className="form-group">
              <label htmlFor="title">Título:</label>
              <input type="text" name="title" ref={titleRef} required />
            </div>
            <div className="clearfix"></div>
            <div className="form-group">
              <label htmlFor="content">Contenido:</label>
              <textarea name="content" ref={contentRef} required></textarea>
              <div className="clearfix"></div>
            </div>
            <div className="clearfix"></div>
            <div className="form-group">
              <label htmlFor="file0">Imagen:</label>
              <input type="file" name="file0" onChange={fileChange} />
            </div>

            <div className="buttomsform">
              <input
                type="submit"
                value="Guardar"
                className="btn btn-succes buttonsform1"
              />
              <input
                type="reset"
                value="Borrar"
                className="btn btn-succes buttonsform2"
              />
            </div>
          </form>
        </section>
        <SideBar search />
      </div>
    </React.Fragment>
  );
};

export default CreateArticle;
