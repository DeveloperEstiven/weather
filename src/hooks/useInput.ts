import React, { useState } from 'react'

type InputReturn = {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const useInput = (initialValue: string): InputReturn => {
  const [value, setValue] = useState(initialValue)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return {
    value,
    onChange,
  }
}

export default useInput
