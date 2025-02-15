import axios from "axios";
import { useEffect, useState } from "react";
import { BsFillTicketDetailedFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdOutlineTitle } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function IndexPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const userz = useSelector((state) => state?.user?.user);

  useEffect(() => {
    handleUser();
  }, []);
  const handleUser = async () => {
    try {
      const res = await axios.get(
        "https://675af48e9ce247eb19352d7d.mockapi.io/Stagiaire/users/"
      );
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const user = users.find((user) => user.id === userz.id);
  return (
    <>
      <button
        className="btn btn-primary float-end mt-2 mb-5 d-block"
        onClick={(e) => {
          e.preventDefault();
          navigate(`/ajouter_description/${user?.id}`);
        }}>
        <FaEdit className="fs-5 lead" />
        Ajouter un titre et un description
      </button>
      <div className="container d-flex align-items-center justify-content-center mt-5">
        <p className="fs-1 lead mx-auto text-center gap-2">
          Bienvenue <br />
          <span className="text-primary">
            {user?.prenom} {user?.nom}
          </span>
        </p>
      </div>
      {user?.requests[0].status === "accepter" && (
        <div className="container mt-5 mb-3">
          <div className="col-sm-2 list-group m-auto gap-3 w-100">
            <p className="list-group-item d-flex align-items-center justify-content-center gap-1">
              <MdOutlineTitle className="fs-5" /> Titre :{" "}
              {user?.requests[0].title}
            </p>
            <p className="list-group-item d-flex align-items-center justify-content-center gap-1">
              <BsFillTicketDetailedFill className="fs-5" /> Description :{" "}
              {user?.requests[0].description}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default IndexPage;
