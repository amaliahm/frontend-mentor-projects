import { useState, useRef, useEffect, useContext } from "react";
import styled, { css } from "styled-components";
import { root, device } from "./theme";

import Card from "./components/Card";
import Details from "./pages/Details";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import SharedLayout from "./pages/SharedLayout";

import Form from "./components/Form";
import { ModalContext } from "./Context";

function App() {
  const { showModal, setShowModal, filter, setFilter, fields, setFields, data } = useContext(ModalContext);

  const refContainer = useRef(null);
  const [filteredData, setFilteredData] = useState(data);

  function handler(e) {
    e.preventDefault();
    setFilter(fields);
    setShowModal(false);
    console.log(fields);
  }

  useEffect(() => {
    let zorg = data.filter((itm) => {
      return itm.position.toLowerCase().indexOf(filter.position) > -1 || itm.company.toLowerCase().indexOf(filter.company) > -1;
    });

    let zorg1 = zorg.filter((itm) => {
      return itm.location.toLowerCase().indexOf(filter.location) > -1 && itm.contract.toLowerCase().indexOf(filter.contract) > -1;
    });

    setFilteredData(zorg1);
  }, [filter]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route
            index
            element={
              <Content>
                <S.Overlay show={showModal} />
                <Form handler={handler} refContainer={refContainer} />

                <S.Grid>
                  <Card data={filteredData} />
                </S.Grid>
              </Content>
            }
          />
          <Route path="/:id" element={<Details />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

const S = {};

let Content = styled.main`
  position: absolute;
  top: 115px;
  max-width: 1400px;
  width: 100%;
  z-index: 1;
  padding: 0 clamp(20px, 10%, 50px) 100px;
`;

S.Form = styled.form`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

S.Button = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  background-color: ${root.violet};
  color: white;
  font-weight: bold;
  font-size: 24px;
`;

const zorg = css`
  background-color: transparent;
  flex-grow: 1;
  /* border: none; */
`;

S.Input = styled.input`
  ${zorg}
`;

S.Zorg = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 200px;
  background-color: red;
  z-index: 100;
  display: none;
`;

S.Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: #00000068;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  z-index: 80;
  display: ${(prop) => (prop.show ? "flex" : "none")};
  @media ${device.tablet} {
    display: none;
  }
`;

S.Check = styled.input`
  //display: none;
`;
S.Location = styled.input`
  //display: none;
`;

S.Grid = styled.div`
  margin-top: 80px;
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  row-gap: 40px;
  /* border: 2px red solid; */
  @media ${device.tablet} {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    column-gap: 20px;
  }
`;
