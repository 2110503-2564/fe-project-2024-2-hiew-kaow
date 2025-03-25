import { createSlice } from "@reduxjs/toolkit";
import { BookingItem } from "../../../../interface";
import { PayloadAction } from "@reduxjs/toolkit";

type BookState = {
    bookItems : BookingItem[]
}

const initialState : BookState = { bookItems: [] }

export const bookSlice = createSlice({
    name : "book",
    initialState,
    reducers:{
        addBooking: (state, action:PayloadAction<BookingItem>) => {
            state.bookItems = state.bookItems.filter(
                (obj) => obj.bookDate !== action.payload.bookDate
            );
            state.bookItems.push(action.payload);
        },
        removeBooking: (state, action:PayloadAction<BookingItem>) => {
            const remainBookings = state.bookItems.filter(obj => {
                return ((obj.bookDate !== action.payload.bookDate)
                        || (obj.nameLastname !== action.payload.nameLastname)
                        || (obj.dentist!== action.payload.dentist)
                        || (obj.tel !== action.payload.tel));   
            })
            state.bookItems = remainBookings
        }
    }
})

export const { addBooking, removeBooking } = bookSlice.actions
export default bookSlice.reducer
