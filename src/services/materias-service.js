import MateriasRepository from '../repositories/materias-repository.js';


export default class MateriasService {
    constructor() {
        this.MateriasRepository = new MateriasRepository();
    }

    getAllAsync = async () => {
        console.log(`MateriasService.getAllAsync()`);
        const returnArray = await this.MateriasRepository.getAllAsync();
        return returnArray;
    }

    getByIdAsync = async (id) => {
        console.log(`MateriasService.getByIdAsync(${id})`);
        const returnEntity = await this.MateriasRepository.getByIdAsync(id);
        return returnEntity;
    }

    createAsync = async (entity) => {

        if (entity.nombre == null || entity.nombre.trim() === '') {
            throw new Error('El nombre es obligatorio');
        }
        return await this.MateriasRepository.createAsync(entity);
    }
    
    updateAsync = async (entity) => {
        const materia = await this.MateriasRepository.getByIdAsync(entity.id);
        if (materia == null) {
            throw new Error('La materia no existe');
        }
        if (entity.nombre == null) {
            throw new Error('El nombre no fue ingresado');            
        }
        return await this.MateriasRepository.updateAsync(entity);
    }
    
    deleteByIdAsync = async (id) => {
        console.log(`MateriasService.deleteByIdAsync(${id})`);
        const rowsAffected = await this.MateriasRepository.deleteByIdAsync(id);
        return rowsAffected;
    }
}

