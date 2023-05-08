import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
	reducerPath: "fetchApi",
	baseQuery: fetchBaseQuery({baseUrl: "/api/"}),
	endpoints: (builder) => ({
		getProduct: builder.query({
			query: (path) => ({
				url: path,
			}),
			transformResponse: (res) => res.updatedData,
		}),
	}),
});

export const {useGetProductQuery} = productApi;
