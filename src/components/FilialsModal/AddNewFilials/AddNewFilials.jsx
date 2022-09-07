import { Formik, Form, Field } from 'formik';
import React, { useState } from 'react'
import styles from './styles/AddNewFilials.module.css';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import ArrowTop from './icon/ArrowUp.svg';
import { DropDownHeader, DropDownList, ListItem } from './styles/Tab'
import { Add_Filials } from '../../../Logica/api/Filials';
import ArrowDown from './icon/ArrowDown.svg'

function AddNewFilials({ active, setActive }) {

    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const toggling = () => setIsOpen(!isOpen)
    const [selectedOption, setSelectedOption] = useState(null);

    const AddNewFilialsSchema = Yup.object().shape({
        address: Yup.string()
            .required('Обязательно'),
        phone: Yup.string()
            .required('Обязательно'),

    })

    function Clear(values) {
        values.address = '';
        values.phone = '';
        values.schedule = setSelectedOption('')

    }
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

                        address: '',
                        phone: '',
                        schedule: ''
                    }}
                    validationSchema={AddNewFilialsSchema}
                    onSubmit={(values) => {
                        values.schedule = selectedOption
                        dispatch(Add_Filials(values, setActive))
                        Clear(values)



                    }}>

                    {({ errors, touched, values }) => (
                        <Form>

                            <div className={styles.modal__content_form}>

                                <div className={styles.modal__content_data}>
                                    <p className={styles.modal__content_Name}>Адрес</p>

                                    <Field placeholder='Адрес' name='address' type='text'
                                        value={values.address} className={styles.modal__content_form_input}
                                    />

                                    {errors.address && touched.address ? (
                                        <div className={styles.errors} >{errors.address}</div>
                                    ) : null}
                                </div>

                                <div className={styles.modal__content_data}>
                                    <p className={styles.modal__content_Name}>Телефон</p>

                                    <Field placeholder='Номер телефона' name='phone' type='number'
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
                                <button type='sumbit' className={styles.actions__save}>Сохранить</button><br />
                                <button className={styles.actions__operations} onClick={() => Clear(values)} >Очистить</button>

                            </div>
                        </Form>

                    )}


                </Formik>

                <button button='button' className={styles.actions__operations1} onClick={() => setActive(false)} >Отмена </button>
            </div>

        </div>
    )
}
export default AddNewFilials;