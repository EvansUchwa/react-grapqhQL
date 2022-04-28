import { useDispatch, useSelector } from "react-redux";
import { modalSelector } from "../Store/selectors/modalSelector";
import { setModalOnStore } from "../Store/actions/modalActions"

export const Modal = ({ props }) => {
    const dispatch = useDispatch()
    // const { setModal } = props;
    const modal = useSelector(modalSelector).open;
    const content = useSelector(modalSelector).content;
    const className = props && props.className ? props.className : ""
    if (!modal) {
        return null;
    }
    return <div className="modal">
        <section className="modal-body">
            <div className="mb-head-closer">
                <i className="mdi mdi-close" onClick={() => dispatch(setModalOnStore(false))}></i>
            </div>
            {content}
            {/* <div className="mb-foot-closer">
                <button>Fermer</button>
            </div> */}
        </section>
    </div>
}

export const ConfirmationMessage = ({ props }) => {
    const dispatch = useDispatch()
    const { text, functionAfterConfirm, param } = props
    return <div className="confirmationModal">
        <p>
            {text}
        </p>

        <section>
            <span onClick={() => functionAfterConfirm(param)}>Confirmer</span>
            <span onClick={() => dispatch(setModalOnStore(false))}>Annuler</span>
        </section>
    </div>
}