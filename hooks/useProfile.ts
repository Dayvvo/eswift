import React, { useCallback } from 'react'
import { useApiUrl } from './useApi'

const useProfile = () => {

  const client = useApiUrl();

  const getProfile = useCallback(() => {
    // const req = client.query()
  }, [])
  
  return {
    
  }
}

export default useProfile