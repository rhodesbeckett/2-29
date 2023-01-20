import { fetchAddress, fetchAddresses } from '$lib/services/AddressService'
import { refreshCartData } from '$lib/services/CartService'
import { error, redirect } from '@sveltejs/kit'
export const prerender = false

export async function load({ request, url, locals }) {
	try {
		let err
		const { myAddresses, selectedAddress } = await fetchAddresses({
			storeId: locals.store?.id,
			server: true
		})
		const currentPage = +url.searchParams.get('page') || 1
		const q = url.searchParams.get('q') || ''
		const cart = await refreshCartData({ storeId: locals.store?.id, server: true })
		if (myAddresses?.data?.length) {
			return {
				cart,
				myAddresses,
				selectedAddress,
				url: url.href,
				currentPage,
				q,
				err
			}
		} else {
			return {
				cart,
				myAddresses: [],
				selectedAddress,
				url: url.href,
				currentPage,
				q,
				err
			}
		}
	} catch (e) {
		if (e.status === 401) {
			throw redirect(307, `${locals.store?.loginUrl}?ref=${url?.pathname}`)
		} else {
			throw error(500, e?.message)
		}
	}
}
