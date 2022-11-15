import Meal from "./Meal";
import { useEffect, useState } from "react";

const KEY = process.env.REACT_APP_API_KEY;
let today = null;

function App() {
  const [mealData, setMealData] = useState([]);
  const [state, setState] = useState(false);

  const getMealData = async () => {
    let day = new Date();
    let year = day.getFullYear();
    let month = day.getMonth() + 1;
    let date = day.getDate();
    today =
      `${year}`.substring(2, 4) +
      `${month}` +
      `${date < 10 ? `0${date}` : date}`;
    try {
      const data = await (
        await fetch(
          `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${KEY}&Type=json&pIndex=1&pSize=1&` +
            `ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7731063&MLSV_YMD=${today}`
        )
      ).json();
      setState(true);
      setMealData(data.mealServiceDietInfo[1].row[0].DDISH_NM.split("<br/>"));
    } catch (error) {
      setState(false);
    }
  };

  useEffect(() => {
    getMealData();
  }, []);

  return (
    <div>
      <Meal state={state} mealData={mealData} today={today} />
    </div>
  );
}

export default App;
