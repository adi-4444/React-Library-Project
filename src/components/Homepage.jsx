import React from "react";
import { useState, useEffect } from "react";
import "./Homepage.css";
import Modal from "./Modal";

const Homepage = ({ students, tt }) => {
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
	//--------------------------------------------------------------------------
	// Setting a Clock
	const time = new Date().toLocaleTimeString();
	const date =
		new Date().getDate() +
		"-" +
		parseInt(new Date().getMonth() + 1) +
		"-" +
		new Date().getFullYear();
	const [currentTime, setCurrentTime] = useState(time);
	const [todayDate, setTodayDate] = useState(date);
	const days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const day = days[new Date().getDay()];
	const [currentDay, setCurentDay] = useState(day);
	function refresh() {
		const time = new Date().toLocaleTimeString();
		setCurrentTime(time);
		const date =
			new Date().getDate() +
			"-" +
			parseInt(new Date().getMonth() + 1) +
			"-" +
			new Date().getFullYear();
		setTodayDate(date);
		const day = days[new Date().getDay()];
		setCurentDay(day);
	}
	setInterval(refresh, 1000);
	//---------------------------------------------------------------------------
	// Taking input to state
	const [input, setInput] = useState();
	const submitHandler = (e) => {
		e.preventDefault();
		checkStudent(input, students);
		// setInput("");
		setShowModel(true);
	};
	//------------------------------------------------------------------------
	//  this function will find student data
	const checkStudent = (input, students) => {
		let inputStudent = input.toString().toUpperCase(); // input data

		let student = students.find((user) => user.ID === inputStudent); // check user in DB
		if (student === undefined) {
			console.log("Not Found");
			setModelMessage(`${inputStudent},  Not Found`);
			setImage(false);
		} else {
			checkTimeTable(student, tt);
			setStudent(student);
		}
	};

	// check branch and section of student
	const checkTimeTable = (stud, tt) => {
		let filteredBranch = tt.timetables.find(
			// check student branch and branch will be filterd
			(ttb) => ttb.branch === stud.branch
		);
		let filteredSection = filteredBranch.sections.find(
			(ttbs) => ttbs.s === stud.s // after that student section will be filtered from filterd branch
		);
		checkDay(filteredSection);
	};
	// check present day for section
	const checkDay = (section) => {
		const days = [
			"sunday",
			"monday",
			"tuesday",
			"wednesday",
			"thursday",
			"friday",
			"saturday",
		];
		let day = days[new Date().getDay()];
		let cTime = parseFloat(
			new Date().getHours() + "." + new Date().getMinutes()
		);
		let filteredDay = section.days.find((sd) => sd.day === day);
		if (day === "sunday") {
			ifSunday(cTime);
		} else {
			checkPeriodTime(filteredDay);
		}
	};
	// messages if sunday
	const ifSunday = (cTime) => {
		let s = 9.3;
		let e = 18;
		switch (true) {
			case cTime >= s && cTime <= e:
				console.log("You are Allowed");
				setModelMessage("You Are Allowed");
				setImage(true);
				break;
			case cTime < s:
				console.log("Not Allowed, You are early");
				setModelMessage("Not Allowed, You are early");
				setImage(false);
				break;
			case cTime > e:
				console.log("Not Allowed, Library is Closed");
				setModelMessage("Not Allowed, Library is Closed");
				setImage(false);
				break;
			default:
				break;
		}
	};

	// check current time with the period time for day
	const checkPeriodTime = (day) => {
		// let cTime = parseFloat(
		// 	new Date().getHours() + "." + new Date().getMinutes()
		// );
		let cTime = 10.4;
		let periods = day.periods;
		if (cTime < 9.3) {
			setModelMessage("Not Allowed, You are Early");
			console.log("Not Allowed, You are Early");
			setImage(false);
		} else if (cTime > 17) {
			setModelMessage("Not Allowed, Library is Closed");
			console.log("Not Allowed, Library is Closed");
			setImage(false);
		} else if (cTime >= 16.32 && cTime < 16.7) {
			setModelMessage("You are Allowed");
			console.log("You are Allowed");
			setImage(true);
		}

		// this loop will check the current time to period timings and return period
		for (let key in periods) {
			let value = periods[key];
			let start = parseFloat(key.split("-")[0]) + 0.01; // 0.01 added to overlap 2 classe at a time
			let end = parseFloat(key.split("-")[1]);

			if (cTime >= start && cTime <= end) {
				switch (true) {
					case value === "L":
						console.log(`You are Allowed its a LEISURE Period`);
						setModelMessage(
							`You are Allowed, its a LEISURE Period`
						);
						setImage(true);
						break;
					case value === "LIBRARY":
						console.log(`You are Allowed its ${value} Period`);
						setModelMessage(`You are Allowed, its ${value} Period`);
						setImage(true);
						break;
					case value === "LUNCH BREAK":
						console.log(`You are Not Allowed its ${value}`);
						setModelMessage(`You are Not Allowed, its ${value}`);
						setImage(false);
						break;
					case value !== "L" || value !== "LIBRARY":
						console.log(
							`You are Not Allowed, You have ${value} now`
						);
						setImage(false);
						setModelMessage(
							`You are Not Allowed, You have ${value} now`
						);
						setImage(false);
						break;
					default:
						break;
				}
			}
		}
	};
	// Modal Commands
	const [showModel, setShowModel] = useState(false);
	const [modalMessage, setModelMessage] = useState("");
	const [student, setStudent] = useState("");
	const [image, setImage] = useState(null);

	return (
		<div>
			<div className='main-wrapper'>
				<div className='clock-div'>
					<div className='date-div'>
						<span className='day'>{currentDay},</span>
						<span className='date'>{todayDate}</span>
					</div>
					<div className='time-div'>
						<p className='time neonText'>
							{currentTime.toUpperCase()}
						</p>
					</div>
				</div>
				<div className='input-div'>
					<div className='form-conrtol inpur-wrapper'>
						<form onSubmit={submitHandler}>
							<input
								type='text'
								id='name'
								className='form-control'
								placeholder='Enter your ID'
								name='ID'
								value={input}
								style={{ textTransform: "uppercase" }}
								onChange={(e) => setInput(e.target.value)}
								required
								autoComplete='off'
								autoFocus
							/>
							<label className='form-label'>Enter your ID</label>
							<button className='btn' type='submit'>
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
			<div>
				<Modal
					showModel={showModel}
					onCloseModel={() => setShowModel(false)}
					modalMessage={modalMessage}
					student={student}
					image={image}
				/>
			</div>
		</div>
	);
};
export default Homepage;
