// handled by rtk query instead of axios
// data from slices will be storedd in the states

import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const appApi = createApi({
    reducerPath: "appApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000', mode: 'cors',
    
    prepareHeaders: (headers, {getState}) => {
        const token = getState().user.token

        if(token){
            headers.set('Authorization',  `Bearer ${token}` )
        }
        return headers
     } ,
    
}),
    tagTypes: ["Blog", "User"], // help to refetch everytime
    endpoints: (builder)=> ({
       
        // define all the endpoints
        //post patch are called mutations since they are changing data
        loginUser: builder.mutation({
            query: user=>({
                url: '/users/login/',
                method: 'POST',
                body: user,
            })
        }),
        signupUser: builder.mutation({                                                                                              
            query: user => ({
                url: '/users/',
                method: 'POST',
                body: user,
            })
        }),

        logoutUser: builder.mutation({
            query: () => ({
                url: '/users/logout/',
                method: 'DELETE',
               

            })
               
        }),

        // blog routes
        //createBlog
        createBlog: builder.mutation({
            query: (article)=>({
                url: '/blogs',
                method: 'POST',
                body: article
            }),
            invalidatesTags: ['Blog'] ,// means it has to fetch again
        }),

        //get all BLogs
        getAllBlogs: builder.query({
            query: ()=> ({
                url: '/blogs',
                method: 'GET'
            }),
            providesTags: ['Blog'] //means fetch agian
        }),

        //get article by id
        getOneBlog: builder.query({
            query: (id)=> ({
                url: `/blogs/${id}`,
                method: 'GET'
            }),
            providesTags: ['Blog']
        }),

        //get user articles
        getUserBlogs: builder.query({
            query: ()=> ({
                url: '/blogs/me',
                method: 'GET'
            }),
            providesTags: ['Blog']
        }),

        // delete article
        deleteUserBlogs: builder.mutation({
            query: (id)=> ({
                url: `/blogs/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Blog']
        }),


        // update blog/article
        updateUserBlog: builder.mutation({
            query: ({id, ...blog})=>({
                url: `/blogs/${id}`,
                method: 'PATCH',
                body: blog,
            }),
            invalidatesTags: ['Blog']
        })
    
    })

})



// we create hooks that give us access to this mutations/functiosn
export const {useLoginUserMutation, useSignupUserMutation, useLogoutUserMutation, useCreateBlogMutation, useGetAllBlogsQuery, useGetOneBlogQuery, useGetUserBlogsQuery, useDeleteUserBlogsMutation, useUpdateUserBlogMutation} = appApi

