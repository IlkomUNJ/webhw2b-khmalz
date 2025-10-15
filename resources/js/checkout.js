document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('checkout-modal')
  const openBtn = document.getElementById('open-checkout-modal-btn')
  const closeBtn = document.getElementById('close-modal-btn')
  const paymentForm = document.getElementById('payment-form')

  if (!modal || !openBtn || !closeBtn || !paymentForm) return

  const openModal = () => {
    modal.classList.remove('hidden')
    modal.classList.add('flex')
  }

  const closeModal = () => {
    modal.classList.add('hidden')
    modal.classList.remove('flex')
  }

  openBtn.addEventListener('click', openModal)
  closeBtn.addEventListener('click', closeModal)
  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal()
  })
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.classList.contains('hidden')) closeModal()
  })

  const paymentButton = document.getElementById('payment-button')
  paymentButton.addEventListener('click', async (event) => {
    event.preventDefault()

    paymentButton.disabled = true
    paymentButton.innerText = 'Processing...'

    const formData = new FormData(paymentForm)
    const csrfToken = formData.get('_csrf')
    if (formData.has('_csrf')) formData.delete('_csrf')

    try {
      const response = await fetch(paymentForm.action, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'X-CSRF-TOKEN': csrfToken,
        },
      })

      if (!response.ok) throw new Error('Payment failed')

      const data = await response.json()

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl
      }
    } catch (error) {
      console.error('Payment processing error:', error)
      alert('An error occurred during payment. Please try again.')
    } finally {
      paymentButton.disabled = false
      paymentButton.innerText = 'Pay Now'
    }
  })
})
