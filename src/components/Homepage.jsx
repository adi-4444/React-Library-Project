import React from 'react'
import { useState } from 'react'

const Homepage = (props) => {
   const {students,tt} = props
   // Setting a Clock
   const time = new Date().toLocaleTimeString();
   const date = new Date().getDate() + '-' + parseInt(new Date().getMonth() + 1) + '-' + new Date().getFullYear();
   const [currentTime, setCurrentTime] = useState(time);
   const [todayDate, setTodayDate] = useState(date);
   const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
   const day = days[new Date().getDay()]
   const [currentDay, setCurentDay] = useState(day)
   function refresh () {
      const time = new Date().toLocaleTimeString();
      setCurrentTime(time);
      const date = new Date().getDate() + '-' + parseInt(new Date().getMonth() + 1) + '-' + new Date().getFullYear();
      setTodayDate(date);
      const day = days[new Date().getDay()]
      setCurentDay(day)
   } 
   setInterval(refresh,1000)


   // Taking input to state
   const [input, setInput] = useState();
   const submitHandler = (e) => {
      e.preventDefault()
      checkStudent(input,students);
   }

   //  this function will find student data
   const checkStudent = (input,students) => {
      let inputStudent = input.toString().toUpperCase() // input data
      
      let student = students.find((user) => (user.ID === inputStudent))// check user in DB
         if(student === undefined){
            console.log("Not Found")
         }
         else {
            // console.log(student);
            checkTimeTable(student,tt);
         }
   }
       // check branch, section
   const checkTimeTable = (stud,tt) => {
      console.log(stud.branch,stud.s)
      let filteredBranch = tt.timetables.find(ttb => ttb.branch === stud.branch)
      let filteredSection = filteredBranch.section.find(ttbs => ttbs.s === stud.s)
      console.log(filteredSection)
   }
  return (
    <div>
      <h1>Home Page</h1>
      <span>Date : {todayDate}</span><span> ,  {currentDay}</span>
      <p> Time : {currentTime}</p>
      <form onSubmit={submitHandler}>
        <input type='text' value={input} style={{"textTransform":"uppercase"}} onChange={(e) => setInput(e.target.value)} />
        <button type='submit'>Submit</button>
        {
         // students && students.map(student => (
         //    <div key={student.id}>
         //       <p>ID: {student.ID}</p>
         //    </div>
         // ))
        }
      </form>
    </div>
  )
}

export default Homepage;