import React from 'react';

import styled from 'styled-components';

const Styles = styled.div`
    .ok {
        font-size: 1rem;
        margin: 5px 2px;
        padding: 8px;
        border: 1px solid;
        border-radius: 5px;
        justify-content: center;
        color: #099409;
        background-color: #c2ffc2;
        border-color: #01e201;
    }
    .error {
        font-size: 1rem;
        margin: 5px 2px;
        padding: 8px;
        border: 1px solid;
        border-radius: 5px;
        justify-content: center;
        color: #a90808;
        background-color: #ffc2c2;
        border-color: #e20101;
    }
`;

const Message = ({ response }) => {
    // console.log(response.data.message)
    if ((response.status === 200) || (response.status === 201) || (response.status === 204)) {
        
        return (
            <Styles>
                <div className="ok"> 🟢 {response.data.message}</div>
            </Styles>
        )
    }
    return (
        <Styles>
            <div className="error">🛑{response.data.message}
            Ha ocurrido un error
             <a href="mailto:julian.pizarro@invemar.org.co">
            julian.pizarro@invemar.org.co</a>
            </div>
        </Styles>
    );
};

export default Message;
