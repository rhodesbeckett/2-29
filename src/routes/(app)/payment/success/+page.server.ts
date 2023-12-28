import { OrdersService } from '$lib/services'
import { getCartFromStore } from '$lib/store/cart'
import { error, redirect } from '@sveltejs/kit'

export const prerender = false

export async function load({ url, locals, cookies }) {
	const cartId = cookies.get('cartId')
	const orderId = url.searchParams.get('orderId') || url.searchParams.get('order_no')
	const paymentMode = url.searchParams.get('provider')
	const paymentReferenceId = url.searchParams.get('payment_reference_id')
	const sid = cookies.get('connect.sid')
	const status = url.searchParams.get('status')
	const storeId = locals.storeId

	let cart
	let err
	let loading
	let order

	try {
		loading = true

		order = await OrdersService.paySuccessPageHit({
			orderId,
			paymentMode,
			paymentReferenceId,
			status,
			sid,
			storeId,
			origin: locals.origin
		})
	} catch (e) {
		// console.log('error at payment success page', e);

		err = e

		if (e.status === 401) {
			redirect(307, '/auth/login');
		} else {
			error(e?.status, e?.body?.message || e?.data?.message || e?.message);
		}
	} finally {
		loading = false
	}

	try {
		cart = await getCartFromStore({
			origin: locals.origin,
			storeId,
			cartId,
			forceUpdate: true
		})

		// console.log('cart at payment success', cart)

		cookies.set('cartId', cart?.cart_id || cart?.cartId, { path: '/', maxAge: 31536000 })
		cookies.set('cartQty', cart?.qty, { path: '/', maxAge: 31536000 })

		locals.cartId = cart?.cart_id || cart?.cartId
		locals.cartQty = cart?.qty
	} catch (e) {
		// console.log('error at payment success page cart', e);
	}

	return { loading, status, paymentMode, order, err, cart }
}
