import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Grid, IconButton, LinearProgress, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import { SessionDto } from '../../interfaces/store';
import { getService } from '../../service/index.service';
import { getAuth } from '../../store/login';

import FormCreate from "./FormCreate"
import Filter from "./Filter"
import { IComando } from '../../interfaces/grupo';
import { getFecha, getStrFecha } from '../../config/General';
import { useNavigate } from 'react-router-dom';
import { RouterPathEnum } from '../../enums/RouterPathEnum';


function Home() {
  const [dataList, setDataList] = React.useState<IComando[]>([]);
  const [aTipo, setATipo] = React.useState<string[]>([]);
  const [tipo, setTipo] = React.useState<string>("");
  let navigate = useNavigate();

  React.useEffect(() => {
    getTipo()
    getList("")
  }, []);

  const getTipo = () => {
    const user = getAuth();
    getService(`/comando/listTipo`, {}).then((result) => {
      if (result.success) {
        console.log(result.data)
        setATipo(result.data)
      }
    }).catch(() => {
      console.error("error de carga de usuario")
    });
  };

  const getList = (param:string) => {
    getService(`/comando/list/${param}`, {}).then((result) => {
      if (result.success) {
        const list = result.data as IComando[];
        console.log("grupoList", result)
        setDataList(list);
      }
    }).catch(() => {
      console.error("error de carga de usuario")
    });
  };

  return (
    <>

      <Grid container component="main" justifyContent={'space-between'} >
        <Typography variant="h4" component="h4">
          Consonantes
        </Typography>
        <FormCreate />
      </Grid>
      <hr />
      <Filter aTipo={aTipo} getList={getList} />

      <Box sx={{ width: '100%' }} style={{ display: dataList.length == 0 ? 'block' : 'none' }}>
        <LinearProgress />
      </Box>
      <Grid container spacing={3}>
        {
          dataList.map((grupo, i) => (
            <Grid item xs={3} key={"grid-" + i}>
              <Card sx={{ minWidth: 100 }} key={"card-" + i}>
                <CardHeader
                  action={
                    <IconButton aria-label="settings">
                    </IconButton>
                  }
                  title={grupo.detalle}
                  subheader={grupo.tipo}
                />
                <CardContent key={"card-content" + i}>
                  <Typography variant="body2" key={"card-content-contenido" + i}>
                  </Typography>
                </CardContent>
                <CardActions key={"card-content-action" + i}>
                  <Button size="small" key={"card-content-button" + i} onClick={() => console.log("test")}>Ingresar</Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        }
      </Grid>
    </>

  );
}

export default Home;
