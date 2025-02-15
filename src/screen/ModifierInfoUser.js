import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdAssignmentAdd } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function ModifierInfoUser() {
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
  const { id } = useParams();
  const user = users.find((user) => user.id === id);
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

  useEffect(() => {
    if (user) {
      setNom(user?.nom);
      setPrenom(user?.prenom);
      setAge(user?.age);
      setUsername(user?.pseudo);
      setEmail(user?.email);
      setPassword(user?.motdepasse);
      setColor(user?.couleur);
      setDevise(user?.devise);
      setPays(user?.pays);
      setImage(user?.image);
    }
  }, [user]);
  const handleModify = async (e) => {
    e.preventDefault();
    if (!user) return;
    if (password !== confirmPassword) {
      toast.error(
        <p className="m-auto fs-6 lead">Incompatibilité de mot de passe</p>
      );
      return;
    }
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
        }
      );
      navigate(`/mon_profile/${user?.id}`);
      toast.success(
        <p className="m-auto fs-6 lead">mise à jour avec succès!</p>
      );
    } catch (err) {
      toast.error(<p className="m-auto fs-6 lead">Quelque chose ne va pas!</p>);
    }
  };
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="col-12 mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Confirmez le mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            <button className="btn btn-primary d-flex align-items-center justify-content-center gap-1">
              <MdAssignmentAdd className="fs-5 lead" />
              Modifier
            </button>
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
        </div>
      </form>
    </div>
  );
}

export default ModifierInfoUser;
