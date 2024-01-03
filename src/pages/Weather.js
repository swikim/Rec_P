import React from "react";
import { useState } from "react";
import { Card ,Text, Metric } from "@tremor/react";

function Weather (){
    return(
        <Card className="max-w-xs mx-auto">
            <Text>Sales</Text>
            <Metric>$34,444</Metric>
        </Card>
    )
    

}

export default Weather;