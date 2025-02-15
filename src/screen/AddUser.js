import axios from "axios";
import { useEffect, useState } from "react";
import { MdAssignmentAdd } from "react-icons/md";
import { SiGnuprivacyguard } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddUser() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [age, setAge] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [color, setColor] = useState("");
  const [devise, setDevise] = useState("");
  const [pays, setPays] = useState("");
  const [image, setImage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error(
        <p className="signup_toast">Incompatibilité de mot de passe</p>
      );
      return;
    }
    for (let i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        toast.error(
          <p className="text-center fs-6 lead">
            Cet email existe déjà
          </p>
        );
        return;
      }
      if (users[i].pseudo === username) {
        toast.error(
          <p className="text-center fs-6 lead">
            Ce nom d'utilisateur existe déjà
          </p>
        );
        return;

      }
    }
    try {
      await axios.post(
        "https://675af48e9ce247eb19352d7d.mockapi.io/Stagiaire/users",
        {
          nom: nom,
          prenom: prenom,
          age: age,
          pseudo: username,
          email: email,
          motdepasse: password,
          couleur: color,
          devise: devise,
          pays: pays,
          image: image,
          admin: isAdmin,
          requests: [
            {
              title: "",
              description: "",
              status: "pending",
            },
          ],
        }
      );
      toast.success(
        <p className="signup_toast">
          Vous avez alors créé avec succès un compte
        </p>
      );
      navigate("/list_des_utilisateurs");
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
  return (
    <div className="container">
      <h1 className="text-center mt-4 lead fs-1 d-flex align-items-center justify-content-center gap-1">
        <SiGnuprivacyguard />
        Ajouter Un Utilisateur
      </h1>
      <form
        className="w-100 m-auto py-5 px-3 d-flex gap-3"
        onSubmit={handleSubmit}>
        <div className="col-4 mb-3">
          <div className="col-12 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nom"
              required
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
          </div>
          <div className="col-12 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Prenom"
              required
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
            />
          </div>
          <div className="col-12 mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Votre age"
              required
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
            />
          </div>
          <div className="col-12 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nom d'utilisateur"
              required
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
              required
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
            />
          </div>
          <div className="col-12 mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Mot de passe"
              required
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="col-12 mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Confirmez le mot de passe"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="col-12 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Saisir votre couleur"
              required
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <div className="d-grid mt-5">
            <button className="btn btn-primary d-flex align-items-center justify-content-center mb-3 gap-1">
              <MdAssignmentAdd className="fs-5 lead" />
              Ajouter
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
              required
              value={devise}
              onChange={(e) => setDevise(e.target.value)}
            />
          </div>
          <div className="col-12 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Pays"
              required
              value={pays}
              onChange={(e) => setPays(e.target.value)}
            />
          </div>
          <div className="col-12 mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Image url"
              required
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div className="col-12 mb-3 d-flex align-items-center justify-content-center">
            <label for="admin" className="form-label fs-5 lead me-3">
              Admin
            </label>
            <input
              type="checkbox"
              value={isAdmin}
              checked={isAdmin === true}
              onChange={() => setIsAdmin((admin) => !admin)}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddUser;
