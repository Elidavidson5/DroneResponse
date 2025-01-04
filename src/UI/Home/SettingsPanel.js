import React, { useState, useRef } from 'react'
import { Toast } from 'primereact/toast'
import axios from 'axios'

export default function SettingsPanel({ options }) {

    const toast = useRef(null)

    const show = (message) => {
        toast.current.show({ severity: 'info', summary: 'Mission Status', detail: message, life: 3000 });
    }

    const abort_mission = () => {
        axios.get('http://localhost:4000/abort-mission')
            .then((res) => {
                console.log(res)
                show(res.data.message)
            })
            .catch((error) => {
                console.log(error)
                show(error.response ? error.response.data.message : 'Error aborting mission')
            })
    }

    const start_mission = () => {
        axios.get('http://localhost:4000/start-mission')
            .then((res) => {
                console.log(res)
                show(res.data.message)
            })
            .catch((error) => {
                console.log(error)
                show(error.response ? error.response.data.message : 'Error starting mission')
            })
    }

    return (
        <div className='grid bg-banner-color h-auto text-center text-white'>
            <Toast ref={toast} />
            <div className='items-center flex'>
                {
                    options.map((option, index) =>
                        <span
                            key={index}
                            onClick={() => {
                                if (option === 'Start Mission') {
                                    start_mission();  
                                } else if (option === 'Abort Mission') {
                                    abort_mission();  
                                } else if (option === 'Manual Mission') {
                                    console.log('manual')
                                } else {
                                    console.log('autonomous')
                                }
                            }}
                            className='mx-2 my-2 rounded-md grid bg-space-between-border w-1/4 h-10 items-center hover:border-2'>
                            {option}
                        </span>
                    )
                }
            </div>
        </div>
    )
}
