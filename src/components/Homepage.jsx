import React from 'react'
import { useState } from 'react'

const Homepage = ({students,tt}) => {

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
       // check branch and section of student
   const checkTimeTable = (stud,tt) => {
      let filteredBranch = tt.timetables.find(ttb => ttb.branch === stud.branch);
      let filteredSection = filteredBranch.sections.find(ttbs => ttbs.s === stud.s);
      checkDay(filteredSection);
   }
      // check present day for section
   const checkDay = (section) => {
      const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
      let day = days[new Date().getDay()]
      let filteredDay = section.days.find(sdd => sdd.day === day);
      checkPeriodTime(filteredDay);
   }
   // check current time with the period time for day
   const checkPeriodTime =(day) => {
      // let cTime = parseFloat(new Date().getHours()+"."+new Date().getMinutes())
      let cTime = 10.31
      console.log(cTime)
      let periods = day.periods
      console.log(periods)
      // this loop will check the current time to period timings and return period
      for (let key in periods) {
         let value = periods[key];
         let start = parseFloat(key.split("-")[0])+0.01 // 0.01 added to overlap 2 classe at a time
         let end = parseFloat(key.split("-")[1])
         if(cTime >= start && cTime <= end) {
            console.log(value)
         }
       }
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