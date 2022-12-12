import React from 'react'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import IconCreate from "@mui/icons-material/AddCircleOutlineOutlined";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import Box from '@mui/material/Box';

// import useFileUpload from 'react-use-file-upload';

import {
    postService,
} from "../../service/index.service";
import {
    dataCliente,
    dataApi,
    typeFormError,
    typeSetError, extensionCI, typeApiString
} from "../../interfaces/cliente";
import {
    IOptionMap
} from "../../interfaces/general";
import Color from '../../utils/styles/Color';
import { btnDefault } from '../../utils/styles/General';
import { Divider } from '@mui/material';
import { IComando, IComandoCreate } from '../../interfaces/grupo';

interface IFormCreateProps {
    getList: () => void
}

let initDto: IComandoCreate = {
    detalle:"",
    tipo:"",
    sonido:"",
    imagen:""
};

let regexError: typeFormError = {
    nombre: "^[a-zA-ZÀ-ÿ ]{1,200}$",
    telefono1: "^[0-9 ()-]{1,15}$",
    telefono2: "^[0-9 ()-]{0,15}$",
    direccion: "^[a-zA-Z0-9 .:#ñÑ]{1,200}$",
    ci: "^[0-9]{1,10}$",
    complemento: "^[a-zA-Z0-9 ]{0,3}$",
    extension: "^[A-Z]{1,2}$",
    comentario: "^[\\w\\W\\d\\D\\t\\n]{0,300}$",
    latitud: "^[\\w\\W\\d\\D\\t\\n]{0,300}$",
    longitud: "^[\\w\\W\\d\\D\\t\\n]{0,300}$",
};


