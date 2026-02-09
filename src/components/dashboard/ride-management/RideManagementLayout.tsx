import SmallPageInfo from "@/components/common/smallPageInfo/smallPageInfo"
import RideStats from "./RideStats"
import RideDataTable from "./RideDataTable"


function RideManagementLayout() {
    return (
        <div className='space-y-4'>
            <SmallPageInfo
                title="Ride Management"
                description="Manage your rides and their information."
            />
            <RideStats />
            <RideDataTable />
        </div>
    )
}

export default RideManagementLayout