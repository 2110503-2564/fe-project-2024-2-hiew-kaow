'use client'

export default function SignOutButton() {
    return (
        <div 
            className="text-xl text-red-800 hover:text-red-200 bg-red-200 hover:bg-red-600 rounded px-3 py-2 w-fit border-2 border-red-400 select-none mt-[30%] hover:cursor-pointer"
            onClick={()=>{alert("Signout!")}}>
            Sign out
        </div>
    )
}