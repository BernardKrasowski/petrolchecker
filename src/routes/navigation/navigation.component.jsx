import { Outlet, Link } from "react-router-dom";
import "./navigation.styles.scss";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { getDataFromUser } from "../../utils/firebase/firebase.utils";
import { useDispatch } from "react-redux";
import { createActionData } from "../../store/data/data.action";
function Navigation() {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const getData = async () => {
    const dataListHistory = await getDataFromUser();
    if (!dataListHistory) return;
    dispatch(createActionData(dataListHistory));
  };

  const signOut = () => {
    signOutUser();
    dispatch(createActionData({}));
  };
  return (
    <>
      <div className="navigation">
        <div className="logo_container"></div>
        <div className="navLinks">
          <Link to="/" className="homeIcon"></Link>
          <Link to="/history" onClick={getData} className="historyIcon"></Link>

          {currentUser ? (
            <Link to="/" onClick={signOut} className="signOutIcon"></Link>
          ) : (
            <Link to="/auth" className="signInIcon"></Link>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
}
export default Navigation;
