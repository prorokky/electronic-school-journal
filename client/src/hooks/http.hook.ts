import { useState, useCallback } from 'react'

export const useHttp = (): Object => {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<any>(null)

	const request = useCallback(async (url: string, method = 'GET', body = null, headers = {}): Promise<any> => {
		setLoading(true)
		try {
			const response = await fetch(url, { method, body, headers })
			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.message || 'Что-то пошло не так')
			}

			setLoading(false)

			return data
		} catch (e: any) {
			setLoading(false)
			setError(e.message)
			throw e
		}
	}, [])

	const cleanError = (): any => setError(null)

	return { loading, request, error, cleanError }
}