const FormCreate: React.FC<IFormCreateProps> = ({ getList }) => {
    const [open, setOpen] = React.useState(false);
    const [errorApi, setErrorApi] = React.useState<string>("");
    const [showMsgApi, setShowMsgApi] = React.useState<boolean>(false);
    const [createDto, setCreateDto] = React.useState<IComandoCreate>(initDto);
    const [file, setFile] = React.useState(null);

    const [nombreError, setNombreError] = React.useState<string>("");
    const [telefono1Error, setTelefono1Error] = React.useState<string>("");
    const [telefono2Error, setTelefono2Error] = React.useState<string>("");
    const [direccionError, setDireccionError] = React.useState<string>("");
    const [ciError, setCiError] = React.useState<string>("");
    const [complementoError, setComplementoError] = React.useState<string>("");
    const [extensionError, setEstensionError] = React.useState<string>("");
    const [latitudError, setLatitudError] = React.useState<string>("");
    const [longitudError, setLongitudError] = React.useState<string>("");
    const [comentarioError, setComentarioError] = React.useState<string>("");

    React.useEffect(() => {
    }, []);

    let tFormError: typeSetError = {
        nombre: setNombreError,
        telefono1: setTelefono1Error,
        telefono2: setTelefono2Error,
        direccion: setDireccionError,
        ci: setCiError,
        complemento: setComplementoError,
        extension: setEstensionError,
        comentario: setComentarioError,
        latitud: setLatitudError,
        longitud: setLongitudError
    };

    const textControl: typeSetError = {
        nombre: "Solo letras, maximo 200 caracteres",
        telefono1: "Solo numeros y (-)",
        telefono2: "Solo numeros y (-)",
        direccion: "Maximo 200 caracteres!",
        ci: "Solo numeros",
        complemento: "Maximo 3 caracteres!",
        extension: "Seleccione un valor",
        comentario: "Maximo 300 caracteres!",
        latitud: "Maximo 300 caracteres!",
        longitud: "Maximo 300 caracteres!"
    };

    const saveUser = () => {
        /*Object.keys(createDto).forEach(key => {
            const x = { text: key, value: createDto[key as keyof IComandoCreate] }
            onChangeInput({ 'target': { 'name': key, 'value': createDto[key as keyof IComandoCreate] } }, key)
        });
        */
        if (createDto.detalle !== "" && createDto.tipo !== "" ) {
            createDto.tipo = createDto.tipo.toLocaleUpperCase();
            createDto.detalle = createDto.detalle.toLocaleUpperCase();
            postService("/comando/create", createDto).then((result) => {
                setErrorApi(result.success ? "" : result.message);
                setShowMsgApi(!result.success);
                setOpen(!result.success);
                if (result.success) {
                    getList();
                }
            });
        } else {
            setErrorApi("Completar el formulario, porfavor.");
            setShowMsgApi(true);
        }
    };


    const onChangeInput = (event: any, input: string) => {
        let dto = createDto;
        let { value } = event.target;
        if(input == "imagen" || input =="sonido"){
            console.log(value)
            console.log("value",event.target)
            value = Buffer.from(value).toString('base64')
            console.log("value",value)
            const file = event.target.files[0];
    //const base64 = await convertBase64(file);
        }else{
            dto[input as keyof IComandoCreate] = value;
            setCreateDto(dto);
        }

        
/*
        let regex = new RegExp(regexError[input as keyof typeFormError]);
        if (regex.test(value)) {
            dto[input as keyof IComandoCreate] = value;
            setCreateDto(dto);
            tFormError[input as keyof typeSetError]("")
        } else {
            if(value.length ==0){
                tFormError[input as keyof typeSetError]("Campo "+input+" requerido!")
            }else{
                tFormError[input as keyof typeSetError](textControl[input as keyof typeSetError])
            }
        }
        */
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {

        setCreateDto(initDto);
        setOpen(true);
        setErrorApi("");
        setShowMsgApi(false);
    };



    const handleFiles = (files:any) => {
        console.log("file",files[0])
        const oFile = files[0];
        const formData = new FormData();
        // Update the formData object
        formData.append(
            "myFile",
            oFile,
            oFile.name
            );
            // Details of the uploaded file
            // console.log(this.state.selectedFile);
        console.log("formData",formData);
        let fileReader = new FileReader();
        fileReader.readAsDataURL(oFile)
        
        console.log("fileReader",fileReader);
        console.log("fileReader",fileReader.DONE);
        console.log("fileReader",fileReader.readyState);
        
        var reader = new FileReader();
        reader.onload = function(event:any) {
          // The file's text will be printed here
          const fileBin = event.target.result;
          console.log("fileBin",fileBin);
          const buffer = Buffer.from(fileBin).toString('base64');
          console.log("buffer", buffer);
          
        };
      
        reader.readAsBinaryString(oFile);
        console.log("readAsBinaryString",reader);
 
        reader.readAsText(oFile);
        console.log("readAsText",reader);
      
        reader.readAsDataURL(oFile);
        console.log("readAsDataURL",reader);
             
        reader.readAsArrayBuffer(oFile);
        console.log("readAsArrayBuffer",reader);
      
    }

    return (
        <>
            <Button
                variant="outlined"
                startIcon={<IconCreate />}
                onClick={handleClickOpen}
                style={btnDefault}
            >
                Registrar
            </Button>
            <Dialog open={open} key={'cliente-formcreate-dialog'}>
                <DialogTitle key={'cliente-formcreate-dialogtitle'}>Crear Cliente</DialogTitle>
                <DialogContent key={'cliente-formcreate-dialogcontent'}>
                    <DialogContentText>
                        Registrar todos los campos
                    </DialogContentText>
                    <Alert
                            variant="outlined"
                            severity="error"
                            style={{ display: showMsgApi ? "block" : "none" }}
                            key={'cliente-formcreate-dialog-alert'}
                        >
                            {errorApi}
                        </Alert>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }} key={'cliente-formcreate-dialog-box'}>
                        <FormControl fullWidth sx={{ m: 1 }} key={'cliente-formcreate-dialog-formcontrol-detalle'}>
                            <TextField
                                label="Detalle"
                                onChange={(e) => onChangeInput(e, "detalle")}
                                helperText={nombreError}
                                error={nombreError !== ""}
                                key={'cliente-formcreate-dialog-formcontrol-input-detalle'}
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ m: 1 }} key={'cliente-formcreate-dialog-formcontrol-tipo'}>
                            <TextField
                                label="Categoria"
                                onChange={(e) => onChangeInput(e, "tipo")}
                                helperText={nombreError}
                                error={nombreError !== ""}
                                key={'cliente-formcreate-dialog-formcontrol-input-tipo'}
                            />
                        </FormControl>
                         <TextField
                            label="Sonido"
                            sx={{ m: 1, width: '26ch' }}
                            onChange={(e) => onChangeInput(e, "sonido")}
                            helperText={telefono1Error}
                            error={telefono1Error !== ""}
                            type="file"
                            key={'cliente-formcreate-dialog-formcontrol-sonido'}
                        />
                        {/*
                        <TextField
                            label="Imagen"
                            sx={{ m: 1, width: '26ch' }}
                            onChange={(e) => onChangeInput(e, "imagen")}
                            helperText={telefono1Error}
                            error={telefono1Error !== ""}
                            type="file"
                            key={'cliente-formcreate-dialog-formcontrol-imagen'}
                        /> */}
                        <FormControl>

                        </FormControl>
                        <FormControl>
                            <Button
                            variant="contained"
                            component="label"
                            >
                            Upload File
                            <input
                                type="file"
                                hidden
                                onChange={e=> handleFiles(e.target.files)}
                            />
                            </Button>
                        </FormControl>
                                                
                    </Box>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => saveUser()}>Crear</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default FormCreate;