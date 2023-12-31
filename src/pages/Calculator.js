import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";


function Calculator  () {
    const [installV, setinstallV] = useState({
        value : "",
    });

    const onChange = (e) => {
        setinstallV({
            ...installV,
            [e.target.value] : e.target.value,
        });
    };

    return(
    <div>
        <h2>태양광 REC 가중치 계산기</h2>
        <input />
        <button>계산하기</button>
    </div>
    )
    
}

export default Calculator;