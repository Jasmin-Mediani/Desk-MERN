import React from 'react';
import styled from 'styled-components';

const BottoneLightDark = () => {

    const Bottone = styled.button`
    
      
    `;

    return (
        <Bottone>
            <label class="switch">
                <input type="checkbox" />
                <span class="slider round"></span>
            </label>
        </Bottone>
    );
}

export default BottoneLightDark;