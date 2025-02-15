import MainCountainerTwo from "../screen/MainCountainerTwo";
import { useSelector } from "react-redux";

import {
  IoIosColorPalette,
  IoIosListBox,
  IoIosPerson,
  IoIosPersonAdd,
} from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { FaClipboardList } from "react-icons/fa";
import { RiFileList2Fill } from "react-icons/ri";

function Main() {
  const user = useSelector((state) => state.user?.user);
  const show = user?.admin;
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-3 list-group m-auto gap-3 ">
          <a
            href={`/acceuil/${user?.id}`}
            className="list-group-item d-flex align-items-center justify-content-center gap-1 shadow-sm rounded">
            <IoHome className="fs-5" /> Acceuil
          </a>
          <a
            href={`/mon_profile/${user?.id}`}
            className="list-group-item d-flex align-items-center justify-content-center gap-1 shadow-sm rounded">
            <IoIosPerson className="fs-5" />
            Profile
          </a>
          {show && (
            <a
              href={"/list_des_utilisateurs"}
              className="list-group-item d-flex align-items-center justify-content-center gap-1 shadow-sm rounded">
              <FaClipboardList className="fs-5" />
              Utilisateurs
            </a>
          )}
          {show && (
            <a
              href={"/ajouter_un_utilisateur"}
              className="list-group-item d-flex align-items-center justify-content-center gap-1 shadow-sm rounded">
              <IoIosPersonAdd className="fs-5" /> Utilisateur
            </a>
          )}
          <a
            href={`/modifier_mon_couleur/${user?.id}`}
            className="list-group-item d-flex align-items-center justify-content-center gap-1 shadow-sm rounded">
            <IoIosColorPalette className="fs-5" /> Couleur
          </a>
          {show && (
            <a
              href={"/list_des_demandes"}
              className="list-group-item d-flex align-items-center justify-content-center gap-1 shadow-sm rounded">
              <IoIosListBox className="fs-5" /> Demandes
            </a>
          )}
          <a
            href={`/mes_demandes/${user?.id}`}
            className="list-group-item d-flex align-items-center justify-content-center gap-1 shadow-sm rounded">
            <RiFileList2Fill className="fs-5" /> Ma Demande
          </a>
        </div>
        <MainCountainerTwo />
      </div>
    </div>
  );
}

export default Main;
