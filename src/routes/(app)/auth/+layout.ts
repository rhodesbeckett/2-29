export const ssr = false
import { getAPI } from '$lib/util/api'
import { DOMAIN, HTTP_ENDPOINT } from '$lib/config'
import cookie from 'cookie'

import {
	stripePublishableKey,
	id,
	email,
	address,
	phone,
	websiteName,
	websiteLegalName
} from '$lib/config'
import { gett } from '$lib/utils'
export const prerender = false

export async function load({ url, request, cookies }) {
	const isHome = url.pathname === '/'
	let currentPage = +url.searchParams.get('page') || 1
	let q = url.searchParams.get('q') || ''
	let cart, store, serializedCart, serializedStore
	try {
		const res = await gett('carts/my', request.headers)

		if (res) {
			const cookieCart = {
				items: res?.items,
				qty: res?.qty,
				tax: res?.tax,
				subtotal: res?.subtotal,
				total: res?.total,
				currencySymbol: res?.currencySymbol,
				discount: res?.discount,
				selfTakeout: res?.selfTakeout,
				shipping: res?.shipping,
				unavailableItems: res?.unavailableItems,
				formattedAmount: res?.formattedAmount
			}
			cart = cookieCart
			serializedCart = cookie.serialize('cart', JSON.stringify(cookieCart) || '', {
				path: '/'
			})
		}
	} catch (e) {
	} finally {
	}
	try {
		const cookieStore = {
			id,
			domain: DOMAIN,
			logo: `/logo.svg?tr=w-auto,h-56:w-auto,h-56`,
			address,
			phone,
			email,
			websiteName,
			websiteLegalName,
			stripePublishableKey
		}

		store = cookieStore
		serializedStore = cookie.serialize('store', JSON.stringify(cookieStore) || '', {
			path: '/'
		})
	} catch (e) {
	} finally {
	}
	if (cookies) {
		cookies.set(serializedCart)
		cookies.set(serializedStore)
	}
	return {
		url: url.href,
		currentPage,
		q,
		// me,
		// token,
		// sid,
		cart,
		store
		// isHome
	}
}
