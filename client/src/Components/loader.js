// import { SimpleImage } from "./Img"
export const FixedLoader = () => {
    return <div className="fixedLoader">
        <i className="mdi mdi-spin mdi-loading"></i>
    </div>
}


export const SimpleIconLoader = () => {
    return <>
        <i className="mdi mdi-spin mdi-loading" style={{ fontSize: "30px" }}></i>
    </>
}

export const SimpleSectionLoader = () => {
    return <div className="sectionLoader">
        <i className="mdi mdi-spin mdi-loading"></i>
    </div>
}

export const ObjectChildLoader = ({ children, dataIsLoad }) => {
    return dataIsLoad ? children : <SimpleSectionLoader />;
}

export const ArrayChildLoader = ({ children, dataIsLoad }) => {
    return dataIsLoad.length ? children : <SimpleSectionLoader />;
}

export const BooleanChildLoader = ({ children, dataIsLoad }) => {
    return dataIsLoad === false ? <SimpleSectionLoader /> : children

    // function ret(children, dataIsLoad){
    //     setTimeout(()=>{
    //         if(dataIsLoad){

    //         }
    //     },2000)
    // }   
}


export const SimpleSkeletonLoader = ({ children, props }) => {
    const { width, height } = props;
    return <main style={{ width, height }} className="simpleSkeleton">
        {children}
    </main>
}