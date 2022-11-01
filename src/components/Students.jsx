import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Students.css";

const Students = () => {
	const [students, setStudents] = useState([]);

	useEffect(() => {
		axios("./data/students.json")
			.then((res) => setStudents(res.data.students))
			.catch((err) => console.log(err));
	}, []);
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<h1>Students List</h1>
			<table style={{ border: "1px solid" }}>
				<tr>
					<th style={{ border: "1px solid" }}>ID</th>
					<th style={{ border: "1px solid" }}>NAME</th>
					<th style={{ border: "1px solid", padding: "3px 5px" }}>
						BRANCH
					</th>
					<th style={{ border: "1px solid", padding: "3px 5px" }}>
						SECTION
					</th>
				</tr>
				{students.map((student) => {
					return (
						<tr key={student.id} style={{}}>
							<td
								style={{
									textAlign: "center",
									border: "1px solid",
									padding: "0px 5px",
								}}
							>
								{student.ID}
							</td>
							<td
								style={{
									textAlign: "center",
									border: "1px solid",
								}}
							>
								{student.name}
							</td>
							<td
								style={{
									textAlign: "center",
									border: "1px solid",
								}}
							>
								{student.branch}
							</td>
							<td
								style={{
									textAlign: "center",
									border: "1px solid",
								}}
							>
								{student.section}
							</td>
						</tr>
					);
				})}
			</table>
		</div>
	);
};

export default Students;
