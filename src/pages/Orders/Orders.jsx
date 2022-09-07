import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar";
import styles from './styles/Orders.module.css';
import { Tab } from './styles/TabsCss';
import useTable from "../../components/PaginationTable/useTable";
import TableFooter from "../../components/PaginationTable/TableFooter";
import Modal from "../../components/OrdersModal/Modal";
import { Get_Orders } from "../../Logica/api/Orders";
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment'
import { AllOrders, StatusFirst, StatusSecond, StatusSeventh } from "../../Logica/reducers/userReducer";
import Edit from './icons/ep_edit.svg';
import { Triangle } from 'react-loader-spinner'





function Orders({ rowsPerPage = 11 }) {
    const user = useSelector(state => state.user)

    const [page, setPage] = useState(1);
    const { slice, range } = useTable(user.orders, page, rowsPerPage);
    const [isModalActive, setIsModalActive] = useState({ isOpen: false, content: null })
    const dispatch = useDispatch()

    const types = ["Все", 'Ожидающие подтверждения', 'Подтвержденные', "Завершенные"]

    const [active, setActive] = useState(types[0])

    useEffect(() => {
        dispatch(Get_Orders())

    }, [])



    const [type, setType] = useState('')

    const onTabClick = (type) => {
        setActive(type)

        if (type === 'Все') {

            setType("Все")
            dispatch({ type: AllOrders })
        }
        else if (type === 'Ожидающие подтверждения') {
            dispatch({ type: StatusFirst })
            setType("Ожидающие подтверждения")

        }
        else if (type === 'Подтвержденные') {
            dispatch({ type: StatusSecond })
            setType('Подтвержденные')
        }
        else if (type === "Завершенные") {

            dispatch({ type: StatusSeventh })
            setType('Завершенные')

        }
    }

    const orderStatus = {
        "first": 'Ожидает',
        "second": "Активен",
        "eights": 'Oтклонен',
        "seventh": 'Завершен',
        "third": "Активен",
        "fourth": 'Активен',
        "fifth": 'Активен',
        "sixth": 'Активен',
    }





    return (
        <div className={styles.orders}>

            <NavBar />
            <div className={styles.ButtonNavigations}    >
                {types.map(type => (
                    <Tab className={styles.ButtonNavigations__texst} key={type} active={active === type}
                        onClick={() => onTabClick(type)} >{type}</Tab>
                ))}

            </div>


            <div className={styles.container} >
                {
                    user.employees.length === 0 ?
                        <div className={styles.spinner} >
                            <Triangle
                                color="#E73D53" height={110} width={110}

                            /> </div> :


                        <table className={styles.table} >
                            <thead   >
                                <tr  >
                                    <td className={styles.table__head}  >&#8470;</td>
                                    <td className={styles.table__head} >Имя</td>
                                    <td className={styles.table__head}>Номер телефона </td>
                                    <td className={styles.table__head}>Дата </td>
                                    <td className={styles.table__head}>Время </td>
                                    <td className={styles.table__head}>Статус заказа </td>
                                    <td className={styles.table__head}>Курьер</td>
                                    <td className={styles.table__head}></td>
                                </tr>

                            </thead>
                            <tbody className={styles.tbody} >
                                {
                                    slice.map((item, index) => (

                                        <tr key={item.id} className={styles.table__texst}
                                            onClick={() => setIsModalActive({ isOpen: true, content: item })}  >


                                            <td className={styles.table__element} >{index + 1}</td>
                                            <td className={styles.table__element}>{item.buyerName}</td>
                                            <td className={styles.table__element}>{item.buyerPhoneNumber}</td>
                                            <td className={styles.table__element}>  {moment(item.date).format('MM.DD.YYYY')} </td>

                                            <td className={styles.table__element}>

                                                {[new Date(item.date).getHours() - 3, new Date(item.date).getMinutes(),
                                                new Date(item.date).getSeconds()].map(x => { return x < 10 ? "0" + x : x }).join(":")}  </td>

                                            <td className={styles.table__element}> <p className={styles.status}
                                                style={{

                                                    backgroundColor:
                                                        ((item.status === "first" && 'rgba(232, 190, 0, 0.17)')) ||
                                                        ((item.status === "second" && ' rgba(125, 210, 29, 0.17')) ||
                                                        ((item.status === "fourth" && ' rgba(125, 210, 29, 0.17')) ||
                                                        ((item.status === "fifth" && ' rgba(125, 210, 29, 0.17')) ||
                                                        ((item.status === "sixth" && ' rgba(125, 210, 29, 0.17')) ||

                                                        ((item.status === "third" && ' rgba(125, 210, 29, 0.17')) ||
                                                        ((item.status === "seventh" && ' #F5F5F5')) ||
                                                        ((item.status === "eights" && '  rgba(227, 60, 82, 0.17)')),

                                                    border:
                                                        ((item.status === "fourth" && '1px solid #79CC1C')) ||
                                                        ((item.status === "fifth" && '1px solid #79CC1C')) ||
                                                        ((item.status === "sixth" && '1px solid #79CC1C')) ||


                                                        ((item.status === "third" && '1px solid #79CC1C')) ||
                                                        ((item.status === "first" && '1px solid #FFD512')) ||

                                                        ((item.status === "second" && '1px solid #79CC1C')) ||

                                                        ((item.status === "seventh" && '1px solid #D1D1D1')) ||
                                                        ((item.status === "eights" && '1px solid #FF5E73')),

                                                    color:
                                                        ((item.status === "fourth" && '#6DB81A')) ||
                                                        ((item.status === "fifth" && '#6DB81A')) ||
                                                        ((item.status === "sixth" && '#6DB81A')) ||

                                                        ((item.status === "third" && '#6DB81A')) ||
                                                        ((item.status === "first" && '#434343;')) ||
                                                        ((item.status === "second" && '#6DB81A')) ||
                                                        ((item.status === "seventh" && '#636363')) ||
                                                        ((item.status === "eights" && '#E73D53')),
                                                }

                                                }     >     {orderStatus[item.status]}  </p></td>
                                            {
                                                item.courier ? <td className={styles.table__element}>{item.courier.name}</td>
                                                    :
                                                    <td className={styles.table__element}>{' '} </td>
                                            }

                                            <td className={styles.table__element}>
                                                <img src={Edit} alt='Not find Icon' /> &nbsp; &nbsp; &nbsp;   </td>
                                        </tr>

                                    ))

                                }
                            </tbody>

                        </table>
                }
                {
                    isModalActive.content === null ? null : <Modal type={type} active={isModalActive.isOpen}
                        content={isModalActive.content} setActive={setIsModalActive} />
                }


            </div>
            {
                user.orders.length > 12 ? <TableFooter range={range} slice={slice}
                    setPage={setPage} page={page} /> : ''
            }



        </div>
    )

}

export default Orders;