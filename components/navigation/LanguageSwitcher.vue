<template>
  <div class="language_switcher_wrapper">
    <nuxt-link
      aria-labelledby="Language Switcher"
      v-for="(locale, i) in alternativeLocale"
      :key="i"
      :to="switchLocalePath(locale.code)"
    >
      <img
        :src="
          $i18n.locale === 'ar'
            ? require('@/assets/media/icons/flags/en.png')
            : require('@/assets/media/icons/flags/ar.png')
        "
        :alt="`${$i18n.locale} Language`"
        width="32"
        height="32"
      />
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'LanguageSwitcher',

  computed: {
    alternativeLocale() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    },
  },
}
</script>
