<template>
  <v-app class="default_layout" :dir="$i18n.locale == 'en' ? 'ltr' : 'rtl'">
    <v-main class="app_main_content_wrapper">
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',

  head() {
    return {
      titleTemplate: `${this.$t('APP_NAME')} | %s`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Website Desc Will Go Here',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.app_main_content_wrapper {
  min-height: calc(100vh - 481px);
}
</style>
