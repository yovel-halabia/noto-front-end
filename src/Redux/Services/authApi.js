import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {userApi} from "./userApi";
import {getCookie, setCookie} from "../../Util/cookies";

export const authApi = createApi({
	reducerPath: "authApi",
	baseQuery: fetchBaseQuery({baseUrl: "/api/"}),
	endpoints: (builder) => ({
		checkToken: builder.query({
			query: () => ({
				url: "check-token",
				method: "GET",
				headers: {authorization: `Bearer ${getCookie("accessToken")}`},
			}),
		}),
		authUser: builder.mutation({
			query: (params) => ({
				url: params.url,
				method: "POST",
				body: params.body,
			}),
			async onQueryStarted(undefined, {dispatch, queryFulfilled}) {
				const {data} = await queryFulfilled;
				setCookie("accessToken", data.updatedData.accessToken);
				const getUser = dispatch(userApi.endpoints.getUser.initiate());
				getUser.refetch();
			},
		}),
	}),
});

export const {useAuthUserMutation, useCheckTokenQuery} = authApi;
