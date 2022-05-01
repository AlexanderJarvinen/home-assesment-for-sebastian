import React, {ChangeEvent} from "react";
import styled from "styled-components/macro";

const HeaderWrapper = styled.div`
  height: 100px;
`
const Input = styled.input`
  margin-top: 30px;
  height: 30px;
  width: 500px;
`

export const HeaderSearch: React.FC<{
   search: string;
   onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}>  = ({search , onChange }) => {
    return (
        <HeaderWrapper>
            <Input
                placeholder="Type for searcing..."
                value={search}
                onChange={onChange}
            />
        </HeaderWrapper>
    );
}
