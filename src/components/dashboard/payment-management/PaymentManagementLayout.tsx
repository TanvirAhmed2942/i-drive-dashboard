import SmallPageInfo from "@/components/common/smallPageInfo/smallPageInfo"
import PaymentStats from "./PaymentStats"
import CommissionBreakDown from "./CommissionBreakDown"
import PaymentDataTable from "./PaymentDataTable"


function PaymentManagementLayout() {
    return (
        <div className='space-y-4'>
            <SmallPageInfo
                title="Payment Management"
                description="Manage your payments and their information."
            />
            <PaymentStats />
            <PaymentDataTable />
            <CommissionBreakDown />
        </div>
    )
}

export default PaymentManagementLayout