import React from 'react'
import AccountInfo from '../../components/User/AccountInfo.jsx'
import AccountSidebar from '../../components/User/AccountSidebar.jsx'

function AccountInfoPage() {
  return (
    <>
      < div className="flex min-h-screen bg-white text-gray-800 mt-16 font-vietnam" >
        <AccountSidebar />
        <AccountInfo />
      </div>
    </>
  )
}

export default AccountInfoPage