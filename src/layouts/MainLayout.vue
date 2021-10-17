<template>
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
          v-for="link in visibleLinkList"
          :key="link.title"
          v-bind="link"
        />
        
        <LogoutLink v-if="isLoggedIn"/>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import LogoutLink from 'components/LogoutLink.vue'
const linksList = [
  {
    title: 'Apartments',
    icon: 'apartment',
    link: '/admin',
    roles: ['admin']
  },
  {
    title: 'Arrivals',
    icon: 'flight_land',
    link: '/admin',
    roles: ['admin']
  },
  {
    title: 'Mark as clean',
    icon: 'done',
    link: '/team',
    roles: ['admin', 'user']
  },
  {
    title: 'Show status',
    icon: 'maps_home_work',
    link: '/apartments',
    roles: ['admin', 'user']
  },
];

import { defineComponent, ref } from 'vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
    LogoutLink,
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      logout() {
        this.$store.dispatch('auth/logout', this.$api)
        .then(() => {
          this.$router.push('/login')
        })
      },
    }
  },
  computed : {
    ...mapGetters({
      isLoggedIn: 'auth/isLoggedIn',
      getRole: 'auth/getRole',
    }),
    visibleLinkList: function() {
      return linksList.filter(item =>{
        return item.roles.includes(this.getRole)
      });

    }
  }
})
</script>
