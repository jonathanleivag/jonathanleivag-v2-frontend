import {type FC, useRef} from "react";
import type {CvSButtonharedComponentProps} from "../../type";
import CvSharedComponent from "./cv.shared.component.tsx";
import {useReactToPrint} from "react-to-print";


const CvButtonSharedComponent: FC<CvSButtonharedComponentProps> = ({text}) => {
    const cvRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef: cvRef,
        documentTitle: 'Jonathan_Leiva_CV',
    })

    return (<>
        <button
            onClick={handlePrint}
            className='mt-12 cursor-pointer group relative px-8 py-3 text-lg overflow-hidden border border-primary/30 rounded-md'>
            <span className='relative z-10 text-primary group-hover:text-background transition-colors duration-300'>
              {text}
            </span>
            <div
                className='absolute inset-0 bg-gradient-to-r from-primary to-secondary -translate-x-full group-hover:translate-x-0 transition-transform duration-300'/>
        </button>
        <div className={'hidden'}>
            <CvSharedComponent cvRef={cvRef}/>
        </div>
    </>)
}

export default CvButtonSharedComponent
