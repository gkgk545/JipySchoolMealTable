import { useEffect, useState } from "react";

const KEY = process.env.REACT_APP_API_KEY;

const Meal = () => {
  const [mealData, setMealData] = useState([]);
  const [state, setState] = useState(false);

  let day = new Date();
  let year = day.getFullYear();
  let month = day.getMonth() + 1;
  let date = day.getDate();
  let today =
    `${year}`.substring(2, 4) + `${month}` + `${date < 10 ? `0${date}` : date}`;

  const getMealData = async () => {
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
      <h1>지평초 오늘의 식단</h1>
      {state ? (
        mealData.map((item) => (
          <div key={Math.random()}>
            <h2>{item.replace(/(0|1|2|3|4|5|6|7|8|9|@|\*|\.|\(|\))/g, "")}</h2>
            <br />
          </div>
        ))
      ) : (
        <div>
          <h1>오늘은 급식을 하지 않습니다...</h1>
        </div>
      )}
    </div>
  );
};

export default Meal;
