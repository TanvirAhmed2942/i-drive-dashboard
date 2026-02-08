import React from 'react'
import DriverDataTable from './DriverDataTable'
import SmallPageInfo from '@/components/common/smallPageInfo/smallPageInfo'

function DriverManagementLayout() {
    return (
        <div className='space-y-4'>
            <SmallPageInfo
                title="Driver Management"
                description="Manage your drivers and their information."
            />
            <DriverDataTable />
        </div>
    )
}

export default DriverManagementLayout