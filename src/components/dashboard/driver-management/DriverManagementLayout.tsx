import React from 'react'
import DriverDataTable from './DriverDataTable'
import SmallPageInfo from '@/components/common/smallPageInfo/smallPageInfo'
import DriverStats from './DriverStats'

function DriverManagementLayout() {
    return (
        <div className='space-y-4'>
            <SmallPageInfo
                title="Driver Management"
                description="Manage your drivers and their information."
            />
            <DriverStats />
            <DriverDataTable />
        </div>
    )
}

export default DriverManagementLayout