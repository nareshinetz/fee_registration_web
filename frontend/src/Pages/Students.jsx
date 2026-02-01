import { useEffect, useState } from "react";
import { getStudents } from "../api/api";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TEMP: replace with API when backend is ready
    setTimeout(() => {
      setStudents([
        { id: 1, name: "Arun", email: "arun@gmail.com", phone: "9876543210" },
        { id: 2, name: "Priya", email: "priya@gmail.com", phone: "9123456780" },
        { id: 3, name: "Karthick", email: "karthick@gmail.com", phone: "9988776655" },
      ]);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return <h3>Loading students...</h3>;
  }

  return (
    <div style={styles.container}>
      <h1>Students</h1>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
};
