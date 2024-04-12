import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import WarningIcon from '@mui/icons-material/Warning';
import CircularProgress from '@mui/joy/CircularProgress';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/joy/Alert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Login = () => {

    const [ numeroIntentos, setNumeroIntentos ] = useState(1);
    const [ banderaLogin, setBanderaLogin ] = useState(false);
    const [ accesso, setAcceso ] = useState(false);

    const navigate = useNavigate();

    const [ objLogin, setObjLogin ] = useState({
        usuario: '',
        contraseña: ''
    });

    useEffect( () => {
        if ( objLogin.usuario == '' ) {
            setAcceso(true);
        }
    }, []);

    const actionLogin = () => {
        if ( numeroIntentos <= 3 && objLogin.contraseña == '12345' && objLogin.usuario == 'azteca' ) {
            actionTrueLogin();
        } else {
            actionFalseLogin();
        }
    }

    const actionTrueLogin = () => {
        setBanderaLogin(true);
        setAcceso(true);
        setNumeroIntentos(0);

        setTimeout(() => {
            setBanderaLogin(false);
            setAcceso(false);
            setNumeroIntentos(0);
            navigate('/usuario');
        }, 2500);

    }

    const actionFalseLogin = () => {
        setNumeroIntentos((numeroIntentos) => numeroIntentos + 1);
        setBanderaLogin(false);
        setAcceso(false)
    }

    const loginButtonHandlerEvent = (e) => {
        setObjLogin({
            ...objLogin,
            [e.target.name]: e.target.value
        })
    }

  return (
    <div>
        <div> 
            <h1> Login </h1>

      { banderaLogin &&
        <Alert startDecorator={ <CheckCircleIcon /> } size='lg' color='success'> Inicio de Sesión Exitosamente. </Alert>
      }

        </div>
        <Grid>
            <Grid item sm={6}>
                <TextField
                    label='Usuario'
                    style={{ margin: '12px' }}
                    name='usuario'
                    onChange={ loginButtonHandlerEvent }
                />
            </Grid>

            { banderaLogin &&
                <CircularProgress variant="soft" />
            }

            <Grid item sm={6}>
                <TextField
                    label='Contraseña'
                    style={{ margin: '12px' }}
                    name='contraseña'
                    type='password'
                    onChange={ loginButtonHandlerEvent }
                />  
            </Grid>

            { !accesso &&
                <Alert startDecorator={ <WarningIcon /> } size='lg' color='danger'> Usuario Incorrecto o No Valido!. </Alert>
            }

            { numeroIntentos > 3 &&
                <Alert startDecorator={ <WarningIcon /> } size='lg' color='danger'> Contraseña Incorrecta!. </Alert>
            }

            <Grid item sm={10} marginTop={1.5}>
                <Button
                    fullWidth
                    variant='contained'
                    color='primary'
                    style={ {maxWidth:'330px'}}
                    onClick={ actionLogin }    
                    disabled={numeroIntentos > 3}
                >   Login </Button>
            </Grid>
        </Grid>
    </div>
  )
}

export default Login;