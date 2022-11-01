import React from "react";
import { useState } from "react";
import "./Homepage.css";

const Homepage = ({ students, tt }) => {
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

	// Taking input to state
	const [input, setInput] = useState();
	const submitHandler = (e) => {
		e.preventDefault();
		checkStudent(input, students);
	};

	//  this function will find student data
	const checkStudent = (input, students) => {
		let inputStudent = input.toString().toUpperCase(); // input data

		let student = students.find((user) => user.ID === inputStudent); // check user in DB
		if (student === undefined) {
			console.log("Not Found");
		} else {
			checkTimeTable(student, tt);
		}
	};
	// check branch and section of student
	const checkTimeTable = (stud, tt) => {
		let filteredBranch = tt.timetables.find(
			(ttb) => ttb.branch === stud.branch
		);
		let filteredSection = filteredBranch.sections.find(
			(ttbs) => ttbs.s === stud.s
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
		let filteredDay = section.days.find((sdd) => sdd.day === day);
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
				break;
			case cTime < s:
				console.log("Not Allowed : You are early");
				break;
			case cTime > e:
				console.log("Not Allowed : Library is Closed");
				break;
			default:
				break;
		}
	};

	// check current time with the period time for day
	const checkPeriodTime = (day) => {
		// let cTime = parseFloat(new Date().getHours()+"."+new Date().getMinutes())
		let cTime = 12;
		let periods = day.periods;
		if (cTime < 9.3) console.log("Not Allowed : You are Early");
		if (cTime > 18) console.log("Not Allowed : Library is Closed");
		// this loop will check the current time to period timings and return period
		for (let key in periods) {
			let value = periods[key];
			let start = parseFloat(key.split("-")[0]) + 0.01; // 0.01 added to overlap 2 classe at a time
			let end = parseFloat(key.split("-")[1]);

			if (cTime >= start && cTime <= end) {
				console.log(value);
				switch (true) {
					case value:
						console.log("working", value, cTime);
						break;
					case value === "L":
						console.log(`You are Allowed its a LEISURE Period`);
						break;
					case value === "LIBRARY":
						console.log(`You are Allowed its ${value} Period`);
						break;
					case value !== "L" || value !== "LIBRARY":
						console.log(
							`You are Not Allowed, You have ${value} class now`
						);
						break;
					default:
						break;
				}
			}
		}
	};

	return (
		<div>
			<div className='main-wrapper'>
				<div className='clock-div'>
					<div className='date-div'>
						<span className='day'>{currentDay},</span>
						<span className='date'>{todayDate}</span>
					</div>
					<div className='time-div'>
						<p className='time neonText'>{currentTime}</p>
					</div>
				</div>
				<div className='input-div'>
					<div className='form-conrtol inpur-wrapper'>
						<form onSubmit={submitHandler}>
							<input
								type='text'
								id='name'
								class='form-control'
								placeholder='Enter your ID'
								name='ID'
								value={input}
								style={{ textTransform: "uppercase" }}
								onChange={(e) => setInput(e.target.value)}
								required
								autoComplete='off'
							/>
							<label class='form-label' for='ID'>
								Enter your ID
							</label>
							<button className='btn' type='submit'>
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
			<div className='msg-wrapper'></div>
		</div>
	);
};
export default Homepage;
