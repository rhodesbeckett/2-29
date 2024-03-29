import { GOOGLE_ANALYTICS_ID } from './config'

if (typeof window !== 'undefined' && window) {
	const googleAnalyticsId = GOOGLE_ANALYTICS_ID
	// @ts-ignore
	window.dataLayer = window.dataLayer || []
	// @ts-ignore
	function gtag() {
		window.dataLayer.push(arguments)
	}
	gtag('js', new Date())
	gtag('config', googleAnalyticsId, {
		page_title: document.title,
		page_path: $page.url.pathname
	})
}
