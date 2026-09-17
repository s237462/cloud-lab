import { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);

  // State cho form
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // State để biết đang cập nhật sinh viên nào
  const [editingId, setEditingId] = useState(null);

  // Lấy danh sách sinh viên khi mở trang
  useEffect(() => {
    getStudents();
  }, []);

  // Câu 47: GET danh sách sinh viên
  async function getStudents() {
    try {
      const response = await fetch(
        "http://localhost:5000/api/students"
      );

      const data = await response.json();

      setStudents(data);
    } catch (error) {
      console.error("Lỗi lấy danh sách sinh viên:", error);
      alert("Không kết nối được với Backend");
    }
  }

  // Câu 49: POST thêm sinh viên
  async function addStudent() {
    try {
      const response = await fetch(
        "http://localhost:5000/api/students",
        {
          method: "POST",

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

  // Câu 61: PUT cập nhật sinh viên
  async function updateStudent() {
    try {
      const response = await fetch(
        `http://localhost:5000/api/students/${editingId}`,
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

      console.log("Kết quả cập nhật:", data);

      if (!response.ok) {
        alert(data.message || "Cập nhật sinh viên thất bại");
        return;
      }

      alert("Cập nhật sinh viên thành công!");

      // Xóa dữ liệu form
      setStudentId("");
      setName("");
      setEmail("");

      // Thoát chế độ cập nhật
      setEditingId(null);

      // Lấy lại danh sách
      getStudents();
    } catch (error) {
      console.error("Lỗi cập nhật sinh viên:", error);
      alert("Không kết nối được với Backend");
    }
  }

  // Khi bấm nút Sửa
  function editStudent(student) {
    setEditingId(student._id);
    setStudentId(student.studentId);
    setName(student.name);
    setEmail(student.email);
  }

  // Câu 62: DELETE xóa sinh viên
  async function deleteStudent(id) {
    if (!window.confirm("Bạn có chắc muốn xóa sinh viên này không?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/students/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      console.log("Kết quả xóa:", data);

      if (!response.ok) {
        alert(data.message || "Xóa sinh viên thất bại");
        return;
      }

      alert("Xóa sinh viên thành công!");

      // Cập nhật lại danh sách
      getStudents();
    } catch (error) {
      console.error("Lỗi xóa sinh viên:", error);
      alert("Không kết nối được với Backend");
    }
  }

  // Hủy cập nhật
  function cancelEdit() {
    setEditingId(null);
    setStudentId("");
    setName("");
    setEmail("");
  }

  return (
    <div>
      <h1>Quản lý sinh viên</h1>

      {/* Form */}
      <h2>
        {editingId === null
          ? "Thêm sinh viên"
          : "Cập nhật sinh viên"}
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

      {/* Nút Thêm */}
      {editingId === null ? (
        <button onClick={addStudent}>
          Thêm sinh viên
        </button>
      ) : (
        <>
          {/* Nút Cập nhật */}
          <button onClick={updateStudent}>
            Cập nhật
          </button>

          {" "}

          {/* Nút Hủy */}
          <button onClick={cancelEdit}>
            Hủy
          </button>
        </>
      )}

      {/* Danh sách */}
      <h2>Danh sách sinh viên</h2>

      {students.length === 0 ? (
        <p>Chưa có sinh viên</p>
      ) : (
        students.map((student) => (
          <div key={student._id}>
            <p>MSSV: {student.studentId}</p>
            <p>Họ tên: {student.name}</p>
            <p>Email: {student.email}</p>

            {/* Nút Cập nhật */}
            <button onClick={() => editStudent(student)}>
              Cập nhật
            </button>

            {" "}

            {/* Nút Xóa */}
            <button onClick={() => deleteStudent(student._id)}>
              Xóa
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default App;
