import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { userApi } from './userApis'
import { clearCurrentUser } from '../redux/userSlice'

const API_BASE_URL = 'https://blog-app-ev8z.onrender.com'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('a_t')

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
    },
  }),

  endpoints: (builder) => ({
    // endpoint 1
    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/users',
        method: 'POST',
        body: userData,
      }),
    }),

    // endpoint 2
    loginUser: builder.mutation({
      query: (loginData) => ({
        url: '/auth/login',
        method: 'POST',
        body: loginData,
        credentials: 'include',
      }),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          if (data) {
            dispatch(userApi.endpoints.getCurrentUser.initiate())
          }
        } catch (error) {
          console.log(error)
        }
      },
    }),

    // Logout user = endpoint 3
    logoutUser: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        credentials: 'include',
      }),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          if (data) {
            dispatch(clearCurrentUser())
          }
        } catch (error) {
          console.log(error)
        }
      },
    }),

    // endpoint 4: getNewAccessToken
    getNewAccessToken: builder.mutation({
      query: () => ({
        url: '/auth/access-token',
        method: 'GET',
        credentials: 'include',
      }),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled

          if (data) {
            dispatch(userApi.endpoints.getCurrentUser.initiate())
          }
        } catch (error) {
          console.log(error)
        }
      },
    }),
  }),
})

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
} = authApi
