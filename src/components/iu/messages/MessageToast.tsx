import Swal from 'sweetalert2'


interface MessageToastProps {
  icon: "success" | "info" | "error" | "warning" | "question"
  title: string
  message: string
}

const MessageToast = ({ icon, title, message }: MessageToastProps) => {
  // Componente Toast
  const showToast = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: true,
      timer: 3000,
      timerProgressBar: true,
      didOpen: toast => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    })

    Toast.fire({
      icon: icon,
      title: title,
      text: message,
      showConfirmButton: false,
    })
  }

  showToast()
  return null
}

export default MessageToast