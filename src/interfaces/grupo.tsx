
export interface IComando {
  id: number,
  NRO?: number,
  detalle: string,
  tipo: string,
  sonido: string,
  imagen: string,
  fechaRegistro: Date,
  fechaModificacion: Date,
  usuarioRegistro: string,
  usuarioModificacion: string
};

export interface IComandoCreate {
  detalle: string,
  tipo: string,
  sonido: string,
  imagen: string
};

export interface dataApi {
  nombre: string,
  telefono1: string,
  telefono2: string,
  direccion: string,
  ci: string,
  complemento: string,
  extension: string,
  comentario: string,
  latitud: number | string,
  longitud: number | string,
}

export interface dataEditApi {
  nombre: string,
  telefono1: string,
  telefono2: string,
  direccion: string,
  extension: string,
  comentario: string,
  latitud: number | string,
  longitud: number | string,
}

export interface typeApiString {
  nombre: string,
  telefono1: string,
  telefono2: string,
  direccion: string,
  ci: string,
  complemento: string,
  extension: string,
  comentario: string,
  latitud: string,
  longitud: string,
}

export interface typeFormError {
  nombre: string,
  telefono1: string,
  telefono2: string,
  direccion: string,
  ci: string,
  complemento: string,
  extension: string,
  comentario: string,
  latitud: string,
  longitud: string,
}

export interface typeSetError {
  nombre: any,
  telefono1: any,
  telefono2: any,
  direccion: any,
  ci: any,
  complemento: any,
  extension: any,
  comentario: any,
  latitud: any,
  longitud: any,
}

export interface typeSetErrorEdit {
  nombre: any,
  telefono1: any,
  telefono2: any,
  direccion: any,
  extension: any,
  comentario: any,
  latitud: any,
  longitud: any,
}

export interface Column {
  id: "nro" | "nombre" | "doc_identidad" | "telefono" | "comentario" | "bitacora" | "registro" | "options";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}
