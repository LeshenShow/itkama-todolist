import { authSlice, authReducer } from "@/features/auth/model/auth-slice"
import { todolistsApi } from "@/features/todolists/api/todolistsApi"
import { tasksSlice, tasksReducer } from "@/features/todolists/model/tasks-slice"
import { todolistsSlice, todolistsReducer } from "@/features/todolists/model/todolists-slice"
import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { appSlice, appReducer } from "./app-slice"

export const store = configureStore({
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [todolistsSlice.name]: todolistsReducer,
    [appSlice.name]: appReducer,
    [authSlice.name]: authReducer,
    [todolistsApi.reducerPath]: todolistsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todolistsApi.middleware),
})

setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store
