import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function MainCountainerTwo() {
  const user = useSelector((state) => state?.user?.user);

  return (
    <div className="col-sm" style={{ backgroundColor: user?.couleur }}>
      <Outlet />
    </div>
  );
}

export default MainCountainerTwo;
