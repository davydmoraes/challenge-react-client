'use client';
import React from 'react'

import { StorageHandlingService } from '@/app/services/StorageHandlingService';




const ConfirmPercent = () => {
  function confirmPercent(){
    StorageHandlingService.saveStorageStations();
  }
  return (
    <div>
    </div>
  )
}

export default ConfirmPercent