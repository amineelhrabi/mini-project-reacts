import { useSelector } from "react-redux";
import { IoHome } from "react-icons/io5";
import { FaClipboardList } from "react-icons/fa";
import {
  IoIosPersonAdd,
  IoIosPerson,
  IoIosColorPalette,
  IoIosListBox,
} from "react-icons/io";
import { RiFileList2Fill } from "react-icons/ri";

function NavBar() {
  const user = useSelector((state) => state?.user?.user);
  const show = user?.admin;
  return (
    <>
      {user && (
        <nav className="navbar navbar-expand-md bg-primary">
          <div className="container">
            <button
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              className="navbar-toggler">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav m-auto gap-2">
                <li className="nav-item">
                  <a
                    href={`/acceuil/${user?.id}`}
                    className="nav-link text-light d-flex align-items-center justify-content-center gap-1">
                    <IoHome className="fs-5" /> Acceuil
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href={`/mon_profile/${user?.id}`}
                    className="nav-link text-light d-flex align-items-center justify-content-center gap-1">
                    <IoIosPerson className="fs-5" />
                    Profile
                  </a>
                </li>
                {show && (
                  <li className="nav-item">
                    <a
                      href={"/list_des_utilisateurs"}
                      className="nav-link text-light d-flex align-items-center justify-content-center gap-1">
                      <FaClipboardList className="fs-5" />
                      Utilisateurs
                    </a>
                  </li>
                )}
                {show && (
                  <li className="nav-item">
                    <a
                      href={"/ajouter_un_utilisateur"}
                      className="nav-link text-light d-flex align-items-center justify-content-center gap-1">
                      <IoIosPersonAdd className="fs-5" /> Utilisateur
                    </a>
                  </li>
                )}
                <li className="nav-item">
                  <a
                    href={`/modifier_mon_couleur/${user?.id}`}
                    className="nav-link text-light d-flex align-items-center justify-content-center gap-1">
                    <IoIosColorPalette className="fs-5" /> Couleur
                  </a>
                </li>
                {show && (
                  <li className="nav-item">
                    <a
                      href={"/list_des_demandes"}
                      className="nav-link text-light d-flex align-items-center justify-content-center gap-1">
                      <IoIosListBox className="fs-5" /> Demandes
                    </a>
                  </li>
                )}
                <li className="nav-item">
                  <a
                    href={`/mes_demandes/${user?.id}`}
                    className="nav-link text-light d-flex align-items-center justify-content-center gap-1">
                    <RiFileList2Fill className="fs-5" /> Ma Demande
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

export default NavBar;
