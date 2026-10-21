import React, { useState, useContext, useMemo } from 'react';
import useFetch from './useFetch';
import { ThemeContext } from './ThemeContext';
import './StudentManagement.css'; // Import file CSS (tùy chọn)

// THAY ĐƯỜNG DẪN NÀY BẰNG MOCKAPI CỦA BẠN
const MOCKAPI_URL = 'https://6xxxxxxxxxxxxxxx.mockapi.io/students'; 

const StudentManagement = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { data: students, setData: setStudents, loading, error } = useFetch(MOCKAPI_URL);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [newStudent, setNewStudent] = useState({ name: '', gpa: '' });
  const [gpaError, setGpaError] = useState('');

  // 1. Thêm tìm kiếm theo tên
  const filteredStudents = useMemo(() => {
    return students.filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [students, searchTerm]);

  // 2. Validate GPA từ 0 đến 4
  const handleAddStudent = (e) => {
    e.preventDefault();
    const gpaValue = parseFloat(newStudent.gpa);

    if (isNaN(gpaValue) || gpaValue < 0 || gpaValue > 4) {
      setGpaError('GPA phải là số từ 0 đến 4');
      return;
    }

    setGpaError('');
    // Thêm sinh viên mới (trong thực tế, bạn sẽ POST lên MockAPI)
    const newStudentData = {
      id: Date.now().toString(), // Tạo ID tạm thời
      name: newStudent.name,
      gpa: gpaValue,
    };
    
    setStudents([...students, newStudentData]);
    setNewStudent({ name: '', gpa: '' }); // Reset form
  };

  // 3. Xóa có hỏi xác nhận
  const handleDelete = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sinh viên này không?')) {
      // Trong thực tế, bạn sẽ gửi request DELETE lên MockAPI
      setStudents(students.filter(student => student.id !== id));
    }
  };

  // Xử lý 3 trạng thái tải dữ liệu
  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div className={`app-container ${theme}`}>
      <button onClick={toggleTheme}>
        Đổi Theme: {theme === 'light' ? 'Sáng' : 'Tối'}
      </button>

      <h2>Quản lý Sinh viên (Hooks)</h2>

      {/* Form tìm kiếm */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Tìm kiếm theo tên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Form thêm sinh viên */}
      <form onSubmit={handleAddStudent} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Tên sinh viên"
          required
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
        />
        <input
          type="number"
          step="0.1"
          placeholder="GPA"
          required
          value={newStudent.gpa}
          onChange={(e) => setNewStudent({ ...newStudent, gpa: e.target.value })}
        />
        <button type="submit">Thêm sinh viên</button>
        {gpaError && <div style={{ color: 'red' }}>{gpaError}</div>}
      </form>

      {/* Danh sách sinh viên */}
      <ul>
        {filteredStudents.map((student) => (
          <li key={student.id} style={{ marginBottom: '10px' }}>
            {student.name} - GPA: {student.gpa}
            <button 
              onClick={() => handleDelete(student.id)}
              style={{ marginLeft: '10px' }}
            >
              Xóa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentManagement;