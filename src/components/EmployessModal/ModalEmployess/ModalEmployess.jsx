import { useEffect, useState } from 'react';
import styles from './styles/ModalEmployess.module.css';
import {
  DropDownHeader, DropDownList, DropDownListSmena, DropDownListSalary, ListItem,
  ListItemSmenaSalary, ListItemSmena
} from './styles/TabsCss';
import ArrowDown from './icons/ArrowDown.svg';
import ArrowTop from './icons/ArrowUp.svg';
import { Update_employess_data, Delete_employess_data } from '../../../Logica/api/Employees'
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';




const options = ["Флорист", "Курьер", "Админ"];
const salaryDays = ['Cегодня', 'Последние 24 часа', 'Последние 7 дней', 'Последние 30 дней', 'Последние 90 дней', 'Последние 6 мес']
const optionSmena = [{ day: 'Днем', time: '8:00 - 20:00' }, { day: 'Вечером', time: '20:00 - 8:00' }]


function ModalDataEmployess({ active, setActive, active1, type }) {
  const dispatch = useDispatch();

  console.log("EmoloyessType: ", type)
  const [set, setSet] = useState(active1.status)




  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(active1.role);

  const [isOpenSmena, setIsOpenSmena] = useState(false);
  const [selectedOptionSmena, setSelectedOptionSmena] = useState(active1.workShift);
  const [isOpenSalary, setIsOpenSalary] = useState(false)
  const [selectSalaryDays, setSelectSalaryDays] = useState(null)

  const toggling = () => setIsOpen(!isOpen);
  const togglingSmena = () => setIsOpenSmena(!isOpenSmena)
  const togglingSalary = () => setIsOpenSalary(!isOpenSalary)

  const onOptionClicked = value => {
    setSelectedOption(value);
    setIsOpen(false);

  };
  const onOptionClickedSalary = value => () => {
    setSelectSalaryDays(value)
    setIsOpenSalary(false)
  }


  const onOptionClickedSmena = value => () => {
    setSelectedOptionSmena(value.time);
    setIsOpenSmena(false);

  };

  function Delete(id) {
    dispatch(Delete_employess_data(id, type))
    setActive({ d: false, s: null })
  }


  return (

    <div className={active ? styles.active : styles.modal}  >


      <div className={styles.modal__content}   >


        <Formik
          initialValues={{
            id: active1.id,
            name: active1.name,
            surname: active1.surname,
            password: '',
            phoneNumber: active1.phoneNumber,
            role: active.role,
            image: active1.image,
            status: active1.status,
            salary: Number(active1.salary),
            workShift: active1.workShift,
            creationDate: active1.creationDate




          }}
          onSubmit={values => {
            values.role = selectedOption

            values.workShift = selectedOptionSmena
            values.salary = Number(values.salary)

            if (values.salary === active1.salary) {

              dispatch(Update_employess_data(values, type))
              setActive({ d: false, s: null })

            } else {
              values.creationDate = new Date()
              dispatch(Update_employess_data(values, type))
              setActive({ d: false, s: null })

            }

          }}>
          {({ values, isValid, dirty }) => (


            <Form>

              <div className={styles.modal__content_photo}>
                <img width={"184px"} name='image' alt='not find icon' height={"183px"}
                  className={styles.humnanIcon} src={values.image} />

              </div>



              <div className={styles.modal__content_crossIcon} >  </div>

              <div className={styles.modal__content_form} >

                <div className={styles.modal__content_data}>
                  <p className={styles.modal__content_Name}>Имя</p>

                  <Field
                    placeholder='Имя' name='name' type='text' value={values.name}
                    className={styles.modal__content_form_input}
                  />
                </div>

                <div className={styles.modal__content_data}>

                  <p className={styles.modal__content_Name}>Фамилия</p>
                  <Field
                    placeholder='Фамилия' type='text' name='surname' value={values.surname}
                    className={styles.modal__content_form_input}

                  />
                </div>


                <div className={styles.modal__content_data}>
                  <p className={styles.modal__content_Name}>Тел. номер:</p>
                  <input value={active1.phoneNumber} name='phoneNumber' readOnly
                    placeholder='Введите номер телефона' type='text'
                    className={styles.modal__content_form_input}


                  />
                </div>

                <div className={styles.modal__content_data}>
                  <p className={styles.modal__content_Name}>Пароль </p>
                  <Field name='password' type='text'
                    placeholder='Введите новый  пароль' value={values.password}
                    className={styles.modal__content_form_input}

                  />
                </div>


                <div className={styles.modal__content_data}>
                  <p className={styles.modal__content_Name}>Зарплата</p>
                  <Field name='salary' type='text'
                    className={styles.modal__content_form_input}
                    values={values.salary} placeholder='****сом'
                  />
                  <p className={styles.dataSalary} >Последнее изменение  {[new Date(active1.creationDate).getDate(), new Date(active1.creationDate).getMonth() + 1,
                  new Date(active1.creationDate).getFullYear()].map(x => { return x < 10 ? "0" + x : x }).join(".")}   </p>

                </div>
                <p className={styles.modal__content_Name1}>Должность</p>

                <div className={styles.DropDownContainer}>

                  <DropDownHeader onClick={toggling}>
                    {isOpen ? <img src={ArrowTop} alt='Not find ArrowDownIcon' className={styles.Arrow} /> : <img src={ArrowDown} className={styles.Arrow} alt='Not find ArrowTopIcon' />}
                    {selectedOption || "Должность"}
                  </DropDownHeader>
                  {isOpen && (
                    <div>
                      <DropDownList >
                        {options.map(option => (
                          <ListItem name='role' onClick={() => onOptionClicked(option)} key={Math.random()}>
                            {option}
                          </ListItem>
                        ))}
                      </DropDownList>

                    </div>
                  )}

                </div>





                <p className={styles.date} style={{ opacity: 0 }} > Дата </p>
                <div style={{ opacity: 0 }} className={styles.DropDownContainerSalary} >
                  <DropDownHeader onClick={togglingSalary}>
                    {isOpenSalary ? <img src={ArrowTop} alt='Not find ArrowDownIcon' className={styles.Arrow} /> : <img src={ArrowDown} className={styles.Arrow} alt='Not find ArrowTopIcon' />}
                    {selectSalaryDays || "Последние 7 дней"}
                  </DropDownHeader>
                  {isOpenSalary && (
                    <div>
                      <DropDownListSalary>
                        {salaryDays.map(option => (
                          <ListItemSmenaSalary onClick={onOptionClickedSalary(option)} key={Math.random()}>
                            {option}
                          </ListItemSmenaSalary >
                        ))}
                      </DropDownListSalary>
                    </div>
                  )}
                </div>


                <div style={{ opacity: 0 }} className={styles.modal__content_salary}>
                  <p className={styles.modal__content_Name}>Зарплата за сегодняшний...</p>
                  <Field name='salaryFilter'
                    placeholder='' className={styles.modal__content_form_input}
                  />
                </div>

                <p className={styles.time0} >Смена</p>
                <div className={styles.DropDownContainerSmena}>

                  <DropDownHeader onClick={togglingSmena}>
                    {isOpenSmena ? <img src={ArrowTop} alt='Not find ArrowDownIcon' className={styles.Arrow} />
                      :
                      <img src={ArrowDown} className={styles.Arrow} alt='Not find ArrowTopIcon' />}
                    {selectedOptionSmena || "Днем"}
                  </DropDownHeader>
                  {isOpenSmena && (
                    <div>
                      <DropDownListSmena>
                        {optionSmena.map(option => (
                          <ListItemSmena onClick={onOptionClickedSmena(option)} key={Math.random()}>
                            {option.day} <p className={styles.time}>{option.time} </p>
                          </ListItemSmena>
                        ))}
                      </DropDownListSmena>
                    </div>
                  )}
                </div>

                <div className={styles.ChooseStatus}>

                  <Field value='Активен' name='status' type='radio' id='NotСelebrate'
                  />  <label htmlFor='NotСelebrate'> &nbsp; &nbsp;Активен&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>

                  <Field value='Неактивен' name='status' type='radio' id='Сelebrate' />
                  <label htmlFor='Сelebrate'> &nbsp;&nbsp;Не активен</label>


                </div>


              </div>


              <div className={styles.actions}>
                <button className={styles.actions__save} disabled={!(isValid && dirty)} type='submit' >Сохранить</button><br />
                <button className={styles.actions__operations} type='button' onClick={() => Delete(values.id)} >Удалить</button>
                <button className={styles.actions__operations} type='button' onClick={() => setActive({ d: false, s: null })}   >Отмена </button>
              </div>
            </Form>
          )}

        </Formik>
      </div>



    </div>
  )
}

export default ModalDataEmployess;


