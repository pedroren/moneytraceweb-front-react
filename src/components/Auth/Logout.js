import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useGlobals from "../../hooks/use-globals";
const Logout = props => {
  const navigate = useNavigate();
  const globals = useGlobals();

  useEffect(() => {
    globals.setLocalLogout();
    navigate("/login");
  },[])
  return <button onClick={globals.setLocalLogout}>Logout</button>
}

export default Logout;