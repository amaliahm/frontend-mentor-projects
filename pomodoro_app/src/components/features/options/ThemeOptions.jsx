import React from "react";
import styled from "styled-components";
import { circleHover, root, styledSettingTitle } from "../../../styled";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "./tempOptionsSlice";
import ArrowSVG from "../../../assets/check.svg?react";

let arr = [root.theme_color.red, root.theme_color.cyan, root.theme_color.purple];

export default function ThemeOptions() {
  const theme = useSelector((state) => state.tempOptions.theme);
  const font = useSelector((state) => state.timer.font);
  const dispatcher = useDispatch();

  return (
    <S.Container>
      <S.Title font={font}>COLOR</S.Title>
      <div className="circles">
        {arr.map((e, i) => {
          return (
            <S.Circle key={i} bg={e} onClick={() => dispatcher(setTheme(e))}>
              <ArrowIcon opacity={theme == e ? 1 : 0} />
            </S.Circle>
          );
        })}
      </div>
    </S.Container>
  );
}

const S = {};

const ArrowIcon = styled(ArrowSVG)`
  transition: opacity ${root.ms}s;
`;

S.Title = styled.h1`
  ${styledSettingTitle}
  font-family: ${(props) => props.font};
`;

S.Container = styled.div`
  width: 100%;
  padding: 16px 0 59px 0;
  display: flex;
  gap: 16px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  border-top: 1px solid #e3e1e1;

  @media only screen and (min-width: ${root.media.tablet}px) {
    flex-flow: row nowrap;
    justify-content: space-between;
    padding: 24px 0 59px 0;
  }

  .circles {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }
`;
S.Circle = styled.div`
  background-color: ${(prop) => prop.bg};
  ${circleHover}
`;