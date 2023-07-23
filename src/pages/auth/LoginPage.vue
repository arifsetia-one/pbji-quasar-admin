<template>
  <div id="q-app">
    <q-layout view="lHh Lpr lFf">
      <q-page-container>
        <q-page class="flex flex-center bg-grey-2">
          <q-card class="q-pa-md shadow-2 my_card" bordered>
            <q-card-section class="text-center">
              <div class="text-grey-9 text-h5 text-weight-bold">Masuk Sebagai Admin</div>
              <div class="text-grey-8">Silahkan masuk dengan akun admin</div>
            </q-card-section>
            <q-form @submit.prevent="onSubmit">
              <q-card-section>
                <q-input dense outlined v-model="input.username" label="username"></q-input>
                <q-input dense outlined class="q-mt-md" v-model="input.password" type="password"
                  label="Password"></q-input>
              </q-card-section>
              <q-card-section>
                <q-btn style="border-radius: 8px" type="submit" color="red-8" rounded size="md" label="Masuk" no-caps
                  class="full-width" :disable="submitting" :loading="submitting"></q-btn>
              </q-card-section>
            </q-form>
            <!-- <q-card-section class="text-center q-pt-none">
              <div class="text-grey-8">
                Don't have an account yet?
                <a
                  href="#"
                  class="text-dark text-weight-bold"
                  style="text-decoration: none"
                  >Sign up.</a
                >
              </div>
            </q-card-section> -->
          </q-card>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import { login } from "src/services/auth.service";

const $router = useRouter();
const $q = useQuasar();

const input = ref({
  username: "",
  password: "",
});

const submitting = ref(false);

const onSubmit = async () => {
  submitting.value = true;

  try {
    const response = await login(input.value);
    // console.log(response.status);

    if (response.status === 200) {
      localStorage.setItem("auth_token", response.data.token);

      $q.notify({
        message: "Login success!",
        color: "positive",
        position: "top",
        timeout: 2000,
        icon: "check_circle",
      });

      await $router.push({ name: "Dashboard Page" });
    } else {
      $q.notify({
        message: "username atau password salah !",
        color: "negative",
        position: "top",
        timeout: 2000,
        icon: "error",
      });
    }
  } catch (err) {
    console.log("err", err);
  } finally {
    submitting.value = false;
  }
  // try {
  //   const response = await login(input.value);
  //   console.log(response);

  //   localStorage.setItem("auth_token", response.data.token);

  // $q.notify({
  //   message: "Login success!",
  //   color: "positive",
  //   position: "top",
  //   timeout: 2000,
  //   icon: "check_circle",
  // });

  //   await $router.push({ name: "Dashboard Page" });
  // } catch (err) {
  //   console.log("err", err);
  // } finally {
  //   submitting.value = false;
  // }
};

// import { Quasar } from "Quasar";
// import { ref, Vue } from "vue";

// const app = Vue.createApp({
//   setup() {
//     return {
//       email: ref(""),
//       password: ref(""),
//     };
//   },
// });

// app.use(Quasar, { config: {} });
// app.mount("#q-app");
</script>

<style scoped>
.my_card {
  width: 25rem;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
}
</style>
