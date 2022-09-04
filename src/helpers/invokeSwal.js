import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const swalWithBootstrapButtons = MySwal.mixin({
  customClass: {
    popup: "py-4",
    title: "pt-0 text-primary",
    htmlContainer: "fs-5 fw-bold",
    icon: "mt-0 border-0",
    confirmButton: "d-block btn btn-primary me-2",
    denyButton: "d-block btn btn-primary",
  },
  buttonsStyling: false,
});

export default async function invokeSwal({ title, text, icon, buttons }) {
  return swalWithBootstrapButtons
    .fire({
      title,
      text,
      iconHtml: icon,
      confirmButtonText: buttons.confirm.text,
      denyButtonText: buttons.deny.text,
      showConfirmButton: buttons.confirm ? true : false,
      showDenyButton: buttons.deny ? true : false,
      allowOutsideClick: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        if (buttons.confirm.func) {
          buttons.confirm.func();
        }
      } else if (result.isDenied) {
        if (buttons.deny.func) {
          buttons.deny.func();
        }
      }
    });
}
