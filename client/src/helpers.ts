export const sentHttp = (): Object => {
	let errors = []

	const request = async (url: string, method = 'GET', body = null, headers = {}): Promise<any> => {
		try {
			if (body) {
				body = JSON.stringify(body)
				headers['Content-Type'] = 'application/json'
			}
			const response = await fetch(url, { method, body, headers })
			const data = await response.json()

			if (!response.ok) {
				errors.push(data)
				throw new Error(data.message)
			}

			return data
		} catch (e: any) {
			throw e
		}
	}

	return { request, errors }
}
