import React from "react";
import { Cell, Legend, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF2F30', '#FF12FF', '#8884d8'];
const data01 = [
    {
        "name": "Group A",
        "value": 400
    },
    {
        "name": "Group B",
        "value": 300
    },
    {
        "name": "Group C",
        "value": 300
    },
    {
        "name": "Group D",
        "value": 200
    },
    {
        "name": "Group E",
        "value": 278
    },
    {
        "name": "Group F",
        "value": 189
    }
];

const BarChartComponent = (props) => {
    return (
        <div className="answers">
            <div className="barchart">
                <BarChart width={730} height={250} data={props.Votes} className="barchart2"> 
                    <XAxis dataKey="answerId" />
                    <YAxis />
                    <Tooltip />     
                    <Bar dataKey="count" fill="#8884d8" >
                    {data01.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
                    </Bar>
                </BarChart>
            </div>
        </div>
    );
};

export default BarChartComponent;