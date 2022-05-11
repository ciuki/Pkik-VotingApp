import React from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

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

const PieChartComponent = (props) => {
    return (
        <div className="piechart-answers">
            <ResponsiveContainer min-height="100%">
                <PieChart className="piechart2">
                    <Tooltip />
                    <Pie data={props.Votes} dataKey="count" nameKey="answerText" verticalAlign="center" align="right" outerRadius={100} fill="#8884d8" >
                        {data01.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PieChartComponent;