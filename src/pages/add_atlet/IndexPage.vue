<template>
  <div class="row q-pt-xl">
    <div class="col-2"></div>
    <div class="col-8">
      <q-card class="my-card">
        <q-card-section class="bg-red-6 text-white">
          <div class="text-h6 text-center">Tambah Akun Atlet</div>
          <div class="text-subtitle2"></div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-2"></div>
  </div>

  <div class="q-pt-xl q-pl-xl q-pr-xl">
    <q-form @submit.prevent="onSubmit">
      <div class="row q-pb-xl">
        <div class="col q-pr-md">
          <q-input
            v-model="inputValue.username"
            label="username"
            :dense="dense"
          />
          <q-input
            v-model="inputValue.fullname"
            label="fullname"
            :dense="dense"
          />
          <q-input
            v-model="inputValue.id_number"
            label="nomor id"
            :dense="dense"
          />
        </div>
        <div class="col q-pl-md">
          <q-input
            v-model="inputValue.password"
            label="password"
            :dense="dense"
          />
          <!-- <q-input v-model="text" label="photo" :dense="dense" /> -->
          <!-- <q-input v-model="text" label="role" :dense="dense" /> -->
        </div>
      </div>

      <q-btn
        label="Submit"
        type="submit"
        color="red-4"
        :disable="submitting"
        :loading="submitting"
      />
    </q-form>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { addUser } from "src/services/auth.service";
import { useQuasar } from "quasar";

const $q = useQuasar();
const $router = useRouter();

const inputValue = ref({
  username: "",
  fullname: "",
  id_number: "",
  password: "",
  // photo_url: "",
  roles: ["Atlet"],
});

const submitting = ref(false);
const onSubmit = async () => {
  submitting.value = true;

  try {
    const response = await addUser(inputValue.value);
    const status = response.status;
    const errorMessage = response.data.message;

    // console.log(response.data.message);

    if (status === 200) {
      $q.notify({
        message: "akun berhasil di buat !!",
        color: "positive",
        position: "bottom",
        timeout: 2000,
        icon: "check_circle",
      });

      // await $router.push({ name: "Tambah Atlet Page" });
    } else {
      // console.log(response.data.message);
      $q.notify({
        message: "Error " + errorMessage,
        color: "negative",
        position: "bottom",
        timeout: 2000,
        icon: "error",
      });
    }

    // const name = response.data.uname;
    // console.log(name);

    // $q.notify({
    //   message: "hi " + name + " , anda berhasil presensi !!",
    //   color: "positive",
    //   position: "bottom",
    //   timeout: 2000,
    //   icon: "check_circle",
    // });

    // await setTimeout(function () {
    //   window.location.reload(1);
    // }, 100);
  } catch (err) {
    console.log("err", err);
  } finally {
    submitting.value = false;
  }
};
</script>
