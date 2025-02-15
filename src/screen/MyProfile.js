import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaFlag, FaMoneyBillWave } from "react-icons/fa";
import { IoIosColorPalette, IoIosPerson } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { PiIdentificationBadgeFill } from "react-icons/pi";
function MyProfile() {
  // const user = useSelector((state) => state.user?.user);

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
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
  const { id } = useParams();
  const user = users.find((user) => user.id === id);
  return (
    <>
      <div className="container">
        <button
          className="btn btn-primary d-flex align-items-center justify-content-center float-end mt-3"
          onClick={(e) => {
            e.preventDefault();
            navigate(`/modifier_pour_user/${user?.id}`);
          }}>
          <FaEdit className="fs-5 lead" />
          Modifier
        </button>
      </div>
      <div className="col-sm-10 m-auto">
        <div className="container d-flex align-items-center justify-content-center">
          <div className="d-flex">
            <div
              style={{ width: "150px", height: "150px" }}
              className="card rounded-circle mx-5 mb-3">
              <img
                style={{ objectFit: "cover" }}
                src={user?.image}
                alt={user?.nom}
                className="rounded-circle w-100 h-100"
              />
            </div>
            <h4 className="my-auto fs-1 lead">
              {user?.nom} {user?.prenom}, {user?.age} ans
            </h4>
          </div>
        </div>
        <div className="container">
          <div className="col-sm-2 list-group m-auto gap-3 w-100">
            <p className="list-group-item d-flex align-items-center justify-content-center gap-1">
              <PiIdentificationBadgeFill className="fs-5" /> Identifiant :{" "}
              {user?.id}
            </p>
            <p className="list-group-item d-flex align-items-center justify-content-center gap-1">
              <IoIosPerson className="fs-5" /> Nom d'utilisateur :{" "}
              {user?.pseudo}
            </p>
            <p className="list-group-item d-flex align-items-center justify-content-center gap-1">
              <MdEmail className="fs-5" />
              E-mail : {user?.email}
            </p>
            <p className="list-group-item d-flex align-items-center justify-content-center gap-1">
              <FaFlag className="fs-5" /> Pays : {user?.pays}
            </p>
            <p className="list-group-item d-flex align-items-center justify-content-center gap-1">
              <IoIosColorPalette className="fs-5" /> Couleur : {user?.couleur}
            </p>
            <p className="list-group-item mb-5 d-flex align-items-center justify-content-center gap-1">
              <FaMoneyBillWave className="fs-5" /> Devise : {user?.devise}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyProfile;
