import Link from 'next/link'

export default function TopMenuItem({title, pageRef} : {title:string, pageRef:string}) {
    return(
        <Link className='w-[120px] text-center my-auto font-verdana text-black hover:scale-110 transition-all text-cyan-600 text-sm' href={pageRef}>
            {title}
        </Link>
    );
}