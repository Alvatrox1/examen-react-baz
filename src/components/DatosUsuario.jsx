import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/joy/CircularProgress';
import Alert from '@mui/joy/Alert';
import WarningIcon from '@mui/icons-material/Warning';

import DataUsuarios from '../js/UsuariosData';

const Registro = () => {

  const [ usuario, setUsuario ] = useState({
    nombre : '',
    apPaterno : '',
    apMaterno : ''
  });
  const [ spinnerFlag, setSpinnerFlag ] = useState(false);
  const [ invalidId, setInvalidId ] = useState(false);

  const dataUsuarios = DataUsuarios;

  const idHandlerEvent = (e, id) => {
    if ( id > 0 ) {
      setSpinnerFlag(true);
      setTimeout(() => {
        const usuarioEncontrado = dataUsuarios.filter( (user) => id === user.id);
        setSpinnerFlag(false);
        setUsuario(usuarioEncontrado[0]);
      }, 2800);
      setInvalidId(false);
    }

    if ( id > 5 ) {
      setTimeout(() => {
      setInvalidId(true);
      setUsuario({
        nombre : '',
        apPaterno : '',
        apMaterno : ''
      });
      }, 2800);
    } else {
      setInvalidId(false);
    }
  }

  return (
    <div>
      <h1> Datos Usuario </h1>

      <div> 
        <Grid>
          <Grid item>
            <TextField
              label='ID :'
              style={{ margin: '12px' }}
              name='id'
              type='number'
              onChange={ e => idHandlerEvent(e, e.target.value) }
            /> 
          </Grid>

          <Grid item>
            <TextField
                label='Nombre :'
                style={{ margin: '12px' }}
                name='nombre'
                // shrink="true"
                value={usuario.nombre}
                disabled
            /> 
          </Grid>

          { spinnerFlag &&
            <CircularProgress variant="soft" />
          }

          <Grid item>
            <TextField
                label='Apellido Paterno :'
                style={{ margin: '12px' }}
                name='apMaterno'
                // shrink="true"
                value={usuario.apPaterno}
                disabled
            /> 
          </Grid>

          <Grid item>
            <TextField
                label='Apellido Materno :'
                style={{ margin: '12px' }}
                name='apMaterno'
                // shrink="true"
                value={usuario.apMaterno}
                disabled
            /> 
          </Grid>
        </Grid>


        { invalidId &&
                <Alert startDecorator={ <WarningIcon /> } size='lg' color='danger'> ID No Valido!. </Alert>
            }

      </div>
    </div>
  )
}

export default Registro