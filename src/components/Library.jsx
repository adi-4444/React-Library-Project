import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Homepage from "./Homepage";

const Library = () => {
	// Fetching students data and assigning in data
	const [students, setStudents] = useState([]);

	useEffect(() => {
		axios("./data/students.json")
			.then((res) => setStudents(res.data.students))
			.catch((err) => console.log(err));
	}, []);

	// Fetching TimeTable and assigning in tt
	const [tt, setTt] = useState({});

	useEffect(() => {
		axios("./data/timetable.json")
			.then((res) => setTt(res.data))
			.catch((err) => console.log(err));
	}, []);

	return (
		<div>
			<Homepage students={students} tt={tt} />
		</div>
	);
};

export default Library;
