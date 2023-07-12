import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {userApi} from "./userApi";
import {setCookie} from "../../Util/cookies";

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({baseUrl: "/api/auth/"}),
	endpoints: (builder) => ({
		auth: builder.mutation({
			query: (params) => ({
				url: params.url,
				method: "POST",
				body: params.data,
			}),
			async onQueryStarted({}, {dispatch, queryFulfilled}) {
				const {
					data: {data},
				} = await queryFulfilled;
				if (data) {
					setCookie("accessToken", data);
					dispatch(userApi.endpoints.getUser.initiate()).refetch();
				}
			},
		}),
	}),
});

export const {useAuthMutation} = authApi;
