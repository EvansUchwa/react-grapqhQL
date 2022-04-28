export const FormBtn = ({ props }) => {
    const { type, content } = props
    const btns = {
        simple: <button className=''>{content}</button>,
        load: <button className=''>{content}
            <i className='mdi mdi-spin mdi-loading'></i></button>,
        disable: <button className=' disabled' disabled >{content}</button>,
        disableAndLoad: <button className=' disabled' disabled >{content}
            <i className='mdi mdi-spin mdi-loading'></i>
        </button>

    }

    return <div className="formBtn">
        {
            btns[type]
        }
    </div>
}