import React, { useEffect } from 'react'
import Box, { BoxProps } from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from "@mui/material/FormControl";
import { LocalizationProvider, MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import Button from '@mui/material/Button';
import IconSearch from "@mui/icons-material/Search";
import { btnDefault } from '../../utils/styles/General';
import { getAuth } from '../../store/login';
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { EstadoTareaEnum } from '../../interfaces/tarea';
import { getStrFecha } from '../../config/General';


interface IFormCreateProps {
    aTipo:string[],
    getList: (params:string) => void,
}

const Filter: React.FC<IFormCreateProps> = ({ aTipo,getList }: IFormCreateProps) => {
//const Filter: React.FC<IFormCreateProps> = () => {
    const [tipo, setTipo] = React.useState<string>("");

    useEffect(() => {
        console.log(aTipo)
    }, []);

    const handleFind = () => {
        getList(tipo)
    };

    return (
        <div style={{ width: '100%' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    p: 1,
                    m: 1,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                }}
            >
                <FormControl fullWidth sx={{ m: 1, width: '150ch'}} key={'tarea-filter-tipo'}>
                            <InputLabel id="tarea-formcreate-select-tipo">Categoria</InputLabel>
                            <Select
                                labelId="tarea-formcreate-select-tipo"
                                label="Estado"
                                onChange={(e) => setTipo(e.target.value)}
                                key={'tarea-filter-estado'}
                                defaultValue="TODOS"
                            >
                                <MenuItem value={"TODOS"} key={'tarea-filter-estado-default'}>
                                    {"TODOS"} </MenuItem>
                                {aTipo.map((tipo: string, index:number) => {
                                    return (
                                        <MenuItem value={tipo} key={'tarea-filter-select-estado-'+tipo}>
                                            {tipo}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                <Button fullWidth sx={{ m: 1, width: '100ch' }} 
                    variant="outlined"
                    startIcon={<IconSearch />}
                    onClick={handleFind}
                    style={btnDefault}
                >
                    Buscar
                </Button>
            </Box>
        </div>
    )
}

export default Filter;