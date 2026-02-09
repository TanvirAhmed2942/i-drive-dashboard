import React from 'react'

import SmallPageInfo from '@/components/common/smallPageInfo/smallPageInfo'
import PassengerDataTable from './PassengerDataTable'

function PassengerManagementLayout() {
    return (
        <div className='space-y-4'>
            <SmallPageInfo
                title="Passenger Management"
                description="Manage your passengers and their information."
            />
            <PassengerDataTable />
        </div>
    )
}

export default PassengerManagementLayout