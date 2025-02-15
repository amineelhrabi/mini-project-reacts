import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateColor } from "../slices/userSlice";
import { toast } from "react-toastify";
import { IoIosColorPalette } from "react-icons/io";
import { useParams } from "react-router-dom";

function ModifyColor() {
  const [users, setUsers] = useState([]);

  const [newColor, setNewColor] = useState();
  const dispatch = useDispatch();

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
  const user = users.find((user) => user?.id === id);

  const handleColor = async (e) => {
    e.preventDefault();
    try {
      if (!user) return;
      await axios.put(
        `https://675af48e9ce247eb19352d7d.mockapi.io/Stagiaire/users/${user?.id}`,
        { couleur: newColor }
      );
      dispatch(updateColor(newColor));
      toast.success(
        <p className="text-center fs-6 lead">
          Couleur mise à jour avec succès!{" "}
        </p>
      );
    } catch (err) {
      toast.error(
        <p className="text-center fs-6 lead">Quelque chose ne va pas!</p>
      );
    }
  };

  const userUnder = user?.age <= 15;
  return (
    <div style={{ height: "70vh" }} className="container">
      <h1 className="text-center mt-4 mb-5 lead fs-1 d-flex align-items-center justify-content-center gap-1">
        <IoIosColorPalette className="fs-1 " />
        Modifier votre couleur
      </h1>
      {userUnder ? (
        <div className="d-flex align-items-center justify-content-center h-50">
          <h2 className="fs-1 lead text-center m-auto">
            Vous ne pouvez pas changer de couleur préférée car vous avez moins
            de <span className="text-primary">15</span> ans
          </h2>
        </div>
      ) : (
        <form onSubmit={handleColor} className="mt-5">
          <select
            className="form-select"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}>
            <option>Choisissez votre couleur préférée</option>
            <option value="#fff" style={{ backgroundColor: "#fff" }}>
              #fff
            </option>
            <option value="#d1d5db" style={{ backgroundColor: "#d1d5db" }}>
              #d1d5db
            </option>
            <option value="#fca5a5" style={{ backgroundColor: "#fca5a5" }}>
              #fca5a5
            </option>
            <option value="#fde047" style={{ backgroundColor: " #fde047" }}>
              #fde047
            </option>
            <option value="#bfdbfe" style={{ backgroundColor: "#bfdbfe" }}>
              #bfdbfe
            </option>
            <option value="#fdba74" style={{ backgroundColor: "#fdba74" }}>
              #fdba74
            </option>
            <option value="#f9a8d4" style={{ backgroundColor: "#f9a8d4" }}>
              #f9a8d4
            </option>
            <option value="#d8b4fe" style={{ backgroundColor: "#d8b4fe" }}>
              #d8b4fe
            </option>
            <option value="#86efac" style={{ backgroundColor: "#86efac" }}>
              #86efac
            </option>
            <option value="#f8fafc" style={{ backgroundColor: "#f8fafc" }}>
              #f8fafc
            </option>
          </select>
          <div className="d-grid mt-5">
            <button className="btn btn-primary d-flex align-items-center justify-content-center gap-1">
              <IoIosColorPalette className="fs-5 lead" />
              Modifier le couleur
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ModifyColor;
