import { IStorageStation } from "../models/IStorageStation";
import { StorageStationService } from '@/app/services/api/storage-station/StorageStationService';


export class StorageHandlingService {
    static storageStations: IStorageStation[] = [];
    
    public static setStorageSations(storageStations: IStorageStation[]){
        this.storageStations = storageStations;
    }

    public static getStorageSations(): IStorageStation[]{
        return this.storageStations;
    }

    public static async syncStorageSations() {
        const res = await StorageStationService.getAll();
        const storageStations: IStorageStation[] = await res;
        this.setStorageSations(storageStations);
        return this.storageStations;
    }

    public static saveStorageStations(){
        
    }

}