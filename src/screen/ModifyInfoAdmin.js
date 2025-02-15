import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdAssignmentAdd } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function ModifyInfoAdmin() {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();
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

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [age, setAge] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [color, setColor] = useState("");
  const [devise, setDevise] = useState("");
  const [pays, setPays] = useState("");
  const [image, setImage] = useState("");
  const [admin, setAdmin] = useState(false);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (user) {
      setNom(user?.nom);
      setPrenom(user?.prenom);
      setAge(user?.age);
      setUsername(user?.pseudo);
      setColor(user?.couleur);
      setDevise(user?.devise);
      setEmail(user?.email);
      setPassword(user?.motdepasse);
      setPays(user?.pays);
      setImage(user?.image);
      setAdmin(user?.admin);
    }
  }, [user]);

  const handleModify = async (e) => {
    e.preventDefault();
    if (!user) return;
    try {
      await axios.put(
        `https://675af48e9ce247eb19352d7d.mockapi.io/Stagiaire/users/${user?.id}`,
        {
          nom: nom,
          prenom: prenom,
          age: age,
          pseudo: username,
          couleur: color,
          devise: devise,
          email: email,
          motdepasse: password,
          pays: pays,
          image: image,
          admin: admin,
        }
      );
      navigate("/list_des_utilisateurs");
      toast.success(
        <p className="signup_toast">
          Les informations mise à jour avec succès!
        </p>
      );
    } catch (err) {
      toast.error(<p className="signup_toast">Quelque chose ne va pas!</p>);
    }
  };
  const validatePassword = (password) => {
    const errorsList = [];

    if (!/[A-Z]/.test(password)) {
      errorsList.push("Au moins une lettre majuscule");
    }
    if (!/[a-z]/.test(password)) {
      errorsList.push("Au moins une lettre minuscule");
    }
    if (!/\d/.test(password)) {
      errorsList.push("At least one number");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errorsList.push("Au moins un caractère spécial");
    }
    if (password.length < 8) {
      errorsList.push("Au moins 8 caractères");
    }

    return errorsList;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setErrors(validatePassword(newPassword));
  };
  const adm = useSelector((state) => state?.user.user);
  return (
    <div className="container">
      <h1 className="text-center mt-4 lead fs-1 d-flex align-items-center justify-content-center gap-1">
        <FaEdit className="fs-2 lead" />
        Modifier les informations Id :
        <span className="badge bg-primary rounded-circle">{user?.id}</span>
      </h1>
      <form
        className="w-100 m-auto py-5 px-3 d-flex gap-3"
        onSubmit={handleModify}>
        <div className="col-4 mb-3">
          <div className="col-12 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
          </div>
          <div className="col-12 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Prenom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
            />
          </div>
          <div className="col-12 mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Votre age"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
            />
          </div>
          <div className="col-12 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
            />
          </div>
        </div>
        <div className="col-4 mb-3">
          <div className="col-12 mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
            />
          </div>
          <div className="col-12 mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Mot de passe"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="col-12 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Saisir votre couleur"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <div className="d-grid mt-5">
            <button className="btn btn-primary d-flex align-items-center justify-content-center mb-3 gap-1">
              <MdAssignmentAdd className="fs-5 lead" />
              Modifier
            </button>
            <div>
              <ul className="navbar-nav m-auto">
                {errors?.map((error, index) => (
                  <li
                    key={index}
                    className="nav-item text-center text-danger lead fs-6 fw-semibold">
                    {error}
                  </li>
                ))}
              </ul>
              {errors?.length === 0 && password.length > 0 && (
                <p className="text-center text-success lead fs-6 fw-semibold">
                  Password is valid!
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="col-4 mb-3">
          <div className="col-12 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Devise"
              value={devise}
              onChange={(e) => setDevise(e.target.value)}
            />
          </div>
          <div className="col-12 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Pays"
              value={pays}
              onChange={(e) => setPays(e.target.value)}
            />
          </div>
          <div className="col-12 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Image url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          {adm?.pseudo === "amine2025" && (
            <div className="col-12 mb-3 d-flex align-items-center justify-content-center">
              <label for="admin" className="form-label fs-5 lead me-3">
                Admin
              </label>
              <input
                type="checkbox"
                value={admin}
                checked={admin === true}
                onChange={() => setAdmin((admin) => !admin)}
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
export default ModifyInfoAdmin;
