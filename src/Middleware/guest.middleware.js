// Membuat middleware untuk mengecek apakah user sudah login atau belum
// jika sudah login, maka redirect ke halaman dashboard

import { LocalStorage, Notify } from 'quasar'
import { getProfile } from 'src/services/auth.service'

export default async function guest ({ to, from, next }) {
  if (LocalStorage.has('token')) {
    // Jika auth_token ada, maka ambil profile user dengan membawa token
    // Jika berhasil, maka redirect ke halaman dashboard
    await getProfile(LocalStorage.getItem('token'))
      .then(response => {
        if (response.status === 200) {
          // Simpan data user ke dalam local storage
          LocalStorage.set('token', response.data)
          Notify.create({
            message: 'kamu sudah login',
            color: 'negative',
            position: 'bottom',
            timeout: 3000,
            icon: 'fas fa-exclamation-triangle'
          })
          return next({ name: '#' })
        }
      })
  }

  return next()
}
