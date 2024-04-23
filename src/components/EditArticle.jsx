import React, { useEffect, useState } from "react";
import Slider from "./Slider";
import SideBar from "./SideBar";
import axios from "axios";
import Global from "./Global";
import { useAsyncError, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import defaultImage from "../assets/images/sinImagen.jpg";

const EditArticle = () => {
  //llamo a la url del API y la variable para navegar a otras rutas
  const url = Global.url;
  const navigate = useNavigate();
  //creo las referencias de input de titulo y contenido
  let titleRef = React.createRef();
  let contentRef = React.createRef();
  //creo una variable state donde guardare la imagen que obtenga del API cuando llame el articulo a editar
  const [image, setImage] = useState(null);
  //creo la variable para guardar el articulo original del API 
  let [article, setArticle]=useState()
  //creo la variable que almacenara el artículo nuevo
  let [newArticle, setNewArticle]=useState()
  //variable state de file para guardar el valor del file cuando se agrega un archivo al input
  let [file, setFile] = useState(null);
  //obtengo de la URL el ID del articulo que voy a editar
  const { id } = useParams();
  
// Llama a getArticle apenas se monta el componente
  useEffect(() => {
    getArticle();
  }, []);

  let getArticle = async () => {
    let response = await axios.get(`${url}article/${id}`); // obtengo el articulo a editar del API
    if (response.data.article) {
      setArticle(response.data.article) //guardo en la propiedad article el articulo original obtenido del API
      if (titleRef.current && contentRef.current) { 
        titleRef.current.value = response.data.article.title; //muestro en los inputs los valores de titulo y contenido del articulo original
        contentRef.current.value = response.data.article.content;
      }
      if (response.data.article.image != null) {
        setImage(response.data.article.image); //guardo en la variable image la imagen obtenida del API
      }
    } else console.error("No se obtuvieron datos");
  };

  let changeState =()=>{//creo una funcion que me captura y guarda en el newArticle el artículo modificado, la declaro con un onChange en el form para que se actualice la información de article cada vez que cambia algo en el form
    setNewArticle({ 
      title: titleRef.current.value,
      content: contentRef.current.value,
      image: image,
    })
  }

  const saveArticle = async (event) => {
    event.preventDefault(); //para que no me recargue la página (este es el chiste de las SPA)
    
      try {
        let response = await axios.put(`${url}article/${id}`, newArticle); //hago una peticiñon ayax al APi con el nuevo articulo creado para modificar el existente
        if (
          response.data.article &&
          response.data.status.toLowerCase() == "success"
        ) {
          let id = response.data.article._id; //obtengo el id del articulo que se esta actualizando
          if (file === null) { //determino si se va a subir una nueva imagen o no, en caso de que no, lo guarda tal y como esta
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Se editó el artículo sin cambios en la imagen",
              showConfirmButton: true,
              confirmButtonColor: "#4dbad8",
            });
            setTimeout(() => {
              navigate(`/blog/article/${id}`);// guarda y me redirige al articulo
            }, 400);
          } else { 
            if (!file.type.includes("image")) { //en caso de que haya un nuevo archivo subido determina si es uan imagen o no
              axios.put(`${url}article/${id}`, article)// en caso de que no, hace nuevamente la actualizacion pero esta vez con el articulo original, es decir, deja todo como estaba
              Swal.fire({// saca un mensaje de error de extensión invalida
                title: "Error 404",
                text: "Extensión de archivo inválida, inténtalo de nuevo",
                icon: "error",
                showCloseButton: true,
                confirmButtonColor: "#4dbad8",
              });
            } else { //en caso de que la imagen este correcta sube la nueva imagen al API en el artículo establecido
              const formData = new FormData();
              formData.append("file0", file, file.name);
              try {
                let res = await axios.post(`${url}upload-image/${id}`, formData);
                if (res.data.article) {
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Se editó el artículo correctamente",
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
      <Slider size={"slider-small"} title="Editar Artículo" />
      <div className="center">
        <section id="content">
          <div className="sub-header"></div>
          <br />
          <form className="mid-form" onSubmit={saveArticle} onChange={changeState}>
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
            <div className="imageEdit">
              {image ? (
                <img src={`${url}get-image/${image}`} alt="image"/>
              ) : (
                <span>
                  <img src={defaultImage} alt="default-Image" />
                  <br />
                  <b>Artículo sin imagen</b>
                </span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="file0">Imagen:</label>
              <input type="file" name="file0" onChange={fileChange}/>
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

export default EditArticle;
