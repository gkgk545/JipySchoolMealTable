import "./reset.css";
import styled from "styled-components";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 0, 0.5);
  font-family: "Hahmlet", serif;
`;

const Title = styled.h1`
  font-size: 60px;
  font-weight: 800;
  margin-bottom: 5vh;
`;

const Table = styled.div`
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Menu = styled.span`
  font-size: 50px;
`;

const Meal = ({ state, mealData }) => {
  return (
    <Background>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Hahmlet:wght@400;800&display=swap');
      </style>
      <Title>
        지평초 오늘({new Date().getMonth() + 1}월 {new Date().getDate()}일)의
        식단
      </Title>
      <Table>
        {state ? (
          mealData.map((item) => (
            <div key={Math.random()}>
              <Menu>
                {item.replace(/(0|1|2|3|4|5|6|7|8|9|@|\*|\.|\(|\))/g, "")}
              </Menu>
              <br />
            </div>
          ))
        ) : (
          <div>
            <Title>오늘은 급식을 하지 않습니다...</Title>
          </div>
        )}
      </Table>
    </Background>
  );
};

export default Meal;
