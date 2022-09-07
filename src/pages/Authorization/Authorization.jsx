import React, { useState } from 'react';
import styles from './styles/styles.module.css';
import Input from "@material-ui/core/Input";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { useStyles } from './styles/styles'

import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';

import { useNavigate } from "react-router-dom";
import { Login } from '../../Logica/api/Authorization';





function Authorization() {
  const classes = useStyles()
  const dispatch = useDispatch();

  let navigate = useNavigate();



  const state = useSelector(state => state.user)


  const [values, setValues] = useState({
    phoneNumber: "",
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {

    setValues({ ...values, showPassword: !values.showPassword });
  };


  const handleChangeInput = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };


  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(Login(values, navigate))


  }
  const limiter = (e) => e.target.value = e.target.value.slice(0, 10)
  const password = (e) => swal({
    title: "Зыбыли пароль?",
    text: "Обратитесь по номеру:  0500 10 10 10 !",
    icon: "error",

    dangerMode: true,
  })

  return (
    <div className={styles.PageAuthorization} >


      <div className={styles.auth} >
        <form className={styles.authForm} >

          <h1 className={styles.authForm__header} >Вход</h1>


          <div className={styles.authForm__item1}>
            <p className={styles.authForm__texst_login} > Номер телефона</p>

            <Input size="5" type='number' className={state.error !== '' ?
              classes.authForm__inputError : classes.authForm__inputCorrect}
              name='phoneNumber'
              placeholder='+996 000 000 000'
              onChange={handleChangeInput}
              onInput={limiter}
            />

          </div>



          <div className={styles.authForm__item2}>
            <p className={styles.authForm__texst_password} >Пароль</p>

            <Input className={state.error !== '' ?
              classes.authForm__inputError : classes.authForm__inputCorrect} placeholder='Пароль'
              type={values.showPassword ? "text" : "password"}
              name='password'
              onChange={handleChangeInput}

              endAdornment={

                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}

                  >{values.showPassword ? <Visibility className={classes.authForm__password_visibility} />
                    : <VisibilityOff className={classes.authForm__password_visibility} />}
                  </IconButton>
                </InputAdornment>
              } />



            <span className={styles.error}>{state.error}</span>




          </div>
          <button onClick={onSubmit} className={styles.authForm__button_disabled} >Далее</button>

          <p className={styles.forget} onClick={password}>Забыли пароль? </p>

        </form>

      </div>





    </div>
  )
}




export default Authorization;
