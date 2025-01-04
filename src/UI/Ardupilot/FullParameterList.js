import React, { useState, useEffect, useRef } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import { ParameterList } from './ParamList'
import axios from 'axios';
import { Toast } from 'primereact/toast';

export default function BasicDemo() {
    const [nodes, setNodes] = useState([]);
    const toast = useRef(null);

    const show = (message) => {
        toast.current.show({ severity: 'info', summary: 'Info', detail: message });
    };

    useEffect(() => {
        NodeService.getTreeTableNodes().then((data) => setNodes(data));
    }, []);

    const uploadParams = (params) => {
        axios.post('http://localhost:4000/upload-params',params).then((res) => {
            console.log(res)
            show(res.data.message)

        }).catch((e) => {
            console.log(e)
        })
    }

    return (
        <div className="card">
            <Toast ref={toast} />
            <TreeTable className='mb-4' value={nodes} tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Name" expander></Column>
                <Column field="size" header="Size"></Column>
            </TreeTable>
            <div>
                <span
                    onClick={() => uploadParams(nodes)}
                    className='border-2 bg-yellow-500 w-1/2 text-center p-2 hover:border-4'>
                    Upload Configuration
                </span>
            </div>
        </div>
    );
}
