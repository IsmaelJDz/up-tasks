import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

if (btnEliminar) {
  btnEliminar.addEventListener('click', function (e) {
    const urlProyecto = e.target.dataset.proyectoUrl;
    //console.log(urlProyecto);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel action',
    }).then((result) => {
      if (result.value) {
        const url = `${location.origin}/proyectos/${urlProyecto}`;

        axios
          .delete(url, { params: { urlProyecto } })
          .then((respuesta) => {
            Swal.fire('Deleted!', respuesta.data, 'success');
          })
          .catch(() => {
            Swal.fire({
              type: 'error',
              title: 'Hubo un error',
              text: 'No se pudo eliminar el proyecto',
            });
          });

        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
      }
    });
  });
}

export default btnEliminar;
