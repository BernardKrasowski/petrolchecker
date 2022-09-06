import { signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import { createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
// import GoogleIcon from "@mui/icons-material/Google";

import "./signIn.styles.scss";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  let navigate = useNavigate();

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user).then(
      navigate("/")
    );
  };
  return (
    <div className="signIn">
      <button className="signIn-googleBtn" onClick={logGoogleUser}>
        Continue with Google
      </button>
    </div>
  );
};
export default SignIn;
