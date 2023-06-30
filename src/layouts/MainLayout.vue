<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal elevated class="bg-red-8 text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Admin Pbji
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-item
        class="GNL__drawer-item"
        v-ripple
        v-for="menu in menuAdmin"
        :key="menu.title"
        clickable
        @click="onRouteClick(menu)"
      >
        <q-item-section side>
          <q-icon side v-if="menu.icon" :name="menu.icon"
        /></q-item-section>
        <q-item-section>
          <q-item-label>{{ menu.title }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item clickable @click="confirmLogout">
        <q-item-section side><q-icon name="logout" /></q-item-section>
        <q-item-section>Logout</q-item-section>
      </q-item>

      <!-- <q-item clickable>
        <q-item-section>Beranda</q-item-section>
      </q-item>
      <q-item clickable>
        <q-item-section>Presensi</q-item-section>
      </q-item>
      <q-item clickable>
        <q-item-section>Tambah Atlet</q-item-section>
      </q-item>
      <q-item clickable @click="confirmLogout">
        <q-item-section>Logout</q-item-section>
      </q-item> -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed } from "vue";
import { LocalStorage, useQuasar } from "quasar";
import { useRouter } from "vue-router";

const $q = useQuasar();
const $router = useRouter();

const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const confirmLogout = () => {
  $q.dialog({
    title: "Logout",
    message: "apakah kamu ingin keluar ?",
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    await $router.push({ name: "Login Page" });
  });
};

const onRouteClick = (menu) => {
  if (menu.route) {
    $router.push(menu.route);
  } else if (menu.callback) {
    menu.callback();
  }
};

const menuAdmin = [
  {
    title: "Dashboard",
    icon: "dashboard",
    route: { name: "Dashboard Page" },
  },
  {
    title: "presensi",
    icon: "assignment",
    route: { name: "Presensi Page" },
  },
  {
    title: "Tambah Atlet",
    icon: "add_circle",
    route: { name: "Tambah Atlet Page" },
  },
];
</script>

<!-- <style lang="scss">
.GNL {
  &__toolbar {
    height: 64px;
  }

  &__toolbar-input {
    width: 55%;
  }

  &__drawer-item {
    line-height: 24px;
    border-radius: 0 24px 24px 0;
    margin-right: 12px;

    .q-item__section--avatar {
      .q-icon {
        color: #5f6368;
      }
    }

    .q-item__label {
      color: #3c4043;
      letter-spacing: 0.01785714em;
      font-size: 0.875rem;
      font-weight: 500;
      line-height: 1.25rem;
    }
  }

  &__drawer-footer-menu {
    color: inherit;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.75rem;

    &:hover {
      color: #000;
    }
  }
}
</style> -->

<!-- <script>
import { ref } from 'vue'

export default {
  setup() {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
}
</script> -->

<!-- <template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script> -->
