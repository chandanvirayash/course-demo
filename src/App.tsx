import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListCourse from "@/components/ListCourse/ListCourse"
import './App.css'
import CourseDetail from './components/CourseDetail';
import DarkMode from './components/mode/DarkMode';

function App() {

  return (
    < >
    <DarkMode />
    <Router>
    <Routes>
      <Route path="/" element={<ListCourse />} />
      <Route path="/course/:courseId" element={<CourseDetail />} />
    </Routes>
  </Router>
  </>
  )
}

export default App
