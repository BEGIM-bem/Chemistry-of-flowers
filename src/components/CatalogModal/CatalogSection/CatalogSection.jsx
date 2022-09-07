
import { useState } from "react";
import styles from './styles/CatalogSection.module.css';
import { DropDownListSalary, ListItemSmenaSalary } from './styles/TabsCss';
import ArrowDown from './icons/ArrowDown.svg';
import ArrowTop from './icons/ArrowUp.svg';
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import { EditBouthet, Delete_Bouquet } from '../../../Logica/api/Catalog'
import * as Yup from 'yup';
import { date } from "yup/lib/locale";


function CatalogSection({ active, content, setActive }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)
  const [isOpenSalary, setIsOpenSalary] = useState(false);
  const [isOpenFilials, setIsOpenFilials] = useState(false);
  const [selectSalaryCategory, setSelectSalaryCategory] = useState(content.category);

  const [selectFilials, setSelectFilials] = useState(content.filial)
  const togglingSalary = () => setIsOpenSalary(!isOpenSalary)
  const togglineFilials = () => setIsOpenFilials(!isOpenFilials)

  function onOptionClickedSalary(value) {
    setSelectSalaryCategory(value)
    setIsOpenSalary(false)
  }

  const onOptionClickedFilials = value => () => {
    setSelectFilials(value)
    setIsOpenFilials(false)
  }

  function Delete(id) {
    dispatch(Delete_Bouquet(id))
    setActive({ active: false, content: null })
  }



  const AddNewFilialsSchema = Yup.object().shape({
    nameEmlpoyees: Yup.string()
      .required('Обязательно'),
    name: Yup.string()
      .required('Обязательно'),
    image: Yup.string()
      .required('Обязательно'),


  })

  const [selectedImage, setSelectedImage] = useState(content.image);



  return (
    <div className={active ? styles.active : styles.modal}>
      <div className={styles.modal__content1}>

        <Formik
          initialValues={{
            id: content.id,
            name: content.name,
            image: content.image,
            nameEmlpoyees: content.florist.name,
            filial: content.filial,
            cost: content.cost,
            description: content.description,
            category: content.category,
            selection: content.selection,



          }}
          validationSchema={AddNewFilialsSchema}
          onSubmit={values => {

            dispatch(EditBouthet(values))
            setActive({ active: false, content: null })
          }}>
          {({ values, errors, isValid, dirty, touched, handleChange }) => (

            <Form>


              <div className={styles.modal__content_photo}>

                <img src={selectedImage} name='image' alt='Изображение отсутствует'

                  className={styles.modal__content_photoFlowers} />

                {errors.image && touched.image ? (
                  <div className={styles.errors} >{errors.image}</div>
                ) : null}

              </div>


              <div className={styles.content} >
                <div className={styles.modal__content_fo}>
                  <p className={styles.modal__content_Name}>Флорист</p>
                  <Field
                    placeholder='Имя' name='nameEmlpoyees' type='text' value={values.nameEmlpoyees}
                    className={styles.modal__content_form_input} />
                  {errors.nameEmlpoyees && touched.nameEmlpoyees ? (
                    <div className={styles.errors} >{errors.nameEmlpoyees}</div>
                  ) : null}

                </div>

                <div className={styles.modal__content_fo}>
                  <p className={styles.modal__content_Name}>Филиал</p>

                  <div className={styles.DropDownContainerSalary} >
                    <div className={styles.DropDownHeader} onClick={togglineFilials}>
                      {isOpenFilials ? <img src={ArrowTop} alt='Not find ArrowDownIcon' className={styles.Arrow} />
                        :
                        <img src={ArrowDown} className={styles.Arrow} alt='Not find ArrowTopIcon' />}
                      {selectFilials.address || "Еще не выбрано"}
                    </div >
                    {isOpenFilials && (
                      <div>
                        <DropDownListSalary className={styles.ListItemOdd}>
                          {user.filials.map(option => (

                            <ListItemSmenaSalary onClick={onOptionClickedFilials(option)} key={Math.random()}>
                              {option.address}

                            </ListItemSmenaSalary >

                          ))}
                        </DropDownListSalary>

                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.modal__content_fo}>
                  <p className={styles.modal__content_Name}>Цена</p>
                  <Field placeholder='Цена'
                    values={values.cost} type='number' name='cost' className={styles.modal__content_form_input} />
                </div>

                <div className={styles.modal__content_fo}>
                  <p className={styles.modal__content_Name}>Категории</p>

                  <div className={styles.DropDownContainerSalary} >
                    <div className={styles.DropDownHeader} onClick={togglingSalary}>
                      {isOpenSalary ? <img src={ArrowTop} alt='Not find ArrowDownIcon' className={styles.Arrow} />
                        :
                        <img src={ArrowDown} className={styles.Arrow} alt='Not find ArrowTopIcon' />}
                      {selectSalaryCategory.text || "Еще не выбрано"}

                    </div >
                    {isOpenSalary && (
                      <div>
                        <DropDownListSalary className={styles.ListItemOdd}>
                          {user.categoryBouquet.map(option => (

                            <ListItemSmenaSalary onClick={() => onOptionClickedSalary(option)} key={Math.random()}>
                              {option.text}

                            </ListItemSmenaSalary >

                          ))}
                        </DropDownListSalary>

                      </div>
                    )}
                  </div>
                </div>


                <div className={styles.modal__content_fo}>

                  <Field value={values.name} type='text' name='name'
                    className={styles.modal__content_form_inputName} />

                  {errors.name && touched.name ? (
                    <div className={styles.errors} >{errors.name}</div>
                  ) : null}
                </div>

                <div className={styles.modal__content_fo}>

                  <textarea onChange={handleChange} name='description' id='description'
                    value={values.description} className={styles.form__input1} />
                </div>


                <div className={styles.switch}>
                  <p className={styles.texst}>Отметить как:</p>
                  <Field className={styles.switch_texst} name='selection' value='Не отмечать' id='NotСelebrate' type='radio' />
                  <label className={styles.switch__radio} htmlFor='NotСelebrate'>Не отмечать</label> <br />
                  <Field className={styles.switch_texst} name='selection' value='Рекомендации' type='radio' id='Recommendations' />
                  <label className={styles.switch__radio} htmlFor="Recommendations" > Рекомендации </label> <br />
                  <Field className={styles.switch_texst} value='Скидки 20%' name='selection' type='radio' id='Discounts20' />
                  <label className={styles.switch__radio} htmlFor="Discounts20" > Скидки 20% </label> <br />
                  <Field className={styles.switch_texst} name='selection' value='Популярные' type='radio' id='Popular' />
                  <label className={styles.switch__radio} htmlFor="Popular">Популярные </label> <br />
                  <Field className={styles.switch_texst} name='selection' value='Для любимой' type='radio' id='ForBeloved ' />
                  <label className={styles.switch__radio} htmlFor="ForBeloved">Для любимой</label><br />
                  <Field className={styles.switch_texst} name='selection' value='Рождение ребенка' type='radio' id='BirthChild' />
                  <label className={styles.switch__radio} htmlFor="BirthChild">Рождение ребенка</label><br />
                  <Field className={styles.switch_texst} name='selection' value='Для девушки' type='radio' id='ForGirl' />
                  <label className={styles.switch__radio} htmlFor="ForGirl">Для девушки </label> <br />
                  <Field className={styles.switch_texst} name='selection' value='Для коллеги' type='radio' id='ForColleague' />
                  <label className={styles.switch__radio} htmlFor="ForColleague">Для коллеги</label><br />
                  <Field className={styles.switch_texst} name='selection' value='Домашние' type='radio' id='Homemade' />
                  <label className={styles.switch__radio} htmlFor="Homemade">Домашние</label>

                </div>

                <div className={styles.actions}>
                  <button className={styles.actions__save} disabled={!(isValid && dirty)} type='submit'  >Сохранить</button><br />
                  <div className={styles.actions__button} >
                    <button className={styles.actions__operations} type='button'
                      onClick={() => Delete(values.id)} >Удалить</button>
                  </div>
                </div>


              </div>



            </Form>
          )}
        </Formik>

        <button className={styles.actions__operations1} type='button'
          onClick={() => setActive({ active: false, content: null })}   >Отмена </button>







      </div>

    </div>

  )
}
export default CatalogSection;