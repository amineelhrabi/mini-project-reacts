import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./AppLayout/AppLayout";
import Login from "./screen/Login";
import Signup from "./screen/Signup";
import Main from "./components/Main";
import MainCountainerTwo from "./screen/MainCountainerTwo";
import MyProfile from "./screen/MyProfile";
import AddUser from "./screen/AddUser";
import ListUser from "./screen/ListUser";
import ModifyColor from "./screen/ModifyColor";
import UserDetail from "./screen/UserDetail";
import Home from "./screen/Home";
import ModifyInfoAdmin from "./screen/ModifyInfoAdmin";
import ModifierInfoUser from "./screen/ModifierInfoUser";
import AddDesc from "./screen/AddDesc";
import ListRequests from "./screen/ListRequests";
import MyRequests from "./screen/MyRequests";
import { useSelector } from "react-redux";
import IndexPage from "./screen/IndexPage";

function App() {
  const user = useSelector((state) => state.user?.user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {!user ? (
            <Route index element={<Login />} />
          ) : (
            <Route path="/" element={<Main />}>
              <Route path="/" element={<MainCountainerTwo />}>
                <Route index={true} path="/" element={<IndexPage />} />
              </Route>
            </Route>
          )}
          <Route path="/creer_un_compte" element={<Signup />} />

          <Route path="/" element={<Main />}>
            <Route path="/" element={<MainCountainerTwo />}>
              <Route index={true} path="/acceuil/:id" element={<Home />} />
              <Route path="/mon_profile/:id" element={<MyProfile />} />
              <Route path="/list_des_utilisateurs" element={<ListUser />} />
              <Route path="/ajouter_un_utilisateur" element={<AddUser />} />
              <Route
                path="/modifier_mon_couleur/:id"
                element={<ModifyColor />}
              />
              <Route path="/list_des_demandes" element={<ListRequests />} />
              <Route path="/mes_demandes/:id" element={<MyRequests />} />
              <Route path="/detail_utilisateur/:id" element={<UserDetail />} />
              <Route
                path="/modifier_pour_admin/:id"
                element={<ModifyInfoAdmin />}
              />
              <Route
                path="/modifier_pour_User/:id"
                element={<ModifierInfoUser />}
              />
              <Route path="/ajouter_description/:id" element={<AddDesc />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
