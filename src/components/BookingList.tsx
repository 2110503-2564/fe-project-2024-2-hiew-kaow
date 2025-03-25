"use client"
import { useAppSelector,AppDispatch } from "@/app/redux/store"
import { removeBooking } from "@/app/redux/features/bookSlice"
import { useDispatch } from "react-redux"
export default function BookingList() {
    const bookingItems = useAppSelector((state) => state.bookSlice.bookItems)
    const dispatch = useDispatch<AppDispatch>()
    if(bookingItems.length === 0) return <div className="text-xl flex justify-center w-full h-screen bg-white p-5">No Venue Booking</div>
    return (
        <main className="w-full h-screen bg-white p-5">
        {
            bookingItems? bookingItems.map((item) => (
                <div className="bg-slate-200 rounded px-5 mx-5 py-2 my-2" key={item.bookDate}>
                    <div className="text-sm">{item.nameLastname}</div>
                    <div className="text-sm">{item.tel}</div>
                    <div className="text-sm">{item.dentist}</div>
                    <div className="text-sm">{item.bookDate}</div>
                    <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-1 text-white shadow-sm" onClick={() => {dispatch(removeBooking(item))}}>Remove Reservation</button>
                </div>
            ))
            : ''
        }
        </main>
    )
}