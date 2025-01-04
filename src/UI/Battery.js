import React from 'react';

function Battery({ percentage }) {

    const validPercentage = Math.max(0, Math.min(100, percentage));
    const fillColor = validPercentage > 25 ? 'green' : 'red';
    const fillWidth = `${validPercentage}%`;

    return (
        <div className="flex items-center">

            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="25"
                viewBox="0 0 50 25"
                className="mr-2"
            >
                <rect
                    x="0"
                    y="5"
                    width="40"
                    height="15"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                    rx="3"
                    ry="3"
                />
                <rect
                    x="40"
                    y="10"
                    width="5"
                    height="5"
                    fill="black"
                    rx="1"
                    ry="1"
                />
                <rect
                    x="1"
                    y="6"
                    width="38"
                    height="13"
                    fill={fillColor}
                    style={{ width: fillWidth }}
                    rx="2"
                    ry="2"
                />
            </svg>

            <span className="text-black font-bold">{validPercentage}%</span>
        </div>
    );
}

export default Battery;
