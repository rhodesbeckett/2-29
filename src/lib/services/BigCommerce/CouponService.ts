import {  getBigcommerceApi } from '$lib/utils/server'
import { error } from '@sveltejs/kit'

export const fetchCoupons = async ({ origin, storeId, server = false, sid = null }: any) => {
	try {
		let res: any = {}
	
				res = await getBigcommerceApi(`customers/me`, {}, sid)
				
		return res?.data || []
	} catch (e) {
		throw error(e.status, e.data?.message || e.message)
	}
}