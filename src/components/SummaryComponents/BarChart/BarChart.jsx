import React from "react";
import { Cell,  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

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
        <div className="barchart-answers">
            <ResponsiveContainer min-height="100%">
                <BarChart data={props.Votes} className="barchart2"> 
                    <XAxis dataKey="answerText" />
                    <YAxis />
                    <Tooltip />     
                    <Bar dataKey="count" fill="#8884d8" >
                    {data01.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarChartComponent;