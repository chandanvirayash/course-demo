import { Link, useLocation } from "react-router-dom";
import { Card } from "./ui/card";
import { Button } from "@/components/ui/button";

export default function CourseDetail() {
  const location = useLocation();
  const course = location.state?.courseData;

  if (!course) {
    return <div>No course data found!</div>;
  }

  const styles = {
    container: {
      padding: "1rem",
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      padding: "1.5rem",
      margin: "1rem auto",
      maxWidth: "800px",
    },
    section: {
      marginBottom: "1rem",
    },
    header: {
      fontWeight: "700",
      fontSize: "1.25rem",
      color: "#444",
      marginBottom: "0.5rem",
    },
    textLink: {
      color: "#007bff",
      textDecoration: "underline",
    },
    textLinkHover: {
      color: "#0056b3",
    },
    tag: {
      backgroundColor: "#e2e8f0",
      padding: "0.5rem 1rem",
      borderRadius: "4px",
      color: "#4a5568",
      margin: "0.25rem",
    },
    list: {
      listStyleType: "none",
      marginLeft: "0",
      paddingLeft: "0",
    },
    button: {
      backgroundColor: "#000", // Updated to black
      color: "white",
      border: "none",
      padding: "0.75rem 1.5rem",
      borderRadius: "4px",
      fontSize: "1rem",
      cursor: "pointer",
      transition: "background-color 0.3s",
      margin: "0.5rem 0", // Added margin for spacing between buttons
      width: "100%", // Makes buttons take up full width within their container (for better alignment)
    },
    buttonHover: {
      backgroundColor: "#333", // Darker shade for hover effect
    },
  };

  return (
    <div style={styles.container}>
      <Link to={`/`}>
        <Button className="bg-black  font-medium py-2 px-5 rounded-lg hover:bg-gray-800 transition-colors duration-300 mx-2">
          Back
        </Button>
      </Link>
      <Card style={styles.card}>
        <div>
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              marginBottom: "0.5rem",
            }}
          >
            {course.title}
          </div>
          <div style={{ marginBottom: "1rem" }}>{course.description}</div>
        </div>

        <div>
          <div style={styles.section}>
            <h3 style={styles.header}>Course Details</h3>
            <p>
              <strong>Duration:</strong> {course.duration}
            </p>
            {/* <p><strong>Start Date:</strong> {course.schedule.start_date}</p>
            <p><strong>End Date:</strong> {course.schedule.end_date}</p>
            <p><strong>Fee:</strong> ${course.fee.toFixed(2)}</p> */}
          </div>

          <div style={styles.section}>
            <h3 style={styles.header}>Instructor</h3>
            <p>
              <strong>Name:</strong> {course.instructor.name}
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a
                href={`mailto:${course.instructor.email}`}
                style={styles.textLink}
              >
                {course.instructor.email}
              </a>
            </p>
          </div>
        </div>

        <div>
          <Button style={styles.button}>Enroll Now</Button>
        </div>
      </Card>
    </div>
  );
}
