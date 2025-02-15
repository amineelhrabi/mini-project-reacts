import axios from "axios";
import { useEffect, useState } from "react";
import { FaFolder } from "react-icons/fa";
import { HiEmojiSad } from "react-icons/hi";
import { ImHappy2 } from "react-icons/im";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function MyRequests() {
  const [users, setUsers] = useState([]);
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
  const { id } = useParams();
  const user = users.find((user) => user.id === id);
  const xx = users[0]?.requests[0];

  const deleteReq = async (id, title, description, status) => {
    try {
      await axios.put(
        `https://675af48e9ce247eb19352d7d.mockapi.io/Stagiaire/users/${id}`,
        {
          requests: [{ ...xx, title, description, status }],
        }
      );
      toast.success(
        <p className="m-auto fs-6 lead">Votre demande Supprimer</p>
      );
    } catch (err) {
      toast.error(<p className="m-auto fs-6 lead">Quelque chose ne va pas!</p>);
    }
  };
  return (
    <div style={{ height: '60vh' }} className="container mt-4">
      <div className="row">
        <h1 className="mt-2 mb-4 d-flex align-items-center justify-content-center gap-2 lead fs-2">
          <FaFolder /> Ma Demande
        </h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="col-sm-1 lead fs-6 fw-semibold">ID</th>
              <th className="col-sm-3 lead fs-6 fw-semibold">Titre</th>
              <th className="col-sm-4 lead fs-6 fw-semibold">Description</th>
              <th className="col-sm-2 lead fs-6 fw-semibold">Statut</th>
              <th className="col-sm-3 lead fs-6 fw-semibold">#</th>
            </tr>
          </thead>
          {user?.requests[0].title && (
            <tbody>
              <tr>
                <td className="lead fs-6">{user?.id}</td>
                <td className="lead fs-6">{user?.requests[0]?.title}</td>
                <td className="lead fs-6">{user?.requests[0]?.description}</td>
                <td className="lead fs-6">
                  {user?.requests[0].status === "pending" ? (
                    <span className="badge bg-warning">En attente</span>
                  ) : user?.requests[0].status === "accepter" ? (
                    <span className="badge bg-success">Accepter</span>
                  ) : (
                    <span className="badge bg-danger">Refuser</span>
                  )}
                </td>
                <td className="d-flex alig-items-center justidy-content-center gap-2">
                  {user?.requests[0].status === "pending" ? (
                    <button
                      className="btn btn-outline-danger btn-sm rounded-pill"
                      onClick={() => deleteReq(user?.id, "", "", "refuser")}>
                      <span className="lead fs-6 p-1">Supprimer</span>
                    </button>
                  ) : user?.requests[0].status === "accepter" ? (
                    <ImHappy2 className="fs-4 text-success d-flex align-items-center justify-content-center" />
                  ) : (
                    <HiEmojiSad className="fs-4 text-danger d-flex align-items-center justify-content-center" />
                  )}
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default MyRequests;
