// Membuat middleware untuk mengecek apakah user sudah login atau belum
// Jika belum login, redirect ke halaman login

import { LocalStorage, Notify } from "quasar";
import { getProfile } from "src/services/auth.service";

export default async function auth({ to, from, next }) {
  // Fungsi untuk menghandle error (dipakai nanti di bawah)
  const handleError = () => {
    Notify.create({
      message: "kamu belum log in",
      color: "negative",
      position: "bottom",
      timeout: 3000,
      icon: "fas fa-exclamation-triangle",
    });
    return next({ name: "Login Page" });
  };

  // Cek apakah auth_token ada?
  // Jika tidak ada, maka redirect ke halaman login
  if (!LocalStorage.has("auth_token")) {
    Notify.create({
      message: "kamu belum login",
      color: "negative",
      position: "bottom",
      timeout: 3000,
      icon: "fas fa-exclamation-triangle",
    });
    LocalStorage.remove("auth_user");
    return next({ name: "Login Page" });
  } else {
    // Jika auth_token ada, maka ambil profile user dengan membawa token
    // Jika gagal, maka redirect ke halaman login
    await getProfile(LocalStorage.getItem("auth_token"))
      .then((response) => {
        if (response.status === 200) {
          // Jika berhasil, maka simpan data user ke dalam local storage
          LocalStorage.set("auth_user", response.data);
        } else {
          // Panggil fungsi handleError() yang sudah dibuat di atas
          handleError();
        }
      })
      .catch(handleError);
  }

  return next();
}
