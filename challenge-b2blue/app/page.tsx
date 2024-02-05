import Image from "next/image";
import { IStorageStation } from "./models/IStorageStation";
import { StorageStationService } from "./services/api/storage-station/StorageStationService";
import Panel from "./components/Panel/Panel";

export async function Home () {
  const result = await StorageStationService.getAll();
  const storageStations: IStorageStation[] = await result;

  
  return (
    <main>{storageStations.length > 0 &&
      (<Panel storageStations={storageStations} />)
      }
    </main>
  );
}

export default Home