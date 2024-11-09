// CourseList.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  IconButton,
  HStack,
  Divider,
  VStack,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import CourseForm from './CourseForm';

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [grade, setGrade] = useState('');
  const [gpa, setGpa] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem('courses')) || [];
    setCourses(savedCourses);
  }, []);

  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  const handleAddOrUpdateCourse = () => {
    if (!courseName || !grade || !gpa) return;

    const newCourses = [...courses];
    if (editIndex !== null) {
      newCourses[editIndex] = { courseName, grade: parseFloat(grade), gpa: parseFloat(gpa) };
      setEditIndex(null);
    } else {
      newCourses.push({ courseName, grade: parseFloat(grade), gpa: parseFloat(gpa) });
    }
    setCourses(newCourses);
    resetForm();
  };

  const resetForm = () => {
    setCourseName('');
    setGrade('');
    setGpa('');
  };

  const handleEditCourse = (index) => {
    setEditIndex(index);
    const course = courses[index];
    setCourseName(course.courseName);
    setGrade(course.grade);
    setGpa(course.gpa);
  };

  const handleDeleteCourse = (index) => {
    const newCourses = courses.filter((_, i) => i !== index);
    setCourses(newCourses);
  };

  const calculateAverage = () => {
    if (courses.length === 0) return { avgGrade: 0, avgGpa: 0 };
    const totalGrade = courses.reduce((acc, course) => acc + course.grade, 0);
    const totalGpa = courses.reduce((acc, course) => acc + course.gpa, 0);
    return {
      avgGrade: (totalGrade / courses.length).toFixed(2),
      avgGpa: (totalGpa / courses.length).toFixed(2),
    };
  };

  const { avgGrade, avgGpa } = calculateAverage();

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} bg="gray.800">
      <Text fontSize="2xl" fontWeight="bold" mb={4} color="teal.300">
        GPA Calculator
      </Text>
      <CourseForm
        courseName={courseName}
        setCourseName={setCourseName}
        grade={grade}
        setGrade={setGrade}
        gpa={gpa}
        setGpa={setGpa}
        onSubmit={handleAddOrUpdateCourse}
        isEditing={editIndex !== null}
      />
      <Divider my={4} />
      <VStack align="start">
        {courses.map((course, index) => (
          <HStack key={index} w="100%" justify="space-between" py={2} px={3} bg="gray.700" borderRadius="md">
            <Text>{course.courseName}</Text>
            <Text>Grade: {course.grade}</Text>
            <Text>GPA: {course.gpa}</Text>
            <HStack>
              <IconButton
                icon={<EditIcon />}
                size="sm"
                onClick={() => handleEditCourse(index)}
              />
              <IconButton
                icon={<DeleteIcon />}
                size="sm"
                onClick={() => handleDeleteCourse(index)}
              />
            </HStack>
          </HStack>
        ))}
      </VStack>
      <Divider my={4} />
      <Text fontSize="lg" color="teal.300">
        Average Grade: {avgGrade}
      </Text>
      <Text fontSize="lg" color="teal.300">
        Average GPA: {avgGpa}
      </Text>
    </Box>
  );
}

export default CourseList;
