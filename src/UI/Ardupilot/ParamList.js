export const ParameterList = {

    getTreeTableNodesData() {
        return [
            {
                key: '0',
                data: {
                    name: 'ACRO',
                    size: 'Settings',
                    type: 'Folder'
                },
                children: [
                    {
                        key: '0-0',
                        data: {
                            name: 'ACRO_BAL',
                            size: 'Balance Settings',
                            type: 'Folder'
                        },
                        children: [
                            {
                                key: '0-0-0',
                                data: { name: 'PITCH', size: '1', type: 'Setting' }
                            },
                            {
                                key: '0-0-1',
                                data: { name: 'ROLL', size: '1', type: 'Setting' }
                            }
                        ]
                    },
                    {
                        key: '0-1',
                        data: {
                            name: 'ACRO_OPTIONS',
                            size: '0',
                            type: 'Folder'
                        },
                        children: []
                    },
                    {
                        key: '0-2',
                        data: {
                            name: 'ACRO_RP',
                            size: 'Rate Settings',
                            type: 'Folder'
                        },
                        children: [
                            { key: '0-2-0', data: { name: 'EXPO', size: '0.3', type: 'Setting' } },
                            { key: '0-2-1', data: { name: 'RATE', size: '360', type: 'Setting' } },
                            { key: '0-2-2', data: { name: 'RATE_TC', size: '0', type: 'Setting' } }
                        ]
                    },
                    {
                        key: '0-3',
                        data: {
                            name: 'ACRO_THR',
                            size: 'Throttle Settings',
                            type: 'Folder'
                        },
                        children: [
                            { key: '0-3-0', data: { name: 'MID', size: '0', type: 'Setting' } }
                        ]
                    },
                    {
                        key: '0-4',
                        data: {
                            name: 'ACRO_TRAINER',
                            size: '2',
                            type: 'Folder'
                        },
                        children: []
                    },
                    {
                        key: '0-5',
                        data: {
                            name: 'ACRO_Y',
                            size: 'Yaw Settings',
                            type: 'Folder'
                        },
                        children: [
                            { key: '0-5-0', data: { name: 'EXPO', size: '0', type: 'Setting' } },
                            { key: '0-5-1', data: { name: 'RATE', size: '202.5', type: 'Setting' } },
                            { key: '0-5-2', data: { name: 'RATE_TC', size: '0', type: 'Setting' } }
                        ]
                    }
                ]
            },
            {
                key: '1',
                data: {
                    name: 'AHRS',
                    size: 'AHRS Settings',
                    type: 'Folder'
                },
                children: [
                    {
                        key: '1-0',
                        data: {
                            name: 'AHRS_COMP',
                            size: 'Compass Settings',
                            type: 'Folder'
                        },
                        children: [
                            { key: '1-0-0', data: { name: 'BETA', size: '0.1', type: 'Setting' } }
                        ]
                    },
                    {
                        key: '1-1',
                        data: {
                            name: 'AHRS_EKF',
                            size: 'EKF Settings',
                            type: 'Folder'
                        },
                        children: [
                            { key: '1-1-0', data: { name: 'TYPE', size: '3', type: 'Setting' } }
                        ]
                    },
                    {
                        key: '1-2',
                        data: {
                            name: 'AHRS_GPS',
                            size: 'GPS Settings',
                            type: 'Folder'
                        },
                        children: [
                            { key: '1-2-0', data: { name: 'GAIN', size: '1', type: 'Setting' } },
                            { key: '1-2-1', data: { name: 'MINSATS', size: '6', type: 'Setting' } },
                            { key: '1-2-2', data: { name: 'USE', size: '1', type: 'Setting' } }
                        ]
                    },
                    {
                        key: '1-3',
                        data: {
                            name: 'AHRS_OPTIONS',
                            size: '0',
                            type: 'Folder'
                        },
                        children: []
                    },
                    {
                        key: '1-4',
                        data: {
                            name: 'AHRS_ORIENTATION',
                            size: '0',
                            type: 'Folder'
                        },
                        children: []
                    },
                    {
                        key: '1-5',
                        data: {
                            name: 'AHRS_RP',
                            size: 'Roll/Pitch Settings',
                            type: 'Folder'
                        },
                        children: [
                            { key: '1-5-0', data: { name: 'P', size: '0.2', type: 'Setting' } }
                        ]
                    },
                    {
                        key: '1-6',
                        data: {
                            name: 'AHRS_TRIM',
                            size: 'Trim Settings',
                            type: 'Folder'
                        },
                        children: [
                            { key: '1-6-0', data: { name: 'X', size: '-0.0267792', type: 'Setting' } },
                            { key: '1-6-1', data: { name: 'Y', size: '-0.0289324', type: 'Setting' } },
                            { key: '1-6-2', data: { name: 'Z', size: '0', type: 'Setting' } }
                        ]
                    },
                    {
                        key: '1-7',
                        data: {
                            name: 'AHRS_WIND_MAX',
                            size: '0',
                            type: 'Folder'
                        },
                        children: []
                    },
                    {
                        key: '1-8',
                        data: {
                            name: 'AHRS_YAW_P',
                            size: '0.2',
                            type: 'Folder'
                        },
                        children: []
                    }
                ]
            }
        ];
    },


    getTreeTableNodes() {
        return Promise.resolve(this.getTreeTableNodesData());
    },

    getTreeNodes() {
        return Promise.resolve(this.getTreeNodesData());
    }

};
