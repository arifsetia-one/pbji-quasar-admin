<template>
  <div class="row q-pt-xl">
    <div class="col-2"></div>
    <div class="col-8">
      <q-card class="my-card">
        <q-card-section class="bg-red-6 text-white">
          <div class="text-h6 text-center">Presensi Atlet</div>
          <div class="text-subtitle2"></div>
        </q-card-section>
      </q-card>
    </div>
    <div class="col-2"></div>
  </div>

  <div class="row q-pt-xl q-pl-md q-pr-md">
    <div class="col-2"></div>
    <div class="col-8">
      <q-form @submit.prevent="onSubmit">
        <q-input
          class="q-pb-md"
          outlined
          v-model="idNumber.id_number"
          label="masukkan id-number"
          :dense="dense"
        />
        <q-btn
          label="Submit"
          type="submit"
          color="red-4"
          :disable="submitting"
          :loading="submitting"
        />
      </q-form>
    </div>
    <div class="col-2"></div>
  </div>

  <div class="q-pt-xl q-pl-xl q-pr-xl q-pb-xl">
    <q-card flat bordered>
      <q-card-section>
        <q-table
          flat
          ref="tableRef"
          :rows="rows"
          row-key="id"
          :columns="columns"
          :filter="searchKeyword"
          @request="onRequest"
          v-model:pagination="pagination"
          @update:pagination="onPaginationUpdate"
          :binary-state-sort="true"
          :loading="loading"
          rows-per-page-label="Per halaman"
          :rows-per-page-options="[5, 10, 20, 50, 100]"
          hide-pagination
        >
          <template v-slot:top-left>
            <q-select
              outlined
              v-model="pagination.rowsPerPage"
              :options="rowsPerPageOptions"
              option-disable="inactive"
              emit-value
              map-options
              style="width: 154px"
              @update:model-value="getData"
            />
          </template>
          <template v-slot:top-right>
            <q-input
              outlined
              dense
              debounce="300"
              placeholder="Search"
              v-model="searchKeyword"
            >
              <template v-slot:append>
                <q-icon name="search"></q-icon>
              </template>
            </q-input>
          </template>
          <template v-slot:body-cell-index="props">
            <q-td :props="props" auto-width>
              {{ props.rowIndex + 1 }}
            </q-td>
          </template>
          <template v-slot:body-cell-description="props">
            <q-td :props="props">
              <q-item style="max-width: 250px">
                <q-item-label lines="1">{{
                  props.row.description ? props.row.description : "-"
                }}</q-item-label>
              </q-item>
              <q-tooltip
                anchor="top middle"
                self="bottom middle"
                :offset="[0, 10]"
                v-if="props.row.description"
              >
                <div class="text-ellipsis">{{ props.row.description }}</div>
              </q-tooltip>
            </q-td>
          </template>
        </q-table>
        <div class="row justify-center q-mt-md">
          <q-pagination
            v-model="pagination.page"
            color="grey-8"
            :max="pagesNumber"
            :max-pages="1"
            boundary-links
            direction-links
            size="md"
            gutter="10px"
            @update:model-value="getData"
          >
          </q-pagination>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { presence, getPresence } from "src/services/auth.service";
import { getAPI } from "src/services/fetch.service";
import { useQuasar } from "quasar";

// const $router = useRouter();
const $q = useQuasar();

const idNumber = ref({
  id_number: "",
});

const submitting = ref(false);
const onSubmit = async () => {
  submitting.value = true;

  try {
    const response = await presence(idNumber.value);
    const name = response.data.uname;
    console.log(name);

    $q.notify({
      message: "hi " + name + " , anda berhasil presensi !!",
      color: "positive",
      position: "bottom",
      timeout: 2000,
      icon: "check_circle",
    });

    await setTimeout(function () {
      window.location.reload(1);
    }, 50);
  } catch (err) {
    console.log("err", err);
  } finally {
    submitting.value = false;
  }
};

// GET METHOD
const columns = [
  {
    name: "index",
    label: "No.",
    field: "index",
    align: "left",
  },
  {
    name: "nama",
    label: "Nama",
    field: "nama",
    align: "left",
    required: true,
    sortable: true,
  },
  {
    name: "user_id_number",
    label: "Id Number",
    field: "user_id_number",
    align: "left",
    sortable: true,
  },
  {
    name: "created_at",
    label: "Waktu Presensi",
    field: "created_at",
    align: "left",
    sortable: true,
  },
];

const rows = ref([]);

const loading = ref(false);

const rowsPerPageOptions = [
  {
    label: "Tampilkan 5",
    value: 5,
  },
  {
    label: "Tampilkan 10",
    value: 10,
  },
  {
    label: "Tampilkan 20",
    value: 20,
  },
  {
    label: "Tampilkan 50",
    value: 50,
  },
  {
    label: "Tampilkan 100",
    value: 100,
  },
];

const pagesNumber = computed(() => {
  return Math.ceil(pagination.value.rowsNumber / pagination.value.rowsPerPage);
});

const tableRef = ref();
const pagination = ref({
  sortBy: "created_at",
  descending: true,
  page: 1,
  rowsPerPage: 5,
  rowsNumber: null,
});

const searchKeyword = ref("");

/* GET OPERATION */

const getData = async () => {
  loading.value = true;

  // get pagination data
  const { page, rowsPerPage, sortBy, descending } = pagination.value;

  await getAPI("/v1/admin/atlet", {
    params: {
      search: searchKeyword.value,
      page,
      size: rowsPerPage || 999,
      sort: {
        name: sortBy,
        dir: descending ? "desc" : "asc",
      },
      type: 0, // 0 = Post (Konten), 1 = Event
    },
  })
    .then((res) => {
      console.log("res", res);
      pagination.value.rowsNumber = res.paginate.totalData;
      rows.value = res.data;
    })
    .catch((err) => {
      console.log("err", err);
    })
    .finally(() => {
      loading.value = false;
    });
};

const onRequest = (props) => {
  console.log("onRequest", props);
  pagination.value = props.pagination;
  searchKeyword.value = props.filter;
  getData();
};

const onPaginationUpdate = (pagination) => {
  console.log("onPaginationUpdate", pagination);
  onRequest({
    pagination,
    filter: searchKeyword.value,
  });
};

// const onSearch = (keyword) => {
//   console.log('onSearch', keyword)
//   onRequest({
//     pagination: pagination.value,
//     filter: keyword
//   })
// }

onMounted(() => {
  // getData()

  // get initial data from server (1st page)
  tableRef.value.requestServerInteraction();
});
</script>

<style>
.my-card {
  width: 100%;
  max-width: 250px;
  margin-left: auto;
  margin-right: auto;
}
</style>
