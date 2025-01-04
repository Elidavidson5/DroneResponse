import React, { useEffect } from 'react';
import axios from 'axios';


export default function ModelOptions({ options, selectedModels, setSelectedModels }) {
    const onCheckboxChange = (e, index) => {
        const newCheckedStates = [...selectedModels];
        newCheckedStates[index] = e.target.checked;
        setSelectedModels(newCheckedStates);
    };

    useEffect(() => {
        console.log('models selected', selectedModels)
        sendModels(selectedModels)
    }, [selectedModels])


    //Model sent to backend function complete
    const sendModels = (models) => {
        axios.post('http://localhost:4000/ml-models', models).then((res) => {
            console.log('res', res.data)
        }).catch((error) => {
            console.log('error', error)
        })

    }





    return (
        <div className='bg-banner-color rounded-md p-2'>
            <span className='w-full text-white font-bold'>
                Select a Machine Learning Object detection Model to run
            </span>
            {
                options.map((x, index) => (
                    <div className='text-white mt-2' key={index}>
                        <input
                            type="checkbox"
                            checked={selectedModels[index] || false}
                            onChange={(e) => onCheckboxChange(e, index)}
                            className="transform scale-150"
                        />
                        <label className='ml-2'>{x} Detection</label>
                    </div>
                ))
            }
        </div>
    );
}
