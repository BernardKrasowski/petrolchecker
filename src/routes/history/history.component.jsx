import MileageBall from "../../components/mileageBall/mileageBall.component";
import { useSelector } from "react-redux";
import { selectCurrentData } from "../../store/data/data.selecotr";
import "./history.styles.scss";

import { removeDataFromUser } from "../../utils/firebase/firebase.utils";

const History = () => {
  const handleRemoveBall = async (e, id) => {
    const idBall = id;
    const deleteBall = e.target.parentNode;
    try {
      deleteBall.remove();
      await removeDataFromUser(idBall);
    } catch (err) {
      console.log("Problem with remove ball - history.component", err);
    }
  };

  const historyData = useSelector(selectCurrentData);

  return (
    <div className="history">
      <div className="history-mileageBall">
        {historyData.length ? (
          historyData.map(({ id, data }) => (
            <MileageBall
              removeBall={handleRemoveBall}
              key={id}
              currentData={data}
              seconds={data.date.seconds}
              id={id}
            />
          ))
        ) : (
          <>
            <h1>You have to Log In</h1>
          </>
        )}
      </div>
    </div>
  );
};
export default History;

/// redux persist  - middlewares for protect store browser refresh
