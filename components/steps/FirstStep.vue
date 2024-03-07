<template>
  <section class="company_details_form_step_wrapper">
    <div class="step_title_wrapper">
      <span class="step_number"> 1 </span>
      <h2 class="step_title"> {{ $t("TITLES.WizardForms.basicInformation") }} </h2>
    </div>

    <v-form
      class="w-100 mt-8"
      ref="basicInformationForm"
      v-model="formIsValid"
      lazy-validation
    >
      <div class="row">
        <!-- Start:: Name Input -->
        <base-input
          col="6"
          type="text"
          :placeholder="$t('FORMS.Placeholders.name') + '*'"
          :validationRules="validationSchema.nameRules"
          :serverSideErrorMessage="data.name.error"
          @clearServerSideErrorMessage="data.name.error = null"
          v-model.trim="data.name.value"
          required
        />
        <!-- End:: Name Input -->

        <!-- Start:: Phone Input -->
        <div class="col-md-6 d-flex justify-start align-start gap-2">
          <client-only>
            <vue-country-code
              ref="vcc"
              @onSelect="onSelectPhoneCode"
            />
          </client-only>
  
          <base-input
            class="w-100"
            type="tel"
            :placeholder="$t('FORMS.Placeholders.phone') + '*'"
            :validationRules="validationSchema.phoneRules"
            :serverSideErrorMessage="data.phone.error"
            @clearServerSideErrorMessage="data.phone.error = null"
            v-model.trim="data.phone.value"
            required
          />
        </div>
        <!-- End:: Phone Input -->

        <!-- Start:: Email Input -->
        <base-input
          col="6"
          type="email"
          :placeholder="$t('FORMS.Placeholders.email') + '*'"
          :validationRules="validationSchema.emailRules"
          :serverSideErrorMessage="data.email.error"
          @clearServerSideErrorMessage="data.email.error = null"
          v-model.trim="data.email.value"
          required
        />      
        <!-- End:: Email Input -->

        <!-- Start:: National Id Attachment Input -->
        <base-document-upload-input
          col="6"
          class="mb-8"
          identifier="nat_id_mage"
          :placeholder="$t('FORMS.Placeholders.nationalId') + '*'"
          accept="image/*"
          @selectDocument="selectDocument"
          @clearErrors="data.natIdImage.error = null"
          :errorMessage="data.natIdImage.error"
          required
        />
        <!-- End:: National Id Attachment Input -->

        <!-- Start:: National Id Number Input -->
        <base-input
          col="6"
          type="number"
          :placeholder="$t('FORMS.Placeholders.nationalIdNumber')"
          :validationRules="validationSchema.natIdRules"
          :serverSideErrorMessage="data.natIdNumber.error"
          @clearServerSideErrorMessage="data.natIdNumber.error = null"
          v-model.trim="data.natIdNumber.value"
          required
        />
        <!-- End:: National Id Number Input -->

        <!-- Start:: Personal Image Input -->
        <base-document-upload-input
          col="6"
          class="mb-8"
          identifier="personal_image"
          :placeholder="$t('FORMS.Placeholders.personalImage') + '*'"
          accept="image/*"
          @selectDocument="selectDocument"
          @clearErrors="data.personalImage.error = null"
          :errorMessage="data.personalImage.error"
          required
        />
        <!-- End:: Personal Image Input -->

        <!-- Start:: Password Input -->
        <base-input
          col="6"
          type="password"
          :placeholder="$t('FORMS.Placeholders.password')+'*'"
          :validationRules="validationSchema.passwordRules"
          :serverSideErrorMessage="data.password.error"
          @clearServerSideErrorMessage="data.password.error = null"
          v-model.trim="data.password.value"
          required
        />
        <!-- End:: Password Input -->

        <!-- Start:: Confirm Password Input -->
        <base-input
          col="6"
          type="password"
          :placeholder="$t('FORMS.Placeholders.confirmPassword')+'*'"
          :validationRules="validationSchema.confirmPasswordRules"
          :serverSideErrorMessage="data.confirmPassword.error"
          @clearServerSideErrorMessage="data.confirmPassword.error = null"
          v-model.trim="data.confirmPassword.value"
          required
        />
        <!-- End:: Confirm Password Input -->
      </div>
    </v-form>

    <div class="btns_wrapper">
      <base-button
        :btnText="$t('BUTTONS.next')"
        styleType="primary_btn"
        @fireClick="navigateToSecondStep"
        :disabled="!formIsValid"
      />
    </div>
  </section>
</template>

