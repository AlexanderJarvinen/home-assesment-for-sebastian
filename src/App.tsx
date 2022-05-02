
import React, { useState } from "react";
import { constants } from "./constants";
import { Movie } from './types';
import  styled from "styled-components/macro";
import { HeaderSearch, MovieCard } from './components'

const AppContainer = styled.div`
  text-align: center;
  width: 900px;
`

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const MoveContainer = styled.div<{ borderRight?: boolean }>`
  border: 2px solid black;
  min-width: 400px;
  width: auto;
  height: 1200px;
  overflow-y: auto;
  overflow-x: hidden;
${({  borderRight }) =>  borderRight? `border-right: none` : ``}
`

const App: React.FC = () => {
  const [leftList, setLeftList] = useState<Movie[]>(constants);
  const [rightList, setRightList] = useState<Movie[]>([]);
  const [search, setSearch] = useState<string>("");

  const onAddClick = (movie: Movie) => {
    const rightArr = rightList;
    rightArr.push(movie);
    setRightList(rightArr);

    const newLeftList = leftList.filter((item) => item.id !== movie.id);
    setLeftList(newLeftList);
  };

  const onRemoveClick = (movie: Movie) => {
    const leftArr = leftList;
    leftArr.push(movie);
    setLeftList(leftArr);

    const newRightList = rightList.filter((item) => item.id !== movie.id);
    setRightList(newRightList);
  };

  return (
    <AppContainer>
      <HeaderSearch search={search} onChange={(e) => setSearch(e.target.value)}/>
      <ColumnContainer>
          <MoveContainer borderRight>
              {leftList.map((movie) => {
                  if (!movie.title.includes(search)) {
                      return false;
                  }

                  return (
                      <MovieCard
                          movie={movie}
                          onClick={() => onAddClick(movie)}
                          key={movie.id}
                          btnTitle={"Add"}
                          bgColor={'#64c86420'}
                          btnBgColor={'#00b300'}
                      />
              );
          })}
          </MoveContainer>
          <MoveContainer>
              {rightList.map((movie) => {
                  if (!movie.title.includes(search)) {
                      return false;
                  }

                  return (
                      <MovieCard
                          movie={movie}
                          onClick={() => onRemoveClick(movie)}
                          key={movie.id}
                          btnTitle={"Remove"}
                          bgColor={'#c8646420'}
                          btnBgColor={'#cc0000'}
                      />
                  );
              })}
          </MoveContainer>
      </ColumnContainer>
    </AppContainer>
  );
}

export default App;
