import { ga } from '@beyonk/svelte-google-analytics'

export const fireGTagEvent = (event_name, data) => {
	if (!data) data = {}
	data.items = data.items || []
	const items = data.items.map((item) => {
		item.discount = item.discount || item.coupon || {}
		return {
			item_id: item._id,
			item_name: item.name,
			affiliation: item.vendorBusinessName,
			item_brand: item.brandName,
			item_category: item.categoryName,
			price: item.price,
			quantity: item.qty,
			coupon: item.discount?.code,
			currency: 'INR',
			discount: item.discount?.amount,
			savings: item.savings,
			index: 0
		}
	})
	switch (event_name) {
		case 'add_to_cart':
			// @ts-ignore
			ga.addEvent('add_to_cart', {
				currency: 'INR',
				value: data.total,
				items
			})
			break

		case 'view_cart':
			// @ts-ignore
			ga.addEvent('view_cart', {
				currency: 'INR',
				value: data.total,
				items
			})
			break

		case 'remove_from_cart':
			// @ts-ignore
			ga.addEvent('remove_from_cart', {
				currency: 'INR',
				value: data.total,
				items
			})
			break

		case 'begin_checkout':
			// @ts-ignore
			ga.addEvent('begin_checkout', {
				currency: 'INR',
				value: data.total,
				items
			})
			break

		case 'purchase':
			// @ts-ignore
			ga.addEvent('purchase', {
				transaction_id: data.orderNo,
				affiliation: items[0]?.vendorBusinessName,
				value: data.total,
				tax: data.tax,
				shipping: data.shipping?.charge,
				currency: 'INR',
				coupon: data.coupon.code,
				items
			})
	}
}
