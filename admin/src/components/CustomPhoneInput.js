import React from 'react'
import ReactPhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import { UserAddProfileDetailsStyle } from 'views/authentication/UserAddProfileDetails.style'

function CustomPhoneInput({ name, value, onChange, height }) {
  return (

    <ReactPhoneInput
      country="us"
      specialLabel={<><span style={UserAddProfileDetailsStyle.phoneInputLabel}>Phone Number</span><span style={UserAddProfileDetailsStyle.phoneInputLabelStar}>*</span></>}
      placeholder="Enter Your Phone Number"
      enableSearch
      type="number"
      name={name}
      value={value}
      inputStyle={{
        width: '100%',
        border: '2px solid var(--darkGray)',
        height
      }}
      onChange={onChange}
      style={{ height }}
    />
  )
}

export default CustomPhoneInput
