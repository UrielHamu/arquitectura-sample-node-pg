import MateriasRepository from '../repositories/materias-repository.js';


export default class MateriasService {
    constructor() {
        this.MateriasRepository = new MateriasRepository();
    }

    createAsync = async (entity) => {

        if (!entity.nombre || entity.nombre.trim() === '') {
            throw new Error('El nombre es obligatorio');
        }
        return await this.MateriasRepository.createAsync(entity);
    }
    
}

