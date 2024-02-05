import Image from "next/image";
import { IStorageStation } from "@/app/models/IStorageStation";
import { StorageStationService } from "@/app/services/api/storage-station/StorageStationService";
import Panel from "@/app/components/Panel/Panel";
import styles from './PanelContainer.module.css';


export async function PanelContainer () {
  let result = await StorageStationService.getAll();
  let storageStations: IStorageStation[] = result;
  
  const receive = async (myName: string) => {
        console.log("O amor");
        result = await StorageStationService.getAll();
        storageStations = result;
    }

  return (
    <main>
     <div className={styles.panelWrapper}>
        {storageStations.map((storageStation: IStorageStation, index: number) => 
        <Panel key={index} callback={receive} storageStation={storageStation}/>
        )}
     </div>
    </main>
  );
}

export default PanelContainer