<script>
  import isValidEmail from '@/utils/isValidEmail';
  import isValidPassword from '@/utils/isValidPassword';

  export default {
    name: 'firstStep',

    emits: ['fireNavigateToSecondStep'],

    data() {
      return {
        // Start:: Company Details Data
        data: {
          name: {
            value: null,
            error: null,
          },
          email: {
            value: null,
            error: null,
          },
          phoneCode: {
            value: null,
            error: null,
          },
          phone: {
            value: null,
            error: null,
          },
          natIdImage: {
            value: null,
            error: null,
          },
          natIdNumber: {
            value: null,
            error: null,
          },
          personalImage: {
            value: null,
            error: null,
          },
          password: {
            value: null,
            error: null,
          },
          confirmPassword: {
            value: null,
            error: null,
          },
        },
        // End:: Company Details Data

        // Start:: Validation Schema
        formIsValid: true,
        validationSchema: {
          nameRules: [
            val => !!val || this.$t('FORMS.Validation.name'),
            val => !(val && val.length < 3) || this.$t('FORMS.Validation.nameMinLength'),
            val => !(val && val.length > 256) || this.$t('FORMS.Validation.nameMaxLength'),
          ],
          emailRules: [
            (val) => !!val || this.$t('FORMS.Validation.email'),
            (val) =>
              (val && !!isValidEmail(val)) ||
              this.$t('FORMS.Validation.invalidEmail'),
          ],
          phoneRules: [
            val => !!val || this.$t('FORMS.Validation.phone'),
            val => !(val && val.length < 9) || this.$t('FORMS.Validation.phoneMinLength'),
            val => !(val && val.length > 15) || this.$t('FORMS.Validation.phoneMaxLength'),
          ],
          natIdRules: [
            val => !(val && !(val.startsWith("1") || val.startsWith("2")) ) || this.$t('FORMS.Validation.natIdStartWith1or2'),
            val => !(val && val.length !== 10) || this.$t('FORMS.Validation.natIdLength'),
          ],
          passwordRules: [
            val => !!val || this.$t('FORMS.Validation.password'),
            val => (val && !!isValidPassword(val)) || this.$t('FORMS.Validation.notValidPassword'),
          ],
          confirmPasswordRules: [
            val => !!val || this.$t('FORMS.Validation.confirmPassword'),
            val => (val && !!isValidPassword(val)) || this.$t('FORMS.Validation.notValidPassword'),
            val => val === this.data.password.value || this.$t('FORMS.Validation.passwordsMatching'),
          ],
        },
        // End:: Validation Schema
      }
    },

    methods: {
      // Start:: Handel Phone Code Selection
      onSelectPhoneCode({name, iso2, dialCode}) {
        this.data.phoneCode.value = dialCode;
        // console.log("onSelectPhoneCode =>", name, iso2, dialCode);
      },
      // End:: Handel Phone Code Selection

      // Start:: Select Upload Document
      selectDocument(selectedDocument) {
        if(selectedDocument.identifier === "nat_id_mage") {
          this.formIsValid = true;
          this.data.natIdImage.value = selectedDocument;
        } else if(selectedDocument.identifier === "personal_image") {
          this.formIsValid = true;
          this.data.personalImage.value = selectedDocument;
        }
      },
      // End:: Select Upload Document

      // Start:: Pass Selected Package Data To Parent Component
      async navigateToSecondStep() {
        if (!this.data.natIdImage.value) {
          this.data.natIdImage.error = this.$t('FORMS.Validation.natIdAttachment');
          this.formIsValid = false;
          return
        } else if (!this.data.personalImage.value) {
          this.data.personalImage.error = this.$t('FORMS.Validation.personalImage');
          this.formIsValid = false;
          return
        } else {
          await this.$refs.basicInformationForm.validate(); 
  
          if (this.formIsValid){
            this.$emit("fireNavigateToSecondStep", {
              name: this.data.name.value,
              email: this.data.email.value,
              phone: this.data.phone.value,
              natIdImage: this.data.natIdImage.value,
              natIdNumber: this.data.natIdNumber.value,
              personalImage: this.data.personalImage.value,
              password: this.data.password.value,
              confirmPassword: this.data.confirmPassword.value,
            });
          }
        }
      },
      // End:: Pass Selected Package Data To Parent Component
    },
  }
</script>

<style lang="scss">
.company_details_form_step_wrapper {
  .step_title_wrapper {
    margin-block: 1rem;
    @include flex(flex-start, center);
    column-gap: 0.8rem;
    .step_number {
      @include flex(center, center);
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: var(--main_theme_clr);
      font-size: 0.8rem;
      color: var(--white);
    }
  
    .step_title {
      width: calc(100% - 20px + 0.8rem);
      margin-block-end: 0 !important;
      font-size: 1rem;  
      font-family: $bold_font;
      line-height: 1.8;
    }
  }

  .vue-country-select {
    border: none;
    outline: none;
    box-shadow: none;
    padding-block: 2px;
    background-color: var(--theme_inputs_bg);
    .dropdown-list {
      width: fit-content !important;
      overflow-x: hidden !important;
    }
  }

  .btns_wrapper { 
    @include flex(flex-end, center);
    column-gap: 0.5rem;
  }
}
</style>