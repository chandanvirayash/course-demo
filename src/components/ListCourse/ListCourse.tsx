import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { courses } from "../../../public/courses.json"; // Import the courses data

const ListCourse = () => {
  const [courseData, setCourseData] = useState<any>(courses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<any | null>(null); // To track the course being edited
  const [formData, setFormData] = useState<any>({
    title: "",
    description: "",
    duration: "",
    instructor: { name: "", email: "" },
  });

  // Delete course handler
  const handleDelete = (id: any) => {
    let updatedData = courseData.filter((item: any) => item.course_id !== id);
    setCourseData(updatedData);
  };

  // Show the modal for adding a new course
  const handleAddCourse = () => {
    setCurrentCourse(null); // Reset the current course to add a new one
    setIsModalOpen(true);
    setFormData({
      title: "",
      description: "",
      duration: "",
      instructor: { name: "", email: "" },
    });
  };

  // Show the modal for editing a course
  const handleEdit = (course: any) => {
    setCurrentCourse(course); 
    setFormData({
      title: course.title,
      description: course.description,
      duration: course.duration,
      instructor: course.instructor,
    });
    setIsModalOpen(true);
  };

  // Handle input changes for general course fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle input changes for instructor fields
  const handleInstructorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      instructor: {
        ...prev.instructor,
        [name]: value,
      },
    }));
  };

  // Handle form submission to either add a new course or update an existing one
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentCourse) {
      // If editing, update the existing course data
      const updatedCourses = courseData.map((course: any) =>
        course.course_id === currentCourse.course_id ? { ...course, ...formData } : course
      );
      setCourseData(updatedCourses);
    } else {
      // If adding new, create a new course
      const newCourse = { ...formData, course_id: Date.now() }; // Unique ID using Date.now()
      setCourseData([...courseData, newCourse]);
    }
    console.log("courseData",courseData)
    setIsModalOpen(false); // Close the modal after submit
    setCurrentCourse(null); // Reset the current course
  };

  const handleCourseMaterial =()=>{
    
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Available Courses</h1>
      <Button
        onClick={handleAddCourse}
        className="font-medium py-3 px-6 mb-8 rounded-lg"
        >
        Add Course
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courseData?.map((course: any) => (
            <Card
            key={course.course_id}
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
            <div>
              <h2 className="text-2xl font-semibold">{course.title}</h2>
              <p className=" mb-4 text-sm">{course.description}</p>
            </div>
            <div className=" text-sm mb-4">
              <p>
                <strong>Duration:</strong> {course.duration}
              </p>
              <p>
                <strong>Instructor:</strong> {course.instructor.name} ({course.instructor.email})
              </p>
            </div>

            
            <div className="text-center">
              <Link to={`/course/${course.course_id}`} state={{ courseData: course }}>
                <Button className="bg-black  font-medium py-2 px-5 rounded-lg hover:bg-gray-800 transition-colors duration-300 mx-2">
                  Course Details
                </Button>
              </Link>
              
              <Button
                onClick={() => handleEdit(course)}
                className="bg-black text-white font-medium py-2 px-5 rounded-lg hover:bg-gray-800 transition-colors duration-300 mx-2"
              >
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(course.course_id)}
                className="bg-black text-white font-medium py-2 px-5 rounded-lg hover:bg-gray-800 transition-colors duration-300 mx-2"
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal for Creating or Editing Course */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              {currentCourse ? "Edit Course" : "Create New Course"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2" htmlFor="title">
                  Course Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg color-fff"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2" htmlFor="description">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg color-fff"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2" htmlFor="duration">
                  Duration
                </label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg color-fff"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2" htmlFor="instructor_name">
                  Instructor Name
                </label>
                <input
                  type="text"
                  id="instructor_name"
                  name="name"
                  value={formData.instructor.name}
                  onChange={handleInstructorChange}
                  className="w-full p-2 border rounded-lg color-fff"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2" htmlFor="instructor_email">
                  Instructor Email
                </label>
                <input
                  type="email"
                  id="instructor_email"
                  name="email"
                  value={formData.instructor.email}
                  onChange={handleInstructorChange}
                  className="w-full p-2 border rounded-lg color-fff"
                  required
                />
              </div>
              <div className="flex justify-between">
                <Button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-black text-white py-2 px-5 rounded-lg hover:bg-gray-800"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-black text-white py-2 px-5 rounded-lg hover:bg-gray-800"
                >
                  {currentCourse ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListCourse;
