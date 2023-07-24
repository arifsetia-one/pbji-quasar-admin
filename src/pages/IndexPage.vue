<template>
  <div class="row q-pt-xl">
    <div class="col-2"></div>
    <div class="col-8">
      <q-card class="my-card">
        <q-card-section class="bg-red-6 text-white">
          <div class="text-h6 text-center">Dashboard</div>
          <div class="text-subtitle2"></div>
        </q-card-section>
      </q-card>

      <div class="q-pt-md q-pl-md q-pr-md q-pb-md">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-h6 q-pl-md">Tabel Atlet</div>
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

      <!-- <q-card flat bordered class="my-card">
        <q-card-section>
          <div class="text-h6">Dashboard</div>
        </q-card-section>

        <q-separator inset />

        <q-card-section> Hallo Admin, selamat datang </q-card-section>
      </q-card> -->
    </div>
    <div class="col-2"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
// import { useRouter } from "vue-router";
import { presence, getPresence } from "src/services/auth.service";
import { getAPI } from "src/services/fetch.service";
import { useQuasar } from "quasar";

// GET METHOD
const columns = [
  {
    name: "index",
    label: "No.",
    field: "index",
    align: "left",
  },
  {
    name: "id_number",
    label: "Id Number",
    field: "id_number",
    align: "left",
    required: true,
    sortable: true,
  },
  {
    name: "uname",
    label: "Nama",
    field: "uname",
    align: "left",
    sortable: true,
  },
  {
    name: "full_addresses",
    label: "Alamat Lengkap",
    field: "full_addresses",
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

  await getAPI("/v1/admin/user", {
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

// ahihihihihi
</script>
