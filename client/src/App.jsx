
import { useEffect, useState } from "react";

const API_URL = "https://mern-backend-s237462.onrender.com";

function App() {
  const [students, setStudents] = useState([]);

  // State cho form
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // State xác định sinh viên đang được cập nhật
  const [editingId, setEditingId] = useState(null);

  // Lấy danh sách sinh viên khi mở trang
  useEffect(() => {
    getStudents();
  }, []);

  // Câu 47: GET danh sách sinh viên
  async function getStudents() {
    try {
      const response = await fetch(`${API_URL}/api/students`);

      if (!response.ok) {
        throw new Error("Không thể lấy danh sách sinh viên");
      }

      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Lỗi lấy danh sách sinh viên:", error);
      alert("Không kết nối được với Backend");
    }
  }

  // Câu 49: POST thêm sinh viên
  async function addStudent() {
    if (!studentId.trim() || !name.trim() || !email.trim()) {
      alert("Vui lòng nhập đầy đủ MSSV, họ tên và email!");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/students`, {
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

      if (!response.ok) {
        alert(data.message || "Thêm sinh viên thất bại");
        return;
      }

      alert("Thêm sinh viên thành công!");

      cancelEdit();
      await getStudents();
    } catch (error) {
      console.error("Lỗi thêm sinh viên:", error);
      alert("Không kết nối được với Backend");
    }
  }

  // Câu 61: PUT cập nhật sinh viên
  async function updateStudent() {
    if (!studentId.trim() || !name.trim() || !email.trim()) {
      alert("Vui lòng nhập đầy đủ MSSV, họ tên và email!");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/students/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentId: studentId,
            name: name,
            email: email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Cập nhật sinh viên thất bại");
        return;
      }

      alert("Cập nhật sinh viên thành công!");

      cancelEdit();
      await getStudents();
    } catch (error) {
      console.error("Lỗi cập nhật sinh viên:", error);
      alert("Không kết nối được với Backend");
    }
  }

  // Đưa thông tin sinh viên lên form
  function editStudent(student) {
    setEditingId(student._id);
    setStudentId(student.studentId || "");
    setName(student.name || "");
    setEmail(student.email || "");
  }

  // Câu 62: DELETE xóa sinh viên
  async function deleteStudent(id) {
    if (!window.confirm("Bạn có chắc muốn xóa sinh viên này không?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/students/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Xóa sinh viên thất bại");
        return;
      }

      alert("Xóa sinh viên thành công!");
      await getStudents();
    } catch (error) {
      console.error("Lỗi xóa sinh viên:", error);
      alert("Không kết nối được với Backend");
    }
  }

  // Hủy cập nhật và xóa dữ liệu form
  function cancelEdit() {
    setEditingId(null);
    setStudentId("");
    setName("");
    setEmail("");
  }

  return (
    <div style={{ padding: "24px", fontFamily: "Arial, sans-serif" }}>
      <h1>Quản lý sinh viên - Version 2.0</h1>

      <h2>
        {editingId === null ? "Thêm sinh viên" : "Cập nhật sinh viên"}
      </h2>

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

      {editingId === null ? (
        <button onClick={addStudent}>Thêm sinh viên</button>
      ) : (
        <>
          <button onClick={updateStudent}>Cập nhật</button>{" "}
          <button onClick={cancelEdit}>Hủy</button>
        </>
      )}

      <h2>Danh sách sinh viên</h2>

      {students.length === 0 ? (
        <p>Chưa có sinh viên</p>
      ) : (
        students.map((student) => (
          <div
            key={student._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "12px",
              marginBottom: "12px",
            }}
          >
            <p>MSSV: {student.studentId}</p>
            <p>Họ tên: {student.name}</p>
            <p>Email: {student.email}</p>

            <button onClick={() => editStudent(student)}>Cập nhật</button>{" "}
            <button onClick={() => deleteStudent(student._id)}>Xóa</button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
