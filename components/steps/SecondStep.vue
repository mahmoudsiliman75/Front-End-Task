<template>
  <section class="company_identity_form_step_wrapper">
    <div class="step_title_wrapper">
      <span class="step_number"> 2 </span>
      <h2 class="step_title"> {{ $t("TITLES.WizardForms.locationInformation") }} </h2>
    </div>

    <v-form
      class="w-100 mt-8"
      ref="locationForm"
      v-model="formIsValid"
      lazy-validation
    >
      <div class="row">
        <!-- Start:: Countries Input -->
        <base-select-input
          col="4"
          static
          :staticItems="countries"
          :placeholder="$t('FORMS.Placeholders.country') + '*'"
          :validationRules="validationSchema.countryRules"
          :serverSideErrorMessage="data.country.error"
          @clearServerSideErrorMessage="data.country.error = null"
          v-model="data.country.value"
        />
        <!-- End:: Countries Input -->

        <!-- Start:: States Input -->
        <base-input
          v-if="data.state.value && data.state.value.id === 'other_state'"
          col="4"
          type="text"
          :placeholder="$t('FORMS.Placeholders.state') + '*'"
          :validationRules="validationSchema.stateRules"
          :serverSideErrorMessage="data.otherState.error"
          @clearServerSideErrorMessage="data.otherState.error = null"
          v-model="data.otherState.value"
          :disabled="!data.country.value"
          required
        />

        <base-select-input
          v-else
          col="4" 
          static
          :staticItems="states"
          :placeholder="$t('FORMS.Placeholders.state') + '*'"
          :validationRules="validationSchema.stateRules"
          :serverSideErrorMessage="data.state.error"
          @clearServerSideErrorMessage="data.state.error = null"
          v-model="data.state.value"
          :disabled="!data.country.value"
        />
        <!-- End:: States Input -->
  
        <!-- Start:: Cities Input -->
        <base-input
          v-if="data.city.value && data.city.value.id === 'other_city'"
          col="4"
          type="text"
          :placeholder="$t('FORMS.Placeholders.state') + '*'"
          :validationRules="validationSchema.stateRules"
          :serverSideErrorMessage="data.otherCity.error"
          @clearServerSideErrorMessage="data.otherCity.error = null"
          v-model="data.otherCity.value"
          :disabled="!data.country.value"
          required
        />

        <base-select-input
          v-else
          col="4"
          static
          :staticItems="cities"
          :placeholder="$t('FORMS.Placeholders.city') + '*'"
          :validationRules="validationSchema.cityRules"
          :serverSideErrorMessage="data.city.error"
          @clearServerSideErrorMessage="data.city.error = null"
          v-model="data.city.value"
          :disabled="!data.country.value || !data.state.value"
        />
        <!-- End:: Cities Input -->
  
        <!-- Start:: Map Input -->
        <map-location-input
          :placeholder="$t('FORMS.Placeholders.address')+'*'"
          :validationRules="validationSchema.addressRules"
          :serverSideErrorMessage="data.address.error"
          @selectLocation="setSelectedCoordinates"
          required
        />
        <!-- End:: Map Input -->
      </div>
    </v-form>

    <div class="btns_wrapper">
      <base-button
        :btnText="$t('BUTTONS.previous')"
        styleType="text_btn"
        @fireClick="$emit('fireNavigateToPreviousStep')"
      />

      <base-button
        :btnText="$t('BUTTONS.submit')"
        styleType="primary_btn"
        @fireClick="submitForm"
        :isLoading="isWaitingApiResponse"
        :disabled="isWaitingApiResponse || !formIsValid"
      />
    </div>
  </section>
</template>

<script>
  export default {
    name: 'SecondStep',

    emits: ['fireNavigateToPreviousStep', 'submitForm'],

    props: {
      isWaitingApiResponse: {
        type: Boolean,
        required: true,
        default: true,
      },
    },

    data() {
      return {
        // Start::Categories Data
        countries: [
          {
            id: 1,
            name: 'Country 1'
          },
          {
            id: 2,
            name: 'Country 2'
          },
        ],
        states: [
          {
            id: 1,
            name: 'State 1'
          },
          {
            id: 2,
            name: 'State 2'
          },
          {
            id: 'other_state',
            name: 'Other State'
          },
        ],
        cities: [
          {
            id: 1,
            name: 'City 1'
          },
          {
            id: 2,
            name: 'City 2'
          },
          {
            id: 'other_city',
            name: 'Other City'
          },
        ],
        // End::Categories Data

        // Start:: Company Details Data
        data: {
          country: {
            value: null,
            error: null,
          },
          state: {
            value: null,
            error: null,
          },
          otherState: {
            value: null,
            error: null,
          },
          city: {
            value: null,
            error: null,
          },
          otherCity: {
            value: null,
            error: null,
          },
          address: {
            value: null,
            error: null,
          },
        },
        // End:: Company Details Data

        // Start:: Validation Schema
        formIsValid: true,
        validationSchema: {
          countryRules: [
            val => !!val || this.$t('FORMS.Validation.country'),
          ],
          stateRules: [
            val => !!val || this.$t('FORMS.Validation.state'),
          ],
          cityRules: [
            val => !!val || this.$t('FORMS.Validation.city'),
          ],
          addressRules: [(val) => !!val || this.$t('FORMS.Validation.address')],
        },
        // End:: Validation Schema
      }
    },

    methods: {
      // Start:: Set Selected Map Coordinates
      async setSelectedCoordinates(selectedData) {
        this.data.address.value = selectedData;
      },
      // End:: Set Selected Map Coordinates

      // Start:: Pass Selected Package Data To Parent Component
      async submitForm() {
        await this.$refs.locationForm.validate(); 

        if (this.formIsValid){
          this.$emit("submitForm", {
            country: this.data.country.value,
            state: this.data.state.value,
            otherState: this.data.otherState.value,
            city: this.data.city.value,
            otherCity: this.data.otherCity.value,
            address: this.data.address.value,
          });
        }
      },
      // End:: Pass Selected Package Data To Parent Component
    },
  }
</script>

<style lang="scss" scoped>
.company_identity_form_step_wrapper {
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

  .btns_wrapper { 
    margin-block-start: 4rem;
    @include flex(flex-end, center);
    column-gap: 0.5rem;
  }
}
</style>