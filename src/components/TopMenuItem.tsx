import Link from 'next/link'

export default function ({title, pageRef} : {title:string, pageRef:string}) {
    return(
        <Link className='w-[120px] text-center my-auto font-verdana text-[10pt] text-black hover:scale-110 transition-all' href={pageRef}>
            {title}
        </Link>
    );
}