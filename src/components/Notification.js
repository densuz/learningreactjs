// Notification.js
import Notiflix from 'notiflix';

// Konfigurasi global Notiflix (opsional, bisa diubah sesuai kebutuhan)
Notiflix.Notify.init({
  width: '300px',
  position: 'right-top',
  distance: '10px',
  opacity: 1,
  borderRadius: '8px',
  timeout: 4000,
  fontSize: '16px',
  cssAnimationStyle: 'fade',
});

Notiflix.Confirm.init({
    backOverlay: true,
    titleColor: "#d9534f",
    okButtonBackground: "#d9534f",
    cancelButtonBackground: "#f0ad4e",
    width: "350px",
    borderRadius: "8px",
  });
  

// Membuat objek Notification
const Notification = {
  success: (message, title = 'Success') => {
    Notiflix.Notify.success(`${title}: ${message}`);
  },
  error: (message, title = 'Error') => {
    Notiflix.Notify.failure(`${title}: ${message}`);
  },
  warning: (message, title = 'Warning') => {
    Notiflix.Notify.warning(`${title}: ${message}`);
  },
  info: (message, title = 'Info') => {
    Notiflix.Notify.info(`${title}: ${message}`);
  },

  remove: () => {
    Notiflix.Notify.remove();
  },

//   confirm: (message, title = 'Confirm', onYes, onNo) => {
//     Notiflix.Confirm.show(
//       title,
//       message,
//       'Yes', // Teks tombol "Yes"
//       'No', // Teks tombol "No"
//       () => onYes && onYes(), // Callback untuk "Yes"
//       () => onNo && onNo() // Callback untuk "No"
//     );
//   },

  prompt: (message, title = 'Prompt', callback) => {
    Notiflix.Report.prompt(title, message, callback);
  },
};

// Membuat objek Loading
const Loading = {
  show: (message = 'Loading...') => {
    Notiflix.Loading.standard(message);
  },
  remove: () => {
    Notiflix.Loading.remove();
  },
  hourglass: (message = 'Loading...') => {
    Notiflix.Loading.hourglass(message);
  },
};

// Ekspor keduanya
export { Notification, Loading };
