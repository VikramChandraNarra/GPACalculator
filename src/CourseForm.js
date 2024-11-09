// CourseForm.js
import React from 'react';
import { Button, Input, Stack } from '@chakra-ui/react';

function CourseForm({
  courseName,
  setCourseName,
  grade,
  setGrade,
  gpa,
  setGpa,
  onSubmit,
  isEditing,
}) {
  return (
    <Stack spacing={3} mb={4}>
      <Input
        placeholder="Course Name"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
      />
      <Input
        placeholder="Grade"
        type="number"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
      />
      <Input
        placeholder="GPA"
        type="number"
        value={gpa}
        onChange={(e) => setGpa(e.target.value)}
      />
      <Button colorScheme="teal" onClick={onSubmit}>
        {isEditing ? 'Update Course' : 'Add Course'}
      </Button>
    </Stack>
  );
}

export default CourseForm;
