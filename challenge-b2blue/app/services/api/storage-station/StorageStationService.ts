import { Api } from "../ApiConfig";
import { IStorageStation } from "@/app/models/IStorageStation";
import { ApiException } from "../ApiException";

const getAll = async (): Promise<IStorageStation[]> =>  {
    try{
        const { data } = await Api().get('/storage-station/list');
        return data;
    } catch (error: any) {
        throw new ApiException(error.message || 'Erro ao consultar listagem API');
    }
}

const getById = async (id: number): Promise<IStorageStation | ApiException> =>  {
    try{
        const { data } = await Api().get('/storage-station/detail/'+id);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao consultar estação na API');
    }
}

const editPercent = async (id: number, body: any): Promise<IStorageStation | ApiException> => {
    try {
        const { data } = await Api().put('/storage-station/'+id+'/percent/', body);
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao alterar porcentagem de armazenamento.');
    }
}


const requestPickup = async (id: number): Promise<IStorageStation | ApiException> =>  {
    try{
        const { data } = await Api().put('/pickup/'+id+'/request');
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao solicitar coleta.');
    }
}

const confirmPickup = async (id: number): Promise<IStorageStation | ApiException> =>  {
    try{
        const { data } = await Api().put('/pickup/'+id+'/confirm');
        return data;
    } catch (error: any) {
        return new ApiException(error.message || 'Erro ao confirmar coleta');
    }
}



export const StorageStationService = {
    getAll,
    getById,
    editPercent,
    requestPickup,
    confirmPickup
};