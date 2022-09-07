import React, { useState } from 'react';
import styles from './styles/Modal.module.css';
import { Formik, Field, Form } from 'formik';
import moment from 'moment';
import Cross from './icon/cross.svg'
import { useDispatch } from 'react-redux';
import DeleteIcon from './icon/delete.svg'
import { Change_Status, Delte_Status } from '../../Logica/api/Orders';


function Modal({ active, setActive, content, type }) {

    const dispatch = useDispatch()

    function Reject() {
        if (content.status === 'first') {

            dispatch(Delte_Status(content.id, type))
            setActive({ active: false, content: null })

        }
    }


    const orderStatus = {
        "first": 'Ожидает',
        "second": "Активен",
        "eights": 'Oтклонен',
        "seventh": 'Завершен',
        "third": "Активен",
    }
    const [orsersBouquet, setOrsersBouquet] = useState(content.bouquet)
    function DeleteBouquet(values) {

        let fillters = orsersBouquet.filter(item => item.id !== values.id)
        setOrsersBouquet(fillters)

    }




    return (
        <div className={active ? styles.active : styles.modal}  >

            <div className={styles.allContent}>

                <img className={styles.Cross1} src={Cross} alt='Not find icon'
                    onClick={() => setActive({ active: false, content: null })} />

                <table className={styles.table2} >
                    <thead   >
                        <tr  >
                            <td className={styles.table__head}  >Id</td>
                            <td className={styles.table__head} >Имя</td>
                            <td className={styles.table__head}>Номер телефона </td>
                            <td className={styles.table__head}>Дата </td>
                            <td className={styles.table__head}>Время </td>
                            <td className={styles.table__head}>Статус заказа </td>
                            {
                                content.status === 'first' ? '' : <td className={styles.table__head}>Курьер</td>
                            }


                        </tr>

                    </thead>

                    <tbody>

                        <tr key={content.id} className={styles.table__texst}  >

                            <td className={styles.table__element} >{content.id}</td>
                            <td className={styles.table__element}>{content.buyerName}</td>
                            <td className={styles.table__element}>{content.buyerPhoneNumber}</td>
                            <td className={styles.table__element}>{moment(content.date).format('MM.DD.YYYY')} </td>
                            <td className={styles.table__element}>{[new Date(content.date).getHours() - 3, new Date(content.date).getMinutes(),
                            new Date(content.date).getSeconds()].map(x => { return x < 10 ? "0" + x : x }).join(":")}   </td>
                            <td className={styles.table__element}> <p className={styles.status}
                                style={{

                                    backgroundColor:
                                        ((content.status === "first" && 'rgba(232, 190, 0, 0.17)')) ||
                                        ((content.status === "second" && ' rgba(125, 210, 29, 0.17')) ||
                                        ((content.status === "fourth" && ' rgba(125, 210, 29, 0.17')) ||
                                        ((content.status === "fifth" && ' rgba(125, 210, 29, 0.17')) ||
                                        ((content.status === "sixth" && ' rgba(125, 210, 29, 0.17')) ||

                                        ((content.status === "third" && ' rgba(125, 210, 29, 0.17')) ||
                                        ((content.status === "seventh" && '#F5F5F5')) ||
                                        ((content.status === "eights" && 'rgba(227, 60, 82, 0.17)')),

                                    border:
                                        ((content.status === "fourth" && '1px solid #79CC1C')) ||
                                        ((content.status === "fifth" && '1px solid #79CC1C')) ||
                                        ((content.status === "sixth" && '1px solid #79CC1C')) ||


                                        ((content.status === "third" && '1px solid #79CC1C')) ||
                                        ((content.status === "first" && '1px solid #FFD512')) ||

                                        ((content.status === "second" && '1px solid #79CC1C')) ||

                                        ((content.status === "seventh" && '1px solid #D1D1D1')) ||
                                        ((content.status === "eights" && '1px solid #FF5E73')),

                                    color:
                                        ((content.status === "fourth" && '#6DB81A')) ||
                                        ((content.status === "fifth" && '#6DB81A')) ||
                                        ((content.status === "sixth" && '#6DB81A')) ||

                                        ((content.status === "third" && '#6DB81A')) ||
                                        ((content.status === "first" && '#434343;')) ||
                                        ((content.status === "second" && '#6DB81A')) ||
                                        ((content.status === "seventh" && '#636363')) ||
                                        ((content.status === "eights" && '#E73D53')),
                                }}

                            >
                                {orderStatus[content.status]}   </p></td>
                            {
                                content.status === 'first' ? "" :
                                    content.courier ? <td className={styles.table__element}>{content.courier.name}</td>
                                        :
                                        <td className={styles.table__element}>{' '} </td>
                            }

                        </tr>


                    </tbody>

                </table>


                <div className={styles.modal__content}   >

                    <h1 className={styles.modal__content_title} >Данные заказа</h1>


                    <div className={styles.container} >
                        <table className={styles.table} >
                            <thead>
                                <tr>
                                    <td className={styles.table__head_row} >&nbsp; &nbsp;  &nbsp;  &#8470;</td>
                                    <td className={styles.table__head_row}  > Название товара </td>
                                    <td className={styles.table__head_row}>Количество</td>
                                    <td className={styles.table__head_row}> Цена товара </td>
                                    <td className={styles.table__head_row}>Адрес букета</td>
                                </tr>
                            </thead>
                            <tbody >
                                {orsersBouquet.map((item, index) => (

                                    <tr key={item.id} >

                                        <td className={styles.table__row_content}>&nbsp; &nbsp;  &nbsp;  {index + 1}</td>

                                        <td className={styles.table__row_content}> {item.name}</td>
                                        <td className={styles.table__row_content}>1 штук</td>
                                        <td className={styles.table__row_content}>{item.cost} сом</td>

                                        <td className={styles.table__row_content}>{content.address}</td>
                                        <td className={styles.table__row_contentIcon}  >
                                            <img onClick={() => DeleteBouquet(item)} src={DeleteIcon} alt='' />
                                        </td>


                                    </tr>)
                                )}


                            </tbody>


                        </table>

                    </div>

                    <div className={styles.AllPrice} >
                        <p className={styles.AllPrice__texst}>Доставка</p>
                        <p className={styles.AllPrice__price}> {content.deliveryCost} coм </p>
                        <hr />
                        <p className={styles.AllPricepRroduct}>Общая сумма</p>
                        <p className={styles.AllPrice__price}> {content.finalCost} сом</p>
                    </div>


                    <Formik
                        initialValues={{
                            id: content.id,
                            buyerName: content.buyerName,
                            buyerPhoneNumber: content.buyerPhoneNumber,
                            addInformation: content.addInformation,
                            recieverName: content.recieverName,
                            recieverPhoneNumber: content.recieverPhoneNumber,
                            address: content.address,

                            bouquet: orsersBouquet,
                            orderType: content.orderType,



                        }} onSubmit={(values) => {
                            let idBouquetSent = []
                            orsersBouquet.map(item => idBouquetSent.push(String(item.id)))
                            values.bouquet = idBouquetSent

                            if (content.status === 'first') {

                                dispatch(Change_Status(values.id, 'second', type))
                                // dispatch(Change_DateOrders(values))
                                setActive({ active: false, content: null })
                            }


                        }}>
                        {({ values, handleChange }) => (
                            <Form>
                                <div className={styles.kartoxki}>
                                    <div className={styles.Sent}  >
                                        <h1>Отправитель </h1>
                                        <div className={styles.form}>
                                            <div className={styles.form__ContainerName}>
                                                <p className={styles.name}>Имя</p>
                                                <Field className={styles.form__input} name='buyerName' type='text'
                                                    value={values.buyerName} />
                                            </div>

                                            <div className={styles.form__ContainerName}>
                                                <p className={styles.name}>Тел. номер:</p>
                                                <Field className={styles.form__input} type='text' name='buyerPhoneNumber'
                                                    value={values.buyerPhoneNumber} />
                                            </div>

                                            <div className={styles.form__ContainerName}>
                                                <p className={styles.name}> Пожелания</p>
                                                <textarea className={styles.form__input1} onChange={handleChange}
                                                    id='addInformation' name='addInformation'>{values.addInformation}</textarea>
                                            </div>
                                        </div>
                                    </div>



                                    <div className={styles.Sent1}  >
                                        <h1>Получатель </h1>
                                        <div className={styles.form}>
                                            <div className={styles.form__ContainerName}>
                                                <p className={styles.name}>Имя</p>
                                                <Field className={styles.form__input} type='text'
                                                    value={values.recieverName} name='recieverName' />
                                            </div>

                                            <div className={styles.form__ContainerName}>
                                                <p className={styles.name}>Тел. номер:</p>
                                                <Field className={styles.form__input} type='text' name='recieverPhoneNumber'
                                                    value={values.recieverPhoneNumber} />
                                            </div>

                                            <div className={styles.form__ContainerName}>
                                                <p className={styles.name}> Адресс</p>
                                                <textarea className={styles.form__input1} onChange={handleChange}
                                                    name='address' value={values.address} />
                                            </div>
                                        </div>
                                    </div>
                                </div>



                                <div className={styles.Button} >
                                    {
                                        content.status !== 'first' ? null : <button className={styles.Button__Close} type='button'
                                            onClick={() => Reject()}  >Отклонить </button>
                                    }

                                    {
                                        content.status === 'seventh' || content.status === 'eights' || content.status === 'second' ? null
                                            :
                                            <button className={styles.Button__Confirm} type="submit"> Подтвердить </button>
                                    }
                                </div>
                            </Form>
                        )}

                    </Formik>

                </div>
            </div>
        </div>

    )
}
export default Modal