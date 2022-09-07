import { Formik, Form, Field } from 'formik';
import React, { useState } from 'react'
import styles from './styles/InfoFilials.module.css';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { Delete_filials_data, Update_filials_data } from '../../../Logica/api/Filials';
import ArrowTop from './icon/ArrowUp.svg';
import { DropDownHeader, DropDownList, ListItem } from './styles/Tab'
import ArrowDown from './icon/ArrowDown.svg'


function InfoFilials({ active, setActive, active1 = {} }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggling = () => setIsOpen(!isOpen)
    const [selectedOption, setSelectedOption] = useState(active1?.schedule);
    const dispatch = useDispatch();

    const AddNewFilialsSchema = Yup.object().shape({
        address: Yup.string()
            .required('Обязательно'),
        phone: Yup.string()
            .required('Обязательно'),

    })

    const options = ['24/7', 'Закрыто']
    const onOptionClicked = value => () => {
        setSelectedOption(value);
        setIsOpen(false);
    };

    return (
        <div className={active ? styles.active : styles.modal}  >

            <div className={styles.modal__content}   >

                <Formik
                    initialValues={{
                        id: active1.id,
                        address: active1.address,
                        phone: active1.phone,
                        schedule: active1.schedule
                    }}
                    validationSchema={AddNewFilialsSchema}
                    onSubmit={values => {

                        values.schedule = selectedOption
                        dispatch(Update_filials_data(values, setActive))


                    }}>

                    {({ values, errors, touched, isValid, dirty }) => (
                        <Form>

                            <div className={styles.modal__content_form}>

                                <div className={styles.modal__content_data}>
                                    <p className={styles.modal__content_Name}>Адрес</p>

                                    <Field placeholder='Адрес' name='address' type='text' value={values.address}
                                        className={styles.modal__content_form_input}
                                    />
                                    {errors.address && touched.address ? (
                                        <div className={styles.errors} >{errors.address}</div>
                                    ) : null}

                                </div>

                                <div className={styles.modal__content_data}>
                                    <p className={styles.modal__content_Name}>Телефон</p>

                                    <Field placeholder='Номер телефона' name='phone' type='text'
                                        value={values.phone} className={styles.modal__content_form_input}
                                    />
                                    {errors.phone && touched.phone ? (
                                        <div className={styles.errors} >{errors.phone}</div>
                                    ) : null}

                                </div>



                                <div className={styles.modal__content_data}>
                                    <p className={styles.modal__content_Name}>График работы</p>

                                    <div className={styles.DropDownContainer}  >
                                        <DropDownHeader onClick={toggling}>
                                            {isOpen ? <img src={ArrowTop} alt='Not find ArrowDownIcon' className={styles.Arrow} />
                                                : <img src={ArrowDown} className={styles.Arrow} alt='Not find ArrowTopIcon' />}
                                            {selectedOption || 'Введите данные'}
                                        </DropDownHeader>

                                        {isOpen && (
                                            <div>
                                                <DropDownList  >
                                                    {options.map(option => (
                                                        <ListItem onClick={onOptionClicked(option)} key={Math.random()} >
                                                            {option}
                                                        </ListItem>
                                                    ))}
                                                </DropDownList>

                                            </div>

                                        )}

                                    </div>
                                </div>






                            </div>

                            <div className={styles.actions}>
                                <button className={styles.actions__save}
                                    disabled={!(isValid && dirty)}
                                    type='submit'>Сохранить</button><br />

                                <button className={styles.actions__operations} type='button'
                                    onClick={() => dispatch(Delete_filials_data(values.id, setActive))}  >Удалить</button>
                                <button className={styles.actions__operations} type='button'
                                    onClick={() => setActive({ d: false, s: null })}    >Отмена </button>
                            </div>


                        </Form>

                    )}


                </Formik>




            </div>

        </div >
    )
}
export default InfoFilials