import { createSlice } from '@reduxjs/toolkit'

export const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    loggedIn : false,
    admin:null,
    notifications:[],
    readNotifications:[],
    unReadNotifications:[]
  },
  reducers: {
    setAdminDetails :(state,action)=>{
      
      state.admin = action.payload.admin
      state.loggedIn = action.payload.loggedIn
     
   },
   setAdminNotifications:(state,action)=>{
    state.notifications  =  action.payload.notifications 
    state.readNotifications = action.payload.readNotifications
    state.unReadNotifications = action.payload.unReadNotifications

   
   }
  }
})


export const { setAdminDetails,setAdminNotifications } = adminSlice.actions

export default adminSlice.reducer