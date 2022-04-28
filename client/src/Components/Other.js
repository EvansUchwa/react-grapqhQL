import { type } from "@testing-library/user-event/dist/type"
import { Link } from "react-router-dom"
import { UrlImage } from "./img"

const BreadCumbs = () => {
	return <div>
	</div>
}

export const MyLinkOrBtnDropDown = ({ props }) => {
	const { customClass, letter, text, img, linksOrBtns } = props

	function toggleDrop(event) {
		event.currentTarget.nextElementSibling.classList.toggle('myDropdown-items-visible')
	}
	return <div className={"myDropdown " + (customClass && customClass)}>
		<div onClick={(event) => toggleDrop(event)} className="myDropdown-title">
			{
				letter || text ?
					<span className={letter ? "mdt-letter" : "mdt-text"}>
						{letter || text}
						<i className="mdi mdi-chevron-right"></i>
					</span>
					: <UrlImage props={{
						src: require("../Assets/images/profils/default.png"),
						alt: "Une image de drop down"
					}} />
			}
		</div>
		<section className="myDropdown-items">
			{
				linksOrBtns.map((lkOrBtn, index) => <div
					key={"link or btn drop d lk nb" + index}>
					{lkOrBtn}
				</div>)
			}
		</section>
	</div>
}



