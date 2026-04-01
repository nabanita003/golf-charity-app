import { useEffect, useState } from "react";
import API from "../api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/admin/users").then(res => setUsers(res.data));
  }, []);

  return (
    <div className="pt-24 px-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Subscription</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id} className="text-center">
              <td className="border p-2">{u.name}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">{u.role}</td>
              <td className="border p-2">{u.subscription?.status || "inactive"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}