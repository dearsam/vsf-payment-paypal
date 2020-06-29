<template>
  <div>
    <div class="align-center mb10" style="color: red;">{{ $t(errorMessage) }}</div>
    <div class="paypal-button" />
  </div>
</template>

<script>
import { PaypalButton } from '@develodesign/vsf-payment-paypal/components/PaypalButton'

export default {
  mixins: [PaypalButton]
}
</script>
