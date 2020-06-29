<template>
  <div>
    <div class="align-center mb10" style="color: red;">{{ $t(errorMessage) }}</div>
    <div id="paypal-button" class="paypal-button" />
  </div>
</template>

<script>
import { PaypalButton } from '@develodesign/vsf-payment-paypal/components/PaypalButton'

export default {
  mixins: [PaypalButton]
}
</script>

<style lang="scss">
  #paypal-button {
    .paypal-buttons {
      iframe {
        &.component-frame {
          z-index: 1;
        }
      }
    }
  }
</style>
