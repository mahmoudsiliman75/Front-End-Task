<template>
  <div :class="col ? `col-md-${col}` : ''">
    <!-- Start:: Text || Number || Tel || Email Input -->
    <div
      class="input_wrapper"
      v-if="
        type == 'text' || type == 'number' || type == 'tel' || type == 'email' || type  == 'search'
      "
    >
      <v-text-field
        :type="type"
        :label="placeholder"
        :placeholder="staticPlaceholder"
        :value="value"
        @input="updateValue($event)"
        @focus="clearServerSideErrorMessage"
        @blur="fireBlur"
        :required="required"
        :disabled="disabled"
        :readonly="readonly"
        :rules="validationRules"
        :error-messages="serverSideErrorMessage"
        :loading="inputIsLoading"
        loader-height="3"
        loader-color="yellow darken-2"
      >
      </v-text-field>
      <!-- Validation -->
      <!-- <transition name="fadeIn">
        <p class="validationErr" v-if="showAlert">{{ validationMessage }}</p>
      </transition> -->
    </div>
    <!-- End:: Text || Number || Tel || Email Input -->

    <!-- Start:: Password Input -->
    <div class="input_wrapper" v-else-if="type == 'password'">
      <v-text-field
        :type="passwordIsVisible ? 'text' : 'password'"
        :label="placeholder"
        :placeholder="staticPlaceholder"
        :required="required"
        :value="value"
        @input="updateValue($event)"
        @focus="clearServerSideErrorMessage"
        :rules="validationRules"
        :error-messages="serverSideErrorMessage"
      >
      <template slot="append">
        <button type="button" @click="passwordIsVisible = !passwordIsVisible">
          <span v-show="passwordIsVisible">
            <i class="fa-solid fa-eye-slash"></i>
          </span>

          <span v-show="!passwordIsVisible">
            <i class="fa-solid fa-eye"></i>
          </span>
        </button>
      </template>
      </v-text-field>
      <!-- Validation
      <transition name="fadeIn">
        <p class="validationErr" v-if="showAlert">{{ validationMessage }}</p>
      </transition> -->
    </div>
    <!-- End:: Password Input -->

    <!-- Start:: Textarea Input -->
    <div class="input_wrapper" v-else-if="type == 'textarea'">
      <v-textarea
        :label="placeholder"
        :placeholder="staticPlaceholder"
        :value="value"
        @input="updateValue($event)"
        @focus="clearServerSideErrorMessage"
        :required="required"
        :rows="rows"
        :rules="validationRules"
        :disabled="disabled"
        :readonly="readonly"
        :error-messages="serverSideErrorMessage"
      ></v-textarea>
      <!-- <transition name="fadeIn">
        <p class="validationErr" v-if="showAlert">{{ validationMessage }}</p>
      </transition> -->
    </div>

    <template v-else-if="type == 'ckeditor'">
      <label class="v-label">{{ placeholder }}</label>
      <ckeditor @input="updateValue($event)" @focus="clearServerSideErrorMessage" :value="value"></ckeditor>
    </template>
    <!-- End:: Textarea Input -->
  </div>
</template>

<script>
export default {
  name: "base-input",

  emits: ["fireBlur", "clearServerSideErrorMessage"],

  props: {
    // ====== General Inputs Props
    value: {
      required: true,
    },
    type: {
      required: true,
      type: String,
    },
    placeholder: {
      required: false,
      type: String,
    },
    staticPlaceholder: {
      required: false,
      type: String,
    },
    col: {
      required: false,
      type: String,
    },
    readonly: {
      required: false,
      type: Boolean,
      default: false,
    },
    disabled: {
      required: false,
      type: Boolean,
      default: false,
    },
    required: {
      required: false,
      type: Boolean,
      default: false,
    },
    validationRules: {
      required: false,
      type: Array,
    },
    serverSideErrorMessage: {
      required: false,
    },
    inputIsLoading: {
      type: Boolean,
      required: false,
      default: false
    },


    // ====== Textarea Input Props
    rows: {
      required: false,
      type: String,
      default: "4",
    },
  },

  data() {
    return {
      // Validation Alert
      showAlert: false,
      validationMessage: "errer",

      // Start:: Password Visibility Data
      passwordIsVisible: false,
      // End:: Password Visibility Data
    };
  },

  methods: {
    updateValue(e) {
      this.$emit("input", e);
    },

    fireBlur() {
      this.$emit("fireBlur");
    },
    clearServerSideErrorMessage() {
      if(this.serverSideErrorMessage) {
        this.$emit("clearServerSideErrorMessage");
      }
    },
  },
};
</script>
