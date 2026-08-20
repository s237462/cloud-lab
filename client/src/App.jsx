import { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);

  // State cho form
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Lấy danh sách sinh viên khi mở trang
  useEffect(() => {
    getStudents();
  }, []);

  // Câu 47: GET danh sách sinh viên
  async function getStudents() {
    try {
      const response = await fetch("/api/students");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Lỗi lấy danh sách sinh viên:", error);
    }
  }

  // Câu 49: POST thêm sinh viên
  async function addStudent() {
    try {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: studentId,
          name: name,
          email: email,
        }),
      });

      const data = await response.json();

      console.log("Kết quả:", data);

      if (!response.ok) {
        alert(data.message || "Thêm sinh viên thất bại");
        return;
      }

      alert("Thêm sinh viên thành công!");

      // Xóa dữ liệu trong form
      setStudentId("");
      setName("");
      setEmail("");

      // Cập nhật lại danh sách
      getStudents();
    } catch (error) {
      console.error("Lỗi thêm sinh viên:", error);
      alert("Không kết nối được với Backend");
    }
  }

  return (
    <div>
      <h1>Quản lý sinh viên</h1>

      {/* Câu 48: Form nhập sinh viên */}
      <h2>Thêm sinh viên</h2>

      <div>
        <input
          type="text"
          placeholder="MSSV"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />
      </div>

      <br />

      <div>
        <input
          type="text"
          placeholder="Họ tên"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <br />

      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <br />

      <button onClick={addStudent}>
        Thêm sinh viên
      </button>

      {/* Hiển thị danh sách */}
      <h2>Danh sách sinh viên</h2>

      {students.length === 0 ? (
        <p>Chưa có sinh viên</p>
      ) : (
        students.map((student) => (
          <div key={student._id}>
            <p>MSSV: {student.studentId}</p>
            <p>Họ tên: {student.name}</p>
            <p>Email: {student.email}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default App;