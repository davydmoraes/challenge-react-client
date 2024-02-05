'use client';
import styles from './Panel.module.css';
import { IStorageStation } from '@/app/models/IStorageStation';
import { StorageStationService } from '@/app/services/api/storage-station/StorageStationService';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

export const Panel = (props: any) => {    
    const [storageStation, setStorageStation] = useState(props.storageStation);
    const [newStorageValue, setNewStorageValue] = useState(props.storageStation.occupied_storage_percent);


    const confirmPercent = async () => {
        if(props.callback){
            props.callback('Sou eu')
          }
        try {    
                const newPercent = parseInt(newStorageValue);
    
                if (Number.isInteger(newPercent)) {
                    if(newPercent !== storageStation.occupied_storage_percent){
                        const response: any = await StorageStationService.editPercent(storageStation.id, {
                                occupied_storage_percent: newPercent,
                            });
                        if(response.status && response.status == '207' && storageStation.was_pickup_requested == false){
                            //chamar modal de aviso e solicitar coleta
                            await StorageStationService.requestPickup(storageStation.id);
                        }
                        location.reload();
                    }
                } else {
                    console.error('O valor não é um número inteiro:', storageStation.occupied_storage_percent);
                }
            
        } catch (error) {
            console.error('Erro ao editar a porcentagem:', error);
        }
    };
    

    function confirmPickup(storageStation: any){
        StorageStationService.confirmPickup(storageStation.id).then(
            (result: any) => {
                location.reload();
            }
        );
    }


    /*const handleNumberChange = (value: any) => {
        let updatedStorageStation = storageStation;
        const newValue = value;
        updatedStorageStation = {
            ...updatedStorageStation,  
            occupied_storage_percent: newValue,
        }

        setStorageStation(updatedStorageStation);
    };*/

    const handleNumberChange = (value: any) => {
        let updatedValue = newStorageValue;
        const newValue = value;

        updatedValue = newValue;

        setNewStorageValue(updatedValue);
    }


  return (
    <div className={styles.wrapper} >
        <div className={styles.stationGrid}>
            <div className={styles.stationContainer}>
                <div className={styles.storageStationContainer}>
                <div className={styles.storageStation}>
                        {storageStation.was_pickup_requested && (<div className={styles.pickupWarning}>
                            <div className="warningContent">
                            A coleta para esta estação foi solicitada. Esta coleta já ocorreu?
                            </div>
                            <Button onClick={() => {confirmPickup(storageStation)}}
                                className={styles.buttonStyle} variant="contained">Confirmar Coleta</Button> 
                        </div>)
                        }
                        <span className='percentage'>
                            {storageStation.occupied_storage_percent}%
                        </span>
                        </div> 
                            <div className={styles.textfieldContainer}>
                            <TextField type='number' value={newStorageValue} onChange={(e) => handleNumberChange(e.target.value)} className={styles.textfield} id="filled-basic" label="Informe o volume ocupado em porcentagem." variant="filled" />
                        </div> 
                </div>
            </div>
        </div>
        <div className={styles.buttonsFooter} >
        <Button onClick={() => confirmPercent()} className={styles.buttonStyle} variant="contained">Confirmar</Button>
        </div>
    </div>
  )
}

export default Panel