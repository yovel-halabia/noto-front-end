import {isRejectedWithValue} from "@reduxjs/toolkit";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {getCookie, setCookie} from "../../Util/cookies";

export const userApi = createApi({
	reducerPath: "userApi",
	baseQuery: fetchBaseQuery({baseUrl: "/api/"}),
	tagTypes: ["User"],
	endpoints: (builder) => ({
		getUser: builder.query({
			query: () => ({
				url: "get-user",
				headers: {authorization: `Barrer ${getCookie("accessToken")}`},
			}),
			transformResponse: (res) => res.updatedData,
			providesTags: ["User"],
		}),
		updateUser: builder.mutation({
			query: (params) => ({
				url: params.url,
				method: "POST",
				headers: {...params.headers, authorization: `Barrer ${getCookie("accessToken")}`},
				body: params.body,
			}),
			async onQueryStarted({}, {dispatch, queryFulfilled}) {
				try {
					const {data} = await queryFulfilled;
					dispatch(
						userApi.util.updateQueryData("getUser", undefined, (draft) => {
							Object.assign(draft, data.updatedData);
						}),
					);
				} catch {}
			},
		}),
		removeUser: builder.mutation({
			query: () => ({
				url: "logout",
				method: "POST",
				body: {token: `Barrer ${getCookie("accessToken")}`},
			}),
			async onQueryStarted(undefined, {dispatch, queryFulfilled}) {
				dispatch(userApi.util.resetApiState());
				setCookie("accessToken");
			},
		}),
	}),
});

export const rtkQueryError = (api) => (next) => (action) => {
	if (isRejectedWithValue(action) && action.payload?.data?.authErr) {
		api.dispatch(userApi.endpoints.removeUser.initiate());
	}
	return next(action);
};

export const {useGetUserQuery, useUpdateUserMutation, useRemoveUserMutation} = userApi;
