import React, { useEffect } from "react";
import "./Modal.css";
import success from "../assets/success.gif";
import warn from "../assets/warn.gif";

const Modal = ({ showModel, onCloseModel, modalMessage, student, image }) => {
	const message = modalMessage.split(",");
	//Disablling right click from page
	useEffect(() => {
		const handleContextmenu = (e) => {
			e.preventDefault();
		};
		document.addEventListener("contextmenu", handleContextmenu);
		return () => {
			document.removeEventListener("contextmenu", handleContextmenu);
		};
	}, []);

	if (!showModel) {
		return null;
	}

	setTimeout(() => {
		onCloseModel();
	}, 3800);

	return (
		<div>
			<div className='model-wrapper'>
				<div className='model'>
					<div className='model-messages'>
						<p>{student.ID}</p>
						<h3>{message[0]}</h3>
						<p>{message[1]}</p>
					</div>
					<div className='model-images'>
						{image ? (
							<img
								className='img-success'
								src={success}
								alt='✔'
							/>
						) : (
							<img className='img-warn' src={warn} alt='❌' />
						)}
					</div>
					<button className='close-btn' onClick={onCloseModel}>
						X
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
