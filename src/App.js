import React from 'react';
import StudentManagement from './StudentManagement';
import { ThemeProvider } from './ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <StudentManagement />
    </ThemeProvider>
  );
}

export default App;
