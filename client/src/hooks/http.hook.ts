import { useState, useCallback } from 'react'

export const useHttp = (): Object => {
	const [loading, setLoading] = useState<boolean>(false)
	const [errors, setErrors] = useState<any>(null)

	const request = useCallback(async (url: string, method = 'GET', body = null, headers = {}): Promise<any> => {
		setLoading(true)
		try {
			if (body) {
				body = JSON.stringify(body)
				headers['Content-Type'] = 'application/json'
			}
			const response = await fetch(url, { method, body, headers })
			const data = await response.json()

			if (!response.ok) {
				// eslint-disable-next-line no-console
				setErrors(data.errors)
				throw new Error(data.message || 'Что-то пошло не так')
			}

			setLoading(false)

			return data
		} catch (e: any) {
			setLoading(false)
			throw e
		}
	}, [])

	const clearError = useCallback((): any => setErrors(null), [])

	return { loading, request, errors, clearError }
}
