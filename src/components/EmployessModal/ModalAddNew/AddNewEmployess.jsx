import { useState, useRef } from 'react';
import styles from './styles/AddNewEmployess.module.css';
import HumanIcon from './icons/et_profile-male.svg';
import { DropDownHeader, DropDownList, ListItem, ListItemSmena } from './styles/TabsCss'
import ArrowDown from './icons/ArrowDown.svg';
import ArrowTop from './icons/ArrowUp.svg';
import { Add_employess } from '../../../Logica/api/Employees';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';




const options = ["Флорист", "Курьер", "Админ"];
const optionSmena = [{ day: 'Днем', time: '8:00 - 20:00' }, { day: 'Вечером', time: '20:00 - 8:00' }]


function AddNewEmployess({ active, setActive }) {


  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpenSmena, setIsOpenSmena] = useState(false);
  const [selectedOptionSmena, setSelectedOptionSmena] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const toggling = () => setIsOpen(!isOpen);
  const togglingSmena = () => setIsOpenSmena(!isOpenSmena)

  const onOptionClickedSmena = value => () => {
    setSelectedOptionSmena(value.time);
    setIsOpenSmena(false);

  };
  const onOptionClicked = value => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  const AddNewEmployesSchema = Yup.object().shape({
    name: Yup.string()
      .required('Обязательно'),
    phoneNumber: Yup.string()
      .required('Обязательно'),
    password: Yup.string()
      .required('Обязательно')
      .min(5, 'Слишком короткий пароль!'),
    status: Yup.string()
      .required("Обязательно")
  });



  function clear(values) {

    values.name = '';
    values.password = '';
    values.phoneNumber = '';
    values.role = setSelectedOption(null)
    values.salary = '';
    values.workShift = setSelectedOptionSmena(null)
    values.surname = ''
    values.status = ''
    values.image = setSelectedImage(null)

  }


  let data = new FormData();
  return (
    <div className={active ? styles.active : styles.modal}  >

      <div className={styles.modal__content}   >

        <Formik
          initialValues={{
            id: '',
            name: '',
            surname: '',
            password: '',
            phoneNumber: '',
            role: '',
            image: '',
            status: '',
            salary: '',
            workShift: '',
            filial: '',

          }}
          validationSchema={AddNewEmployesSchema}
          onSubmit={(values) => {
            data.append('image', selectedImage, selectedImage.name);
            data.append('name', values.name)
            data.append('surname', values.surname)
            data.append('password', values.password)
            data.append('phoneNumber', values.phoneNumber)
            data.append('role', selectedOption)
            data.append('status', values.status)
            data.append('workShift', selectedOptionSmena)
            data.append('filial', Number(2))
            data.append('salary', Number(values.salary))


            console.log("values: ", values)
            dispatch(Add_employess(data, setActive))
            clear(values)





          }} >
          {({ values, errors, touched }) => (

            <Form  >

              <div className={styles.modal__content_photo}>

                {selectedImage == null ? <img alt='not find Icon' className={styles.humnanIcon} src={HumanIcon} />
                  :
                  selectedImage && (<img alt="not find" width={"184px"} name='image' height={"183px"}
                    src={URL.createObjectURL(selectedImage)} />)
                }


                <input

                  type="file"
                  id="files"
                  name="file"
                  className={styles.uploadPhoto}

                  onChange={(event) => {

                    setSelectedImage(event.target.files[0]);
                  }} />
                {selectedImage == null ? <label htmlFor="files" className={styles.modal__content_photo_texst} > Добавить картинку </label>
                  :
                  <label htmlFor="files" style={{ opacity: 0 }} className={styles.modal__content_photo_texst1} > Добавить </label>}

              </div>


              <div className={styles.modal__content_crossIcon}> </div>

              <div className={styles.modal__content_form} >

                <div className={styles.modal__content_data}>

                  <p className={styles.modal__content_Name}>Имя</p>
                  <Field
                    name='name' type='text' id='name'
                    value={values.name}
                    placeholder='Имя' className={styles.modal__content_form_input} />

                  {errors.name && touched.name ? (
                    <div className={styles.errors} >{errors.name}</div>
                  ) : null}
                </div>

                <div className={styles.modal__content_data}>

                  <p className={styles.modal__content_Name}>Фамилия</p>
                  <Field id='surname'
                    name='surname' type='text'
                    value={values.surname}
                    placeholder='Фамилия' className={styles.modal__content_form_input}

                  />
                </div>

                <div className={styles.modal__content_data}>
                  <p className={styles.modal__content_Name}>Тел. номер:</p>
                  <Field id='phoneNumber'

                    name='phoneNumber' type='text'
                    value={values.phoneNumber}
                    placeholder='Введите номер телефона' className={styles.modal__content_form_input}
                  />

                  {errors.phoneNumber && touched.phoneNumber ? (
                    <div className={styles.errors} >{errors.phoneNumber}</div>
                  ) : null}
                </div>

                <div className={styles.modal__content_data}>
                  <p className={styles.modal__content_Name}>Пароль </p>
                  <Field

                    name='password' type='text' id='password'
                    value={values.password}
                    placeholder='Введите пароль' className={styles.modal__content_form_input}
                  />
                  {errors.password && touched.password ? (
                    <div className={styles.errors} >{errors.password}</div>
                  ) : null}
                </div>

                <div className={styles.modal__content_data}>
                  <p className={styles.modal__content_Name}>Зарплата</p>
                  <Field
                    id='salary'
                    name='salary' type='text'
                    value={values.salary}
                    placeholder='****сом'
                    className={styles.modal__content_form_input}
                  /> </div>

                <p className={styles.modal__content_Name1}>Должность</p>
                <div className={styles.DropDownContainer} name='selectedOption' >
                  <DropDownHeader name='selectedOption1' id='selectedOption' onClick={toggling}>
                    {isOpen ? <img src={ArrowTop} alt='Not find ArrowDownIcon' className={styles.Arrow} />
                      :
                      <img src={ArrowDown} className={styles.Arrow} alt='Not find ArrowTopIcon' />}
                    {selectedOption || 'Должность'}
                  </DropDownHeader>

                  {isOpen && (
                    <div>
                      <DropDownList name='selectedOption'  >
                        {options.map(option => (
                          <ListItem onClick={onOptionClicked(option)} key={Math.random()} >
                            {option}
                          </ListItem>
                        ))}
                      </DropDownList>

                    </div>

                  )}

                </div>

                <div className={styles.modal__content_data3}>
                  <p className={styles.modal__content_Name2}>График работы</p>

                  <div className={styles.DropDownContainerSmena} >
                    <DropDownHeader onClick={togglingSmena}>
                      {isOpenSmena ? <img src={ArrowTop} alt='Not find ArrowDownIcon' className={styles.Arrow} />
                        : <img src={ArrowDown} className={styles.Arrow} alt='Not find ArrowTopIcon' />}
                      {selectedOptionSmena || "Смена"}
                    </DropDownHeader>
                    {isOpenSmena && (
                      <div>
                        <DropDownList >
                          {optionSmena.map(option => (
                            <ListItemSmena onClick={onOptionClickedSmena(option)} key={Math.random()}>
                              {option.day} <p className={styles.time}>{option.time} </p>
                            </ListItemSmena>
                          ))}
                        </DropDownList>
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.ChooseStatus}>

                  <Field name='status' type='radio' id='NotСelebrate'
                    value='Активен' /> <label htmlFor='NotСelebrate'> &nbsp; &nbsp;Активен&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                  <Field name='status' value='Неактивен' type='radio' id='Сelebrate' /><label htmlFor='Сelebrate'> &nbsp;&nbsp;Не активен</label>
                  {errors.status && touched.status ? (
                    <div className={styles.errorsStatus} >{errors.status}</div>
                  ) : null}
                </div>
              </div>


              <div className={styles.actions}>
                <button type="submit" className={styles.actions__save} >Сохранить</button><br />
                <button className={styles.actions__operations} onClick={() => clear(values)}>Очистить</button>

              </div>
            </Form>
          )}

        </Formik>
        <button onClick={() => setActive(false)} className={styles.actions__operations1}  >Отмена </button>

      </div>



    </div>
  )
}

export default AddNewEmployess;