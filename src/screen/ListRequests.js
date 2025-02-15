import axios from "axios";
import { useEffect, useState } from "react";
import { FaClipboardList } from "react-icons/fa";
import { toast } from "react-toastify";

function ListRequests() {
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

  const xx = users[0]?.requests[0];
  let req = 0;
  for (let i = 0; i < users?.length; i++) {
    if (users[i].requests[0]?.title.length > 0) {
      req++;
    }
  }
  const changeStatus = async (id, status) => {
    try {
      await axios.put(
        `https://675af48e9ce247eb19352d7d.mockapi.io/Stagiaire/users/${id}`,
        {
          requests: [{ ...xx, status }],
        }
      );
      toast.success(<p className="m-auto fs-6 lead">La demande Accepter</p>);
    } catch (err) {
      toast.error(<p className="m-auto fs-6 lead">Quelque chose ne va pas!</p>);
    }
  };
  const deleteReq = async (id, title, description, status) => {
    try {
      await axios.put(
        `https://675af48e9ce247eb19352d7d.mockapi.io/Stagiaire/users/${id}`,
        {
          requests: [{ ...xx, title, description, status }],
        }
      );
      toast.success(<p className="m-auto fs-6 lead">La demande Refuser</p>);
    } catch (err) {
      toast.error(<p className="m-auto fs-6 lead">Quelque chose ne va pas!</p>);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <h1 className="mt-5 d-flex align-items-center justify-content-center gap-2 lead fs-3 mb-4">
            <FaClipboardList /> Liste des Demandes
            <span className="badge bg-primary rounded-circle">{req}</span>
          </h1>
          <table className="table table-striped">
            <thead>
              <tr>
                <th className="col-sm-1 lead fs-6 fw-semibold">ID</th>
                <th className="col-sm-2 lead fs-6 fw-semibold">Titre</th>
                <th className="col-sm-6 lead fs-6 fw-semibold">Description</th>
                <th className="col-sm-1 lead fs-6 fw-semibold">Status</th>
                <th className="col-sm-2 lead fs-6 fw-semibold">Decision</th>
              </tr>
            </thead>
            <tbody>
              {users.map(
                (user) =>
                  user?.requests[0]?.title && (
                    <tr>
                      <td className="lead fs-6">{user?.id}</td>
                      <td className="lead fs-6">{user?.requests[0]?.title}</td>
                      <td className="lead fs-6">
                        {user?.requests[0]?.description}
                      </td>
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
                        {user?.requests[0].status === "accepter" || (
                          <button
                            className="btn btn-outline-success btn-sm rounded-pill"
                            onClick={() => changeStatus(user?.id, "accepter")}>
                            <span className="lead fs-6 p-1">Accepter</span>
                          </button>
                        )}
                        {user?.requests[0].status === "accepter" ? (
                          <button
                            className="btn btn-outline-danger btn-sm rounded-pill"
                            onClick={() =>
                              deleteReq(user?.id, "", "", "refuser")
                            }>
                            <span className="lead fs-6 p-1">Supprimer</span>
                          </button>
                        ) : (
                          <button
                            className="btn btn-outline-danger btn-sm rounded-pill"
                            onClick={() =>
                              deleteReq(user?.id, "", "", "refuser")
                            }>
                            <span className="lead fs-6 p-1">Refuser</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListRequests;
