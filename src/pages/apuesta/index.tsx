import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Grid, IconButton, LinearProgress, makeStyles, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import StarIcon from '@mui/icons-material/StarBorder';
import SkipPrevious from '@mui/icons-material/SkipPrevious';
import SkipNext from '@mui/icons-material/SkipNext';

import { SessionDto } from '../../interfaces/store';
import { getService } from '../../service/index.service';
import { getAuth } from '../../store/login';

import FormCreate from "./FormCreate"
import Filter from "./Filter"
import { IComando } from '../../interfaces/grupo';
import { getFecha, getStrFecha } from '../../config/General';
import { useParams } from 'react-router-dom';

function Home() {
  let { idGrupo } = useParams();
  const [dataList, setDataList] = React.useState<IComando[]>([]);


  React.useEffect(() => {

    console.log("grupo", idGrupo)
    getList()
  }, []);

  const getList = () => {
    const user = getAuth();
    getService(`/grupo/list/${user.username}`, {}).then((result) => {
      if (result.success) {
        const userList = result.data as IComando[];
        console.log("grupoList", userList)
        setDataList(userList);
      }
    }).catch(() => {
      console.error("error de carga de usuario")
    });
  };

  return (
    <>

      <Grid container component="main" justifyContent={'space-between'} >
        <Typography variant="h4" component="h4">
          COMANDOS
        </Typography>
        <FormCreate />
      </Grid>
      <hr />
      <Filter />

      <Box sx={{ width: '100%' }} style={{ display: dataList.length == 0 ? 'block' : 'none' }}>
        <LinearProgress />
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={4} sm={6} md={6}>
          <Toolbar>
            <IconButton edge="start" style={{marginRight: 2}} color="inherit" aria-label="menu">
              <SkipPrevious />
            </IconButton>
            <Typography variant="h5" style={{flexGrow: 1,textAlign:'center'}}>
              QATAR vs ECUADOR
              <br/>
              23/11/2022
            </Typography>
            <IconButton edge="start" style={{marginRight: 2}} color="inherit" aria-label="menu">
              <SkipNext />
            </IconButton>
          </Toolbar>
          <Card>
            <CardContent>
              <IconButton edge="start" style={{marginRight: 2}} color="inherit" aria-label="menu">
                <SkipPrevious />
              </IconButton>
              <Typography variant="h5" style={{flexGrow: 1,textAlign:'center'}}>
                QATAR vs ECUADOR
                <br/>
                23/11/2022
              </Typography>
              <IconButton edge="start" style={{marginRight: 2}} color="inherit" aria-label="menu">
                <SkipNext />
              </IconButton>
            </CardContent>
            <CardContent>
              <div >
                <Typography component="h2" variant="h3" color="textPrimary">
                  ${"tier.price"}
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  /mo
                </Typography>
              </div>
              <ul>
                <Typography component="li" variant="subtitle1" align="center" key={"line"}>
                  {"line"}
                </Typography>
              </ul>
            </CardContent>
            <CardActions>
              <Button fullWidth variant={'outlined'} color="primary">
                {"tier.buttonText"}
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={4} sm={6} md={6}>
          <Card>
            <CardHeader
              title={"titulo"}
              subheader={"tier.subheader"}
              titleTypographyProps={{ align: 'center' }}
              subheaderTypographyProps={{ align: 'center' }}
              action={<StarIcon />}
            />
            <CardContent>
              <div >
                <Typography component="h2" variant="h3" color="textPrimary">
                  ${"tier.price"}
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  /mo
                </Typography>
              </div>
              <ul>
                <Typography component="li" variant="subtitle1" align="center" key={"line"}>
                  {"line"}
                </Typography>
              </ul>
            </CardContent>
            <CardActions>
              <Button fullWidth variant={'outlined'} color="primary">
                {"tier.buttonText"}
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
