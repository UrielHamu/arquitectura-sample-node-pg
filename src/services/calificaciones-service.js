import CalificacionesRepository from '../repositories/calificaciones-repository.js';
import AlumnosService from './alumnos-service.js';
import MateriasService from './materias-service.js';

export default class CalificacionesService {

    constructor() {
        this.CalificacionesRepository = new CalificacionesRepository();
        this.AlumnosService = new AlumnosService();
        this.MateriasService = new MateriasService();
    }

    createAsync = async (entity) => {
        if (entity.nota < 0 || entity.nota > 10) {
            throw new Error('La nota debe estar entre 0 y 10');
        }
        const alumno = await this.AlumnosService.getByIdAsync(entity.id_alumno);
        if (alumno == null) {
            throw new Error('El alumno no existe');
        }
        const materia = await this.MateriasService.getByIdAsync(entity.id_materia);
        if (materia == null) {
            throw new Error('La materia no existe');
        }
        const existente =
            await this.CalificacionesRepository.getByAlumnoMateriaAsync(
                entity.id_alumno,
                entity.id_materia
            );
        if (existente != null) {
            throw new Error('Ya existe una calificación para ese alumno y materia');
        }
        return await this.CalificacionesRepository.createAsync(entity);
    }

    updateAsync = async (entity) => {
        const calificacion =
            await this.CalificacionesRepository.getByIdAsync(entity.id);
        if (calificacion == null) {
            throw new Error('La calificación no existe');
        }
        if (entity.nota != null) {

            if (entity.nota < 0 || entity.nota > 10) {
                throw new Error('La nota debe estar entre 0 y 10');
            }
        }
        return await this.CalificacionesRepository.updateAsync(entity);
    }
    

}