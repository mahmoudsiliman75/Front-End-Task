<template>
  <div class="empty_message_wrapper">
      <!-- Start:: Empty Message Image Wrapper -->
      <div class="image_wrapper">
        <img
          :src="imageUrl"
          :alt="messageText"
          width="350"
          height="350"
        />
      </div>
      <!-- END:: Empty Message Image Wrapper -->

      <!-- Start:: Empty Message Text Wrapper -->
      <div class="text_wrapper">
        <h3 class="message_title">{{ messageText }}</h3>
      </div>
      <!-- End:: Empty Message Text Wrapper -->
  </div>
</template>

<script>
export default {
  name: "EmptyMessage",

  props: {
    imageUrl: {
      type: String,
      require: true,
    },
    messageText: {
      type: String,
      require: true,
    },
  },
};
</script>

<style lang="scss">
.empty_message_wrapper {
  @include flex(center, center, column);
  row-gap: 25px;
  .text_wrapper {
    width: 75%;
    text-align: center;
    .message_title {
      font-size: 1.5rem;
      font-family: $semi_bold_font;
    }
  }
}

@media (max-width: 991px) {
  .empty_message_wrapper {
    .text_wrapper {
      width: 100%;
    }
  }
}
</style>
