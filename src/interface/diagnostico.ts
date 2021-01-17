export interface Diagnostico {
    id?: number;
    idEquipo: number;
    fechaRecepcion?: Date | string;
    fechaSalida?: Date | string;
    explicacion: string;
    observacion: string;
    diagnostico?: string;
    estado?: string;
}