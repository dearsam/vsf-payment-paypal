import { isServer } from '@vue-storefront/core/helpers'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
// import { currentStoreView } from '@vue-storefront/core/lib/multistore'

export function beforeRegistration({ Vue, config, store, isServer }) {
  const VSF_PAYPAL_CODE = 'vsfpaypal'
  if (!config.paypal.hasOwnProperty('addMethod') || config.paypal.addMethod === true) {
    store.dispatch('payment/addMethod', {
      'title': 'Paypal',
      'code': VSF_PAYPAL_CODE,
      'cost': 0,
      'costInclTax': 0,
      'default': false,
      'offline': true
    })
  }

  if (!isServer) {
    // The PayPal script is loaded in the checkout in OrderReview.vue instead.
    /*
    const storeView = currentStoreView()
    const { currencyCode } = storeView.i18n
    const clientId = config.paypal.clientId
    const sdkUrl = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currencyCode}`
    var script = document.createElement('script')
    script.setAttribute('src', sdkUrl)
    document.head.appendChild(script)
    */

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
  }
}
