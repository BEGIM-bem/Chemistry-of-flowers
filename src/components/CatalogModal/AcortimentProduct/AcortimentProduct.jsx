
import { useState } from "react";
import styles from './styles/AcortimentProduct.module.css';
import { DropDownListSalary, ListItemSmenaSalary } from './styles/TabsCss';
import ArrowDown from './icons/ArrowDown.svg';
import ArrowTop from './icons/ArrowUp.svg';
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import { EditFlowers, DeleteFlowers } from '../../../Logica/api/Catalog'
import * as Yup from 'yup';
import image from './icons/image.jpg'
//Цветочки



function AcortimentProduct({ active, setActive, content }) {

  const [isOpenSalary, setIsOpenSalary] = useState(false);
  const [selectSalaryCategory, setSelectSalaryCategory] = useState(content.category);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)



  const togglingSalary = () => setIsOpenSalary(!isOpenSalary)
  const onOptionClickedSalary = value => () => {
    setSelectSalaryCategory(value)
    setIsOpenSalary(false)
  }
  const Delete = (id) => {
    dispatch(DeleteFlowers(id))
    setActive({ active: false, content: null })
  }
  const AddNewFilialsSchema = Yup.object().shape({
    name: Yup.string()
      .required('Обязательно'),
    grade: Yup.string()
      .required('Обязательно'),
    cost: Yup.string()
      .required('Обязательно'),
    quantity: Yup.string()
      .required('Обязательно'),

  })

  return (
    <div className={active ? styles.active : styles.modal}>
      <div className={styles.modal__content1}>

        <Formik
          initialValues={{
            id: content.id,
            image: content.image,
            name: content.name,
            grade: content.grade,
            cost: content.cost,
            quantity: content.quantity,
            category: content.category,
            shortDescription: content.shortDescription,
            description: content.description,
            date: content.date
          }}
          validationSchema={AddNewFilialsSchema}
          onSubmit={values => {
            values.date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-'
              + new Date().getDate()

            values.category = selectSalaryCategory.id

            dispatch(EditFlowers(values))
            setActive({ active: false, content: null })



          }}>
          {({ values, handleChange, errors, isValid, dirty, touched }) => (

            <Form>

              <div className={styles.modal__content_photo}>
                <img src={image} alt='Изображение отсутствует'
                  className={styles.modal__content_photoFlowers} />
              </div>


              <div className={styles.content} >
                <div className={styles.modal__content_fo}>
                  <p className={styles.modal__content_Name}>Название товара</p>
                  <Field
                    placeholder='Название' name='name' value={values.name} type='text'
                    className={styles.modal__content_form_input} />
                  {errors.name && touched.name ? (
                    <div className={styles.errors} >{errors.name}</div>
                  ) : null}
                </div>

                <div className={styles.modal__content_fo}>
                  <p className={styles.modal__content_Name}>Сорт товара</p>
                  <Field type='text' name='grade'
                    value={values.grade} className={styles.modal__content_form_input} />
                  {errors.grade && touched.grade ? (
                    <div className={styles.errors} >{errors.grade}</div>
                  ) : null}
                </div>

                <div className={styles.modal__content_fo}>
                  <p className={styles.modal__content_Name}>Цена</p>
                  <Field
                    value={values.cost} type='number' name='cost'
                    className={styles.modal__content_form_input} />
                  {errors.cost && touched.cost ? (
                    <div className={styles.errors} >{errors.cost}</div>
                  ) : null}
                </div>

                <div className={styles.modal__content_fo}>
                  <p className={styles.modal__content_Name}>Количество</p>
                  <Field type='number' name='quantity'
                    value={values.quantity} className={styles.modal__content_form_input} />
                  {errors.quantity && touched.quantity ? (
                    <div className={styles.errors} >{errors.quantity}</div>
                  ) : null}
                </div>

                <div className={styles.modal__content_fo}>
                  <p className={styles.modal__content_Name}>Категории</p>

                  <div name='category' className={styles.DropDownContainerSalary} >
                    <div name='category' className={styles.DropDownHeader} onClick={togglingSalary}>
                      {isOpenSalary ? <img src={ArrowTop} alt='Not find ArrowDownIcon' className={styles.Arrow} />

                        :
                        <img src={ArrowDown} className={styles.Arrow} alt='Not find ArrowTopIcon' />}
                      {selectSalaryCategory.text || "Роза"}
                    </div >
                    {isOpenSalary && (
                      <div>
                        <DropDownListSalary className={styles.ListItemOdd} >
                          {user.categoryFlowers.map(option => (

                            <ListItemSmenaSalary onClick={onOptionClickedSalary(option)} key={Math.random()}>
                              {option.text}

                            </ListItemSmenaSalary >

                          ))}
                        </DropDownListSalary>

                      </div>
                    )}
                  </div>
                </div>



                <div className={styles.modal__content_fo}>
                  <textarea name='description' id='description' onChange={handleChange}
                    value={values.description} className={styles.form__input2} />
                </div>

                <div className={styles.actions}>
                  <button className={styles.actions__save} type='submit' disabled={!(isValid && dirty)} >
                    Сохранить</button><br />
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
export default AcortimentProduct;