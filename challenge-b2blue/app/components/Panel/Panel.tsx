'use client';
import styles from './Panel.module.css';
import { IStorageStation } from '@/app/models/IStorageStation';
import { StorageStationService } from '@/app/services/api/storage-station/StorageStationService';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

export const PanelPage = (props: any) => {    
    const [storageStations, setStorageStations] = useState(props.storageStations);

    const confirmPercent = async () => {
        try {
            for (let index = 0; index < storageStations.length; index++) {
                const storageStation = storageStations[index];
    
                const newPercent = parseInt(storageStation.occupied_storage_percent);
    
                if (Number.isInteger(newPercent) && newPercent !== storageStation.occupied_storage_percent) {
                        const response: any = await StorageStationService.editPercent(storageStation.id, {
                                occupied_storage_percent: newPercent,
                            });
                        if(response.status && response.status == '207' && storageStation.was_pickup_requested == false){
                            //chamar modal de aviso e solicitar coleta
                            await StorageStationService.requestPickup(storageStation.id);
                            location.reload();
                        }
                } else {
                    console.error('O valor não é um número inteiro:', storageStation.occupied_storage_percent);
                }
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

    const handleNumberChange = (value: any, index: number) => {
        const updatedStorageStations = [...storageStations];
        const newValue = value;

        updatedStorageStations[index] = {
            ...updatedStorageStations[index],
            occupied_storage_percent: newValue,
        };

        setStorageStations(updatedStorageStations);
    };

  return (
    <div className={styles.wrapper} >
        <div className={styles.stationGrid}>
            {storageStations.map((storageStation: IStorageStation, index: number) => 
            <div className={styles.stationContainer} key={index}>
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
                            <TextField type='number' value={storageStation.occupied_storage_percent} onChange={(e) => handleNumberChange(e.target.value, index)} className={styles.textfield} id="filled-basic" label="Informe o volume ocupado em porcentagem." variant="filled" />
                        </div> 
                </div>
            </div>
            )}
        </div>
        <div className={styles.buttonsFooter} >
        <Button onClick={() => confirmPercent()} className={styles.buttonStyle} variant="contained">Confirmar</Button>
        </div>
    </div>
  )
}

export default PanelPage