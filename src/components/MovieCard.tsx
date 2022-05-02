import React, {useEffect, useState} from "react";
import {differenceInDays, fromUnixTime} from "date-fns";
import { Movie } from "../types";
import styled from "styled-components/macro";
import {constants} from "../constants";

const MovieCardWrapper = styled.div<{ bgColor: string; keyframes: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  ${({ bgColor }) => `background-color: ${bgColor};`}
  width: 400px;
  height: 100px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;

  ${({ keyframes }) => `@keyframes  ${keyframes};`}
`;

const Button = styled.button<{ btnBgColor: string }>`
    width: 100px;
  ${({ btnBgColor }) => `background-color: ${btnBgColor};`}
    color: #fff;
    padding: 5px 0;
    border-radius: 5px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const MovieTitle = styled.h4`
  font-weight: 500; 
  font-size: large;
  margin: 0;
`;

export const MovieCard: React.FC<{
    movie: Movie;
    onClick: any;
    btnTitle: string;
    bgColor: string;
    btnBgColor: string;
}>  = ({movie, onClick, btnTitle , bgColor, btnBgColor}) => {

    const [keyframes, setKeyframes] = useState<string>("");
    const [primaryBgColor, setPrimaryBgColor] = useState<string>("");

    useEffect(() => {
        setPrimaryBgColor(bgColor);
    }, []);

    const setKeyframesValues = (bgColor: string) => {
        let anime = `anime${bgColor.slice(1, bgColor.length - 1)} {`;

        for (let i = 0; i <= 10; i++) {
            let frame = `${i*10}% { background-color: ${bgColor.slice(0, -2)}${20 + i * 5} }`
            anime += frame;
            if (i === 10) {
                anime += " }";
            }
        }

        setKeyframes(anime);
    }

    return (
        <MovieCardWrapper
            bgColor={bgColor}
            keyframes={keyframes}
            onMouseOver={(e) => {
                setKeyframesValues(bgColor);
                e.currentTarget.style.animation = `anime${bgColor.slice(1, bgColor.length - 1)} 250ms linear forwards`;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.removeAttribute("style");
            }}
        >
            <MovieTitle>{movie.title}</MovieTitle>
            <span>Release date:{" "}{differenceInDays(new Date(), fromUnixTime(movie.release_date))}{" "}days ago</span>
            <ButtonWrapper>
                <Button  btnBgColor={btnBgColor} onClick={onClick}>
                    {btnTitle}
                </Button>
            </ButtonWrapper>
        </MovieCardWrapper>
    );
}
