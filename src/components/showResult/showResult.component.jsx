import "./showResult.styles.scss";
import { addDataToUser } from "../../utils/firebase/firebase.utils";

const ShowResult = ({ currentResult, clear }) => {
  const handleSaveData = async (e) => {
    e.preventDefault();

    const dateObj = new Date();
    const index = `${dateObj.getDate()}${dateObj.getMonth()}${dateObj.getFullYear()}${dateObj.getHours()}${dateObj.getMinutes()}${dateObj.getSeconds()}`;

    const dataToSend = { rate: currentResult, date: new Date() };

    await addDataToUser(dataToSend, index);
    clear();
  };

  return (
    <div className="container-result">
      <div className="result">
        <button className="container-btn" onClick={handleSaveData}>
          <div className="saveIcon" />
        </button>
        <h1>{currentResult} l/km</h1>
        <button onClick={clear} className="container-btn">
          <div className="removeIcon" />
        </button>
      </div>
    </div>
  );
};
export default ShowResult;
