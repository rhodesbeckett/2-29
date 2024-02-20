import { error, redirect } from '@sveltejs/kit'
import { services } from '@misiki/litekart-utils'

export const prerender = false

export async function load({ params, locals, cookies }) {
	try {
		const { id } = params
		const sid = cookies.get('connect.sid')
		const { storeId } = locals

		const order = await services.OrdersService.fetchOrder({
			id,
			storeId,
			server: true,
			sid
		})

		const orderTracking = await services.OrdersService.fetchTrackOrder({ id, storeId, sid })

		if (order) {
			return { order, orderTracking }
		}
	} catch (e) {
		redirect(307, '/auth/login')
	}

	error(404, 'Order not found')
}
