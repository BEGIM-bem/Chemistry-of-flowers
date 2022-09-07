import React, { useEffect } from "react";
import styles from './styles/InfoShop.module.css';
import MonitoringIcon from './icon/monitoring.svg';
import CarIcon from './icon/car.svg';
import AcceleratorIcon from './icon/accelerator.svg';
import MacOrderImg from './images/MacOrders.svg';
import MacEmployess from './images/MacEmployess.svg';
import MacCatalog from './images/MacCatalog.svg';
import MacStatictic from './images/MacStatics.svg';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Get_filials } from "../../../Logica/api/Filials";
import One from './icon/One.svg';
import Two from './icon/Two.svg'

function InfoShop() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    useEffect(() => {
        dispatch(Get_filials())
    }, [])


    const middleIndex = Math.ceil(user.filials.length / 2);

    const firstHalf = user.filials.slice().splice(0, middleIndex);
    const secondHalf = user.filials.slice().splice(-middleIndex);


    return (

        <div className={styles.CollectionItem} >

            <div className={styles.info}>

                <h1 className={styles.info__title}>О нашем магазине</h1>
                <p className={styles.info_texst}>В нашем интернет-магазине вы всегда можете подобрать
                    и купить цветы, букеты и композиции для  любого <br /> случая и торжества. </p>


                <div className={styles.Benefits}>

                    <div className={styles.Monitoring}>
                        <img src={MonitoringIcon} className={styles.icon} alt='not find icon' />
                        <h1 className={styles.Benefits__title}> Постоянный мониторинг </h1>
                        <p className={styles.Benefits__texst}>Просмотр на любом устройстве: мобильные<br />телефоны, компьютеры.</p>

                    </div>

                    <div className={styles.Monitoring}>
                        <img src={CarIcon} className={styles.icon} alt='not find icon' />
                        <h1 className={styles.Benefits__title}>Доставка</h1>
                        <p className={styles.Benefits__texst}>Максимально быстрая доставка по городу<br /> Бишкек.</p>

                    </div>

                    <div className={styles.Monitoring}>
                        <img src={AcceleratorIcon} className={styles.icon} alt='not find icon' />
                        <h1 className={styles.Benefits__title}> Скорость работы </h1>
                        <p className={styles.Benefits__texst}>Высокая скорость работы и использование<br />  свежих материалов.</p>

                    </div>


                </div>
            </div>



            <div className={styles.functional}>


                <div className={styles.orders}>

                    <div className={styles.orders__All_texs} >
                        <h1 className={styles.orders__title}>Заказы</h1>
                        <p className={styles.orders__texst}>В этом разделе можете увидеть<br /> все заказы</p>
                        <NavLink to='/orders'>  <button className={styles.orders__btn}> Перейти</button> </NavLink>
                    </div>

                    <img src={MacOrderImg} className={styles.orders__poto} alt='Not find' />
                </div>




                <div className={styles.Employess}>
                    <img src={MacEmployess} className={styles.orders__poto1} alt='Not find' />

                    <div className={styles.orders__All_texs} >
                        <h1 className={styles.orders__title}>Сотрудники</h1>
                        <p className={styles.orders__texst}>В этом разделе вы можете удидеть <br /> список всех ваших <br />сотрудников</p>
                        <NavLink to='employees'>  <button className={styles.orders__btn}> Перейти</button> </NavLink>
                    </div>

                </div>


                <div className={styles.orders}>

                    <div className={styles.orders__All_texs} >
                        <h1 className={styles.orders__title}>Каталог</h1>
                        <p className={styles.orders__texst}>В этом разделе вы можете увидеть <br />
                            все букеты и  ассортимент
                            товаров
                        </p>
                        <NavLink to='catalogs'>   <button className={styles.orders__btn}> Перейти</button> </NavLink>
                    </div>

                    <img src={MacCatalog} alt='Not find' className={styles.orders__poto} />
                </div>



                <div className={styles.Employess}>
                    <img src={MacStatictic} className={styles.orders__poto1} alt='Not find' />

                    <div className={styles.orders__All_texs} >
                        <h1 className={styles.orders__title}>Статистика</h1>
                        <p className={styles.orders__texst}>В этом разделе вы можете увидеть<br /> статистику по  всем работникам</p>
                        <NavLink to='statistics'> <button className={styles.orders__btn}> Перейти</button>  </NavLink>
                    </div>

                </div>


            </div>

            <footer className={styles.footer}>

                <h1 className={styles.footer__title}>Наши адреса</h1>

                <div className={styles.ds} >
                    <div className={secondHalf.length > 5 ? styles.adressScroll : styles.filials}>
                        {
                            firstHalf.map(item => (

                                <ul className={styles.adress_list} >
                                    <li  >{item.address}</li>
                                </ul>

                            ))}
                    </div>

                    <div className={secondHalf.length > 5 ? styles.adressScroll1 : styles.filials1}  >
                        {
                            secondHalf.map(item => (

                                <ul className={styles.adress_list} >
                                    <li>{item.address}</li>
                                </ul>

                            ))}
                    </div>
                </div>


                <div className={styles.addressText}>
                    <img className={styles.adress1} src={One} alt='not find' />
                    <img className={styles.adress} src={Two} alt='not find' />
                </div>


            </footer>



        </div>
    )
}
export default InfoShop;