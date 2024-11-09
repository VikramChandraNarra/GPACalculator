import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [courseName, setCourseName] = useState('');
  const [grade, setGrade] = useState('');
  const [gpa, setGpa] = useState('');

  // Initialize courses state from local storage
  const [courses, setCourses] = useState(() => {
    try {
      const savedCourses = JSON.parse(localStorage.getItem('courses'));
      return savedCourses && Array.isArray(savedCourses) ? savedCourses : [];
    } catch (error) {
      console.error('Error loading courses from local storage:', error);
      return [];
    }
  });

  // Save data to local storage whenever courses state changes
  useEffect(() => {
    try {
      localStorage.setItem('courses', JSON.stringify(courses));
    } catch (error) {
      console.error('Error saving courses to local storage:', error);
    }
  }, [courses]);

  // Calculate averages
  const calculateAverages = () => {
    if (courses.length === 0) return { averageGrade: 0, averageGpa: 0 };

    const totalGrade = courses.reduce((sum, course) => sum + parseFloat(course.grade), 0);
    const totalGpa = courses.reduce((sum, course) => sum + parseFloat(course.gpa), 0);

    return {
      averageGrade: (totalGrade / courses.length).toFixed(2),
      averageGpa: (totalGpa / courses.length).toFixed(2),
    };
  };

  const handleAddCourse = () => {
    if (!courseName || grade === '' || gpa === '') {
      alert('Please fill out all fields.');
      return;
    }

    // Input validation
    const parsedGrade = parseFloat(grade);
    const parsedGpa = parseFloat(gpa);

    if (isNaN(parsedGrade) || parsedGrade < 0 || parsedGrade > 100) {
      alert('Please enter a valid grade between 0 and 100.');
      return;
    }

    if (isNaN(parsedGpa) || parsedGpa < 0 || parsedGpa > 4) {
      alert('Please enter a valid GPA between 0.0 and 4.0.');
      return;
    }

    const newCourse = {
      id: Date.now(),
      courseName,
      grade: parsedGrade,
      gpa: parsedGpa,
    };

    setCourses((prevCourses) => [...prevCourses, newCourse]);
    setCourseName('');
    setGrade('');
    setGpa('');
  };

  const handleEditCourse = (id) => {
    const course = courses.find((c) => c.id === id);
    if (course) {
      setCourseName(course.courseName);
      setGrade(course.grade);
      setGpa(course.gpa);
      handleDeleteCourse(id);
    }
  };

  const handleDeleteCourse = (id) => {
    setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));
  };

  const { averageGrade, averageGpa } = calculateAverages();

  return (
    <div className="App">
      <h1>GPA Calculator</h1>
      <div className="input-container">
        <div className="input-field">
          <label htmlFor="courseName">Course Name</label>
          <input
            id="courseName"
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="grade">Grade (0-100)</label>
          <input
            id="grade"
            type="number"
            min="0"
            max="100"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="gpa">GPA (0.0-4.0)</label>
          <input
            id="gpa"
            type="number"
            step="0.01"
            min="0"
            max="4"
            value={gpa}
            onChange={(e) => setGpa(e.target.value)}
          />
        </div>
        <button onClick={handleAddCourse}>Add Course</button>
      </div>

      <div className="course-list">
        {courses.map((course) => (
          <div key={course.id} className="course-item">
            <div className="course-info">
              <h3>{course.courseName}</h3>
              <p>Grade: {course.grade}</p>
              <p>GPA: {course.gpa}</p>
            </div>
            <div className="course-actions">
              <button onClick={() => handleEditCourse(course.id)}>Edit</button>
              <button onClick={() => handleDeleteCourse(course.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {courses.length > 0 && (
        <div className="averages">
          <p>Average Grade: {averageGrade}</p>
          <p>Average GPA: {averageGpa}</p>
        </div>
      )}
    </div>
  );
}

export default App;
