import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { MdAssignmentAdd } from "react-icons/md";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function AddDesc() {
  const [titre, setTitre] = useState("");
  const [desc, setDesc] = useState("");

  const [users, setUsers] = useState([]);

  useEffect(() => {
    handleUser();
  }, []);
  const handleUser = async () => {
    try {
      const res = await axios.get(
        `https://675af48e9ce247eb19352d7d.mockapi.io/Stagiaire/users/`
      );
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  const { id } = useParams();
  const user = users.find((user) => user.id === id);
  const handleReq = async (id, status) => {
    try {
      await axios.put(
        `https://675af48e9ce247eb19352d7d.mockapi.io/Stagiaire/users/${id}`,
        {
          requests: [{ title: titre, description: desc, status }],
        }
      );
      toast.success(
        <p className="signup_toast">la description est ajouter avec succes</p>
      );

      setTitre("");
      setDesc("");
    } catch (err) {
      toast.error(<p className="signup_toast">Quelque chose ne va pas!</p>);
    }
  };
  return (
    <div className="container">
      <h1 className="text-center mt-4 lead fs-1 d-flex align-items-center justify-content-center gap-1">
        <IoMdAddCircle className="fs-1" />
        Ajouter un demande
      </h1>
      <form
        className="w-100 m-auto py-5 px-3 d-flex gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          handleReq(user?.id, "pending");
        }}>
        <div className="col-12 mb-3">
          <div className="col-12 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Ajouter un titre"
              required
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
            />
          </div>
          <div className="col-12 mb-3">
            <textarea
              className="form-control"
              placeholder="Ajouter un description"
              required
              value={desc}
              onChange={(e) => setDesc(e.target.value)}></textarea>
          </div>
          <div className="d-grid mt-5">
            <button className="btn btn-primary d-flex align-items-center justify-content-center gap-1">
              <MdAssignmentAdd className="fs-5 lead" />
              Ajouter la demande
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddDesc;
