import { useState, useEffect } from "react";
import styles from './styles/Employees.module.css'
import stylesSwitchBetweenTabs from './styles/SwitchBetweenTabs.module.css'
import NavBar from "../../components/NavBar/NavBar";
import IconAddPeople from './icons/addPeople.svg';
import { Tab } from './TabCss';
import stylesTable from './styles/Table.module.css';
import TableFooter from "../../components/PaginationTable/TableFooter";
import useTable from "../../components/PaginationTable/useTable";
import AddNewEmployess from "../../components/EmployessModal/ModalAddNew/AddNewEmployess";
import { useSelector, useDispatch } from 'react-redux';
import ModalDataEmployess from "../../components/EmployessModal/ModalEmployess/ModalEmployess";
import { Get_Employess } from '../../Logica/api/Employees';
import { AllEmloyess, Admin, Florists, Courier } from '../../Logica/reducers/userReducer'
import jwt_decode from "jwt-decode";

import { Triangle } from 'react-loader-spinner'




function Employess({ rowsPerPage = 11 }) {
    const TabТame = ["Все", "Админы", "Флористы", "Курьеры"]
    const [active, setActive] = useState(TabТame[0])

    const user = useSelector(state => state.user)


    const dispatch = useDispatch()

    const [page, setPage] = useState(1);
    const [titlePosition, setTitlePosition] = useState('сотрудника')
    const [isAddNewEmployees, setAddNewEmployees] = useState(false)
    const [isModalDataEmployess, setIsModalDataEmployess] = useState({ d: false, s: null })


    const { slice, range } = useTable(user.employees, page, rowsPerPage);

    let GetToken = localStorage.getItem('token')
    const decoded = jwt_decode(GetToken);

    console.log("userE,ployess: ", user.employees)

    useEffect(() => {
        dispatch(Get_Employess())

    }, [])

    const [type, setType] = useState('')

    function onTabClick(type) {

        setActive(type)
        if (type === 'Все') {
            setType('Все')
            dispatch({ type: AllEmloyess })
            setTitlePosition("сотрудников")
        }
        else if (type === 'Админы') {
            setType("Админы")
            dispatch({ type: Admin })
            setTitlePosition("админа")

        }
        else if (type === 'Флористы') {
            setType("Флорист")
            dispatch({ type: Florists })
            setTitlePosition("флориста")
        }
        else if (type === 'Курьеры') {
            setType("Курьер")
            dispatch({ type: Courier })
            setTitlePosition("курьера")


        }

    }

    return (

        <div className={styles.Employess} >

            <NavBar />

            <div className={stylesSwitchBetweenTabs.ButtonNavigations} >
                {TabТame.map(type => (
                    <Tab key={type} active={active === type} onClick={() => onTabClick(type)}>{type}</Tab>
                ))}
            </div>

            {user.isAuth === false ? null :
                decoded.role === 'Супер Админ' ?
                    <div className={stylesSwitchBetweenTabs.add}>
                        <button className={stylesSwitchBetweenTabs.add__btn} onClick={() => setAddNewEmployees(true)}>
                            <img src={IconAddPeople} className={stylesSwitchBetweenTabs.add__icon} alt='Not find icons' />
                            Добавить {titlePosition}

                        </button>
                    </div> : null

            }






            <div className={stylesTable.container} >
                {
                    user.employees.length === 0 ?
                        <div className={stylesTable.spinner} >
                            <Triangle
                                color="#E73D53" height={110} width={110}

                            /> </div> :

                        <table className={stylesTable.table} >
                            <thead>
                                <tr>
                                    <td className={stylesTable.head}  >Id</td>
                                    <td className={stylesTable.head} >Имя пользователя</td>
                                    <td className={stylesTable.head}  >Номер телефона</td>
                                    <td className={stylesTable.head}  >Должность</td>
                                    <td className={stylesTable.head}  > &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;Статус</td>
                                    <td className={stylesTable.head}  >Зарплата &nbsp;&nbsp;  </td>
                                </tr>
                            </thead>


                            <tbody className={stylesTable.tbody} >

                                {
                                    slice.map((item, index) => (
                                        <tr key={item.id} onClick={() => setIsModalDataEmployess({ d: true, s: item })}
                                            className={stylesTable.table__texst}  >
                                            <td className={stylesTable.d}>{item.id}</td>
                                            <td className={stylesTable.d}>{item.name}</td>
                                            <td className={stylesTable.d}>{item.phoneNumber} </td>
                                            <td className={stylesTable.d}>{item.role}</td>

                                            <td className={stylesTable.d}> <p className={stylesTable.status}
                                                style={{
                                                    backgroundColor:
                                                        ((item.status === 'Неактивен' && "#F5F5F5")),
                                                    border: ((item.status === 'Неактивен' && "1px solid #C4C4C4")),
                                                    color: ((item.status === 'Неактивен' && "#9C9C9C"))

                                                }}

                                            >{item.status} </p></td>

                                            <td className={stylesTable.d}>{item.salary}</td>
                                        </tr>
                                    ))
                                }


                            </tbody>
                        </table>
                }
                <AddNewEmployess active={isAddNewEmployees} setActive={setAddNewEmployees} />
                {isModalDataEmployess.s === null ? null
                    : decoded.role === 'Супер Админ' ? <ModalDataEmployess active1={isModalDataEmployess.s}
                        active={isModalDataEmployess.d} type={type} setActive={setIsModalDataEmployess} />
                        : null}


            </div>

            {
                user.employees.length > 12 ?
                    <TableFooter range={range} slice={slice} setPage={setPage} page={page} /> : ''
            }


        </div>
    )

}

export default Employess;
