import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function ListUser() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    handleUser();
  }, []);
  const handleUser = async () => {
    try {
      const res = await axios.get(
        "https://675af48e9ce247eb19352d7d.mockapi.io/Stagiaire/users"
      );
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDetail = async (id) => {
    navigate(`/detail_utilisateur/${id}`);
  };

  const handleDelete = async (id, admin) => {
    if (admin === true) {
      toast.error(
        <p className="text-center fs-6 lead">
          Vous ne pouvez pas supprimer un admin
        </p>
      );
      return;
    }
    try {
      await axios.delete(
        `https://675af48e9ce247eb19352d7d.mockapi.io/Stagiaire/users/${id}`
      );
      alert("Es-tu sûr");
      setUsers(users.filter((user) => user.id !== id));
      toast.success(
        <p className="text-center fs-6 lead">l'utilisateur Supprimez</p>
      );
    } catch (error) {
      toast.error(
        <p className="text-center fs-6 lead">Quelque chose ne va pas!</p>
      );
    }
  };
  const user_length = users.length;
  return (
    <div className="container mt-4">
      <div className="row">
        <h1 className="mt-2 mb-4 d-flex align-items-center justify-content-center gap-2 lead fs-2">
          Liste des utilisateurs
          <span className="badge bg-primary rounded-circle">{user_length}</span>
        </h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="col-sm-1 lead fs-6 fw-semibold">ID</th>
              <th className="col-sm-3 lead fs-6 fw-semibold">Nom et Prenom</th>
              <th className="col-sm-4 lead fs-6 fw-semibold">E-mail</th>
              <th className="col-sm-2 lead fs-6 fw-semibold">Role</th>
              <th className="col-sm-3 lead fs-6 fw-semibold">#</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr>
                <td className="lead fs-6">{user?.id}</td>
                <td className="lead fs-6">
                  {user?.nom} {user?.prenom}
                </td>
                <td className="lead fs-6">{user?.email}</td>
                <td className="lead fs-6">
                  {user?.admin ? (
                    <span className="badge bg-primary">Admin</span>
                  ) : (
                    <span className="badge bg-secondary">User</span>
                  )}
                </td>
                <td className="d-flex alig-items-center justidy-content-center gap-2">
                  <button
                    className="btn btn-outline-primary btn-sm rounded-pill"
                    onClick={() => handleDetail(user?.id)}>
                    <span className="lead fs-6">Voir</span>
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm rounded-pill"
                    onClick={() => handleDelete(user?.id, user?.admin)}>
                    <span className="lead fs-6">Supprimer</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListUser;
