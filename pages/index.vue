<template>
  <section class="wizard_form_content_wrapper">
    <div class="container" v-if="!requestIsCompleted">
      <LanguageSwitcher />

      <!-- ========== Start:: Wizard Form ========== -->
      <div class="forms_wrapper">
        <!-- Start:: Forms -->
        <v-stepper 
          v-model="currentStep" 
          class="p-0"
          flat
        >
          <v-stepper-items>
            <v-stepper-content step="FirstStep">
              <FirstStep
                @fireNavigateToSecondStep="handelSecondStepNavigation"
              />
            </v-stepper-content>

            <v-stepper-content step="SecondStep">
              <SecondStep   
                :isWaitingApiResponse="isWaitingApiResponse"
                @fireNavigateToPreviousStep="currentStep = 'FirstStep'"
                @submitForm="handelLastStep"
              />
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
        <!-- End:: Forms -->
      </div>
      <!-- ========== End:: Wizard Form ========== -->
    </div>

    <div class="container" v-else>
      <div class="completed_request_message">
        <img
          class="request_completed"
          src="@/assets/media/images/add_company_request_completed.svg"
          width="220"
          height="220"
          :alt="$t('TITLES.WizardForms.requestSent')"
          loading="lazy"
        />

        <h3 class="message_body"> {{ $t("TITLES.WizardForms.requestSent") }} </h3>

        <button @click="$router.go()"> {{ $t("BUTTONS.ok") }} </button>
      </div>
    </div>
  </section>
</template>

<script>
import LanguageSwitcher from '@/components/navigation/LanguageSwitcher.vue';
import FirstStep from "@/components/steps/FirstStep.vue";
import SecondStep from "@/components/steps/SecondStep.vue";

export default {
  name: "WizardForm",

  transition: {
    name: 'fadeInUp',
    mode: 'out-in',
  },

  head() {
    return {
      title: this.$t('TITLES.WizardForms.register'),
      meta: [
        {
          hid: 'title',
          name: 'title',
          content: this.$t('TITLES.WizardForms.register'),
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.$t('TITLES.WizardForms.register'),
        },
        {
          hid: 'description',
          name: 'description',
          content: this.$t('TITLES.WizardForms.register'),
        },
      ],
    }
  },

  components: {
    LanguageSwitcher,
    FirstStep,
    SecondStep,
  },

  data () {
    return {
      // Start:: Current Form Step Data
      currentStep: "FirstStep",
      // End:: Current Form Step Data

      // Start:: Loaders Controlling Data
      isWaitingApiResponse: false,
      // End:: Loaders Controlling Data

      // Start:: Add Company Data
      data: {
        name: null,
        email: null,
        phone: null,
        natIdImage: null,
        natIdNumber: null,
        personalImage: null,
        password: null,
        confirmPassword: null,
        country: null,
        state: null,
        otherState: null,
        city: null,
        otherCity: null,
        address: null,
      },
      // End:: Add Company Data

      // Start:: Request Complete Message
      requestIsCompleted: false,
      // End:: Request Complete Message
    }
  },

  methods: {
    // Start:: Handel Steps Navigation
    handelSecondStepNavigation(firstStepData) {
      this.data.name = firstStepData.name;
      this.data.email = firstStepData.email;
      this.data.phone = firstStepData.phone;
      this.data.natIdImage = firstStepData.natIdImage;
      this.data.natIdNumber = firstStepData.natIdNumber;
      this.data.personalImage = firstStepData.personalImage;
      this.data.password = firstStepData.password;
      this.data.confirmPassword = firstStepData.confirmPassword;
      this.currentStep = 'SecondStep';
    },
    handelLastStep(lastStep) {
      this.data.country = lastStep.country;
      this.data.state = lastStep.state;
      this.data.otherState = lastStep.otherState;
      this.data.city = lastStep.city;
      this.data.otherCity = lastStep.otherCity;
      this.data.address = lastStep.address;
      this.handelStepsSubmit();
    },
    async handelStepsSubmit() {
      this.isWaitingApiResponse = true;
      setTimeout(() => {
        this.requestIsCompleted = true;
        this.isWaitingApiResponse = false;
      }, 2000);
    },
    // End:: Handel Steps Navigation
  },
}
</script>

<style lang="scss" scoped>
.wizard_form_content_wrapper {
  position: relative;
  min-height: 100vh;
  padding-block: $section_block_padding * 1.5 $section_block_padding;
  background: radial-gradient(
    circle,
    rgba(177, 162, 204, 0.5) 0%,
    var(--theme_second_bg) 100%
  );

  .language_switcher_wrapper {
    position: absolute;
    top: 5%;
  }

  .forms_wrapper {
    padding: 1rem;
    background-color: var(--theme_main_bg);
    border-radius: 8px;

    .page_image {
      width: 100%;
      height: auto;
      border-radius: 8px;
    }

    .v-stepper {
      .v-stepper__content {
        padding: 0;
      }
    }
  }

  .completed_request_message {
    padding: 2.5rem 1.5rem;
    @include flex(center, center, column);
    row-gap: 2rem;
    background-color: var(--main_theme_clr);
    border-radius: 8px;

    .message_body {
      @include font($semi_bold_font, 1.2rem, var(--white));
    }

    button {
      @include primaryBtnStyle;
      background-image: linear-gradient(90deg, transparent 50%, var(--white) 50%);
      color: var(--main_theme_clr);
      &:hover {
        color: var(--white);
        border: 1px solid var(--white);
      }
    }
  }

  @include media(md) {
    padding-block: $section_block_padding * 0.5;
    .page_header_wrapper {
      .section_title {
        font-size: 1.4rem;
        line-height: 1.6;
        flex-wrap: wrap;
        row-gap: 1rem;
        text-align: center;
  
        span {
          padding: 0.2rem 1.2rem;
          font-size: 1.1rem;
        }
      }
    
      .section_desc {
        max-width: 95%;
      }
    }
  }
}
</style>