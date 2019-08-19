let Muro = {
    render: async () => {
        let view = /* html */ `  
<div class="muroBox">
    <li class="active" ><img src="../icon/FAVORITO.png"></li>
            <div class="slider">
                 <div class=slider-img>
                    <ul>
                        <li><img src="../icon/slide1.jpg"/></li>
                        <li><img src="../icon/slide2.jpeg"/></li>
                        <li><img src="../icon/slide3.jpeg"/></li>
                        <li><img src="../icon/slide4.jpeg"/></li>
                        <li><img src="../icon/slide5.jpeg"/></li>
                        <li><img src="../icon/slider6.jpg"/></li>
                        <li><img src="../icon/slide7.jpg"/></li>
                        <li><img src="../icon/slide8.jpg"/></li>
                   </ul>
                 </div>
            </div>       
    <div class="escribePublicacion">
    <input id="publicacion" type="text" placeholder="Realiza tu publicación">
    <button id="btn-enviar" type="button" class="btn btn-danger">Enviar</button>
                    <div class="publicaImagen">
                         <span id="fileSelector">
                            <label class="btn btn-default" for="upload-file-selector">
                                <input id="uploadFileSelector" type="file" accept="image/x-png,image/gif,image/jpg">
                            Subir Imagen
                            </label>
                         </span>
                    </div>                  
</div>       
<div id="containerPublicaciones">
    aqui se publica
</div>
        `
        return view
    },
    after_render: async () => {
        //document.getElementById('upload-file-selector').addEventListener('change',cargaArchivo);
        const mensaje = document.getElementById('publicacion')
        document.getElementById('btn-enviar').addEventListener('click', () => {
            // Add a new document with a generated id.
            db.collection("publicaciones").add({
                    mensaje: mensaje.value,
                    hora: new Date(),
                })
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
        })
        //Función de fire base para tomar lo que se escribe en la sección para publicar
        db.collection("publicaciones")
            .onSnapshot(function (doc) {
            const arrayMensajes = doc.docs
           printMensajes(arrayMensajes)
            });
        //Pintara los mensajes en la siguiente sección de las publicacines
            const printMensajes= (arrayMensajes)=> {
                const containerPublicaciones= document.getElementById('containerPublicaciones')
                let str= ""
                arrayMensajes.forEach(mensaje => {
                   const pintarMensaje=mensaje.data();
                   console.log(pintarMensaje)
                   str += `
                   <div class="card text-white bg-danger mb-3" style="max-width: 200rem;">
                    <div class="card-header">Nombre</div>
                    <div class="card-body">
                        <h5 class="card-title">Mensaje</h5>
                        <p class="card-text">${pintarMensaje.mensaje}</p>
                        <button id="btn borrar" type="button" class="btn btn-info">borrar</button>
                        <button id="btn editar" type="button" class="btn btn-info">editar</button>
                    </div>
                    
                    </div>
                   `
                    });
                    containerPublicaciones.innerHTML=str
            }
    }
}
export default Muro;


        //db . colección ( "publicaciones" ). doc ( "DC" ). eliminar (). entonces ( 
          //  function () {   
            //const array     
         //consola . log ( "¡Comentario eliminado con éxito!" ); 
        //}). catch ( función ( error ) {     
        //consola . error ( "Error al eliminar el documento:" , error ); 
        //});
