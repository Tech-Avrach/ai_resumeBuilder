import { SignIn } from '@clerk/clerk-react'
import React from 'react'

function SignInPage() {
  return (
    <div className='flex items-center my-20 justify-center'>
      <SignIn />
    </div>
  )
}

export default SignInPage