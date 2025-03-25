'use client'
import React, { useState } from "react";
import { IconButton, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from '@mui/icons-material/Cancel';
import updateUser from "@/libs/updateUser";

export default function ContactNumber({telProp, token, userId}:{telProp:string, token:string, userId:string}) {
  
    const [isEditing, setIsEditing] = useState(false);
    const [tel, setTel] = useState(telProp);
    const [telEdit, setTelEdit] = useState(telProp)

    const handleEditClick = async () => {
        console.log(token + " " + userId)
        if (isEditing) {
            // Validation logic when clicking Save
            const isValid = /^\d{3}-\d{3}-\d{4}$/.test(telEdit) && telEdit.length == 12;
    
            if (isValid) {
                // Exit edit mode if valid
                setTel(telEdit);
                await updateUser(token, userId, tel);
                setIsEditing(false);
            } else {
                alert("Invalid contact number.");
            }
        } else {
            setIsEditing(true);
        }
    
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;

        value = value.replace(/\D/g, "");
        value = value.slice(0, 10);
        if (value.length > 6) {
            value = value.replace(/(\d{3})(\d{3})(\d+)/, "$1-$2-$3")
        } else if (value.length > 3) {
            value = value.replace(/(\d{3})(\d+)/, "$1-$2");
        }

        setTelEdit(value)
    };

    const handleCancelClick = () => {
        setTelEdit(tel)
        setIsEditing(false)
    }

    return (
        <div className="flex flex-row">
            {isEditing ? (
                <TextField
                    value={telEdit}
                    onChange={handleChange}
                    size="small"
                    variant="outlined"
                    sx={{
                        fontSize: "1.25rem", // text-xl
                        color: "#4a5568", // text-gray-800
                        fontWeight: "bold", // font-bold
                        backgroundColor: "#e2e8f0", // bg-gray-200
                        borderRadius: "0.5rem", // rounded-lg
                        paddingX: "0.75rem", // px-3
                        paddingY: "0.5rem", // py-2
                        width: "40%", // w-2/5
                    }}                
                />
            ) : (
                <span className="text-xl text-gray-800 font-bold bg-gray-200 rounded-lg px-3 py-2 w-2/5">{tel}</span>
            )}
            <IconButton onClick={handleEditClick} aria-label="edit">
                {isEditing ? <SaveIcon /> : <EditIcon />}
            </IconButton>
            <IconButton onClick={handleCancelClick} aria-label="edit">
                {isEditing ? <CancelIcon /> : null}
            </IconButton>
        </div>
    )
}