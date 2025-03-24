'use client'
import { StaticDatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs";

export default function DateBooking({ onApptDateChange }:{ onApptDateChange:Function }) {
    
    const maxDate = dayjs().add(3, "month");
    
    return (
        <div className="rounded">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
            slots={{
                actionBar: () => null, // Removes the OK and Cancel buttons
            }}
            orientation="landscape"
            disablePast
            onChange={ (newValue) => {onApptDateChange(newValue?.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"))} }
            maxDate={maxDate}
            />

            </LocalizationProvider>
        </div>
    )
}