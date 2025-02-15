import { RiLogoutBoxLine } from "react-icons/ri";
import { IoIosPerson } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/userSlice";
import { toast } from "react-toastify";
function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.user);

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(logout());
    toast.success(<p className="m-auto fs-6 lead">Vous êtes déconnecté</p>);
    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand-md bg-primary">
      <div className="container">
        <a href={`/acceuil/${user?.id}`} className="navbar-brand">
          <img src="../logo192.png" alt="logo react" className="w-25" />
        </a>
        <button
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
          className="navbar-toggler">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar">
          {user && (
            <ul className="navbar-nav ms-auto gap-2 d-flex align-items-center justify-content-center">
              <h2 className="h2 text-light">Bienvenue</h2>
              <li className="nav-item">
                <a
                  href={`/mon_profile/${user?.id}`}
                  className="nav-link text-light d-flex align-items-center justify-content-center gap-1">
                  <IoIosPerson className="fs-5" />
                  {user?.prenom} {user?.nom}
                </a>
              </li>
              <button
                className="btn btn-outline-light lead fs-6 d-flex align-items-center justify-content-center"
                onClick={handleLogout}>
                <RiLogoutBoxLine className="fs-5" />
                Se déconnecter
              </button>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
