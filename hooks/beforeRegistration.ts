import { isServer } from '@vue-storefront/core/helpers'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
// import { currentStoreView } from '@vue-storefront/core/lib/multistore'

export function beforeRegistration({ Vue, config, store, isServer }) {
  const VSF_PAYPAL_CODE = 'paypal_express'

  if (!isServer) {
    // The PayPal script is loaded in the checkout in OrderReview.vue instead.
    /*
    const storeView = currentStoreView()
    const { currencyCode } = storeView.i18n
    const clientId = config.paypal.clientId
    const sdkUrl = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currencyCode}&disable-funding=card,credit`
    var script = document.createElement('script')
    script.setAttribute('src', sdkUrl)
    document.head.appendChild(script)
    */

    // Commented out from https://github.com/dearsam/vsf-payment-paypal/pull/2/files#diff-039627b9ac58e411c11ebad5bcc1cab7c656a4ea804f8927c061775588c4c70f
    /*
    let currentPaymentMethodIsPaypal = false
    store.watch((state) => state.checkout.paymentDetails, (prevMethodCode, newMethodCode) => {
      currentPaymentMethodIsPaypal = newMethodCode === VSF_PAYPAL_CODE
    })

    const invokePlaceOrder = () => {
      if (currentPaymentMethodIsPaypal) {
        EventBus.$emit('checkout-do-placeOrder', {})
      }
    }
    EventBus.$on('checkout-before-placeOrder', invokePlaceOrder)
    */
  }
}
