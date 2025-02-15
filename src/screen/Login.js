import axios from "axios";
import { useState } from "react";
import { MdError } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../slices/userSlice";
import { toast } from "react-toastify";
import { SiGnuprivacyguard } from "react-icons/si";
import { IoIosLogIn } from "react-icons/io";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState([]);
  const [tentative, setTentative] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `https://675af48e9ce247eb19352d7d.mockapi.io/Stagiaire/users?pseudo=${username}&motdepasse=${password}`
      );
      const user = res.data[0];
      dispatch(login(user));
      if (user) {
        toast.success(<p className="m-auto fs-6 lead">Vous êtes connecté</p>);
        navigate(`/acceuil/${user?.id}`);
      }
    } catch (err) {
      toast.error(<p className="m-auto fs-6 lead">Information incorrect</p>);
      setError([...error, err.message]);
      setTentative(tentative + 1);
    }
  };
  return (
    <div
      style={{ height: "80vh" }}
      className="container d-flex align-items-center justify-content-center">
      <h1 className="text-center lead fs-1 mb-2">
        <SiGnuprivacyguard className="d-block m-auto mb-2" />
        Connectez-vous à votre compte
      </h1>
      <form className="w-50 m-auto py-5 px-3" onSubmit={handleSubmit}>
        <div className="mb-3 mt-5">
          <input
            type="text"
            className="form-control"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-grid">
          <button
            className="btn btn-primary d-flex align-items-center justify-content-center gap-1"
            disabled={tentative >= 3}>
            <IoIosLogIn className="fs-5 lead" />
            Se connecter
          </button>
        </div>
        <p className="fs-6 fw-semibold lead d-flex align-items-center justify-content-center gap-3 mt-3">
          Pas encore inscrit ?
          <a href="/creer_un_compte" className="text-primary">
            Créer un compte
          </a>
        </p>
        {tentative >= 3 && (
          <p className="lead fw-semibold text-center text-danger mt-4">
            Vous avez été bloqué après 3 tentatives infructueuses.
          </p>
        )}
        {tentative >= 3 || (
          <div className="d-grid list-group m-auto mt-3 gap-3">
            {error.map((err, i) => (
              <a
                key={i}
                className="list-group-item d-flex align-items-center justify-content-center text-danger gap-1 shadow-sm bg-white rounded">
                <MdError className="fs-5" /> {err}
              </a>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;
