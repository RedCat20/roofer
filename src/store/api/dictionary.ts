import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const dictionariesApi = createApi({
	reducerPath: 'dictionariesApi',
	// baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000' }),
	baseQuery: fetchBaseQuery({ baseUrl: process.env.BASE_URL }),
	endpoints: builder => ({
		getDictionaries: builder.query<any, string>({
			// query: name => `/dictionaries`,
			query: name => `/data.json`,
		}),
	}),
})

export const { useGetDictionariesQuery } = dictionariesApi
