import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup'

const NewDish = () => {

  // Validation and read data on the form
  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      categoty: '',
      photo: '',
      description: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
               .min(3, 'The dish must have at least three caracters.')
               .required('Name is required'),
      price: Yup.number()
                .min(1, 'The dish must cost $1')
                .required('Price is required'),
      category: Yup.string()
                .required('Select a dish category'),
      description: Yup.string()
                .min(10, 'The Description should be longer')
                .required()
    }), 
    onSubmit: data => {
      console.log(data);
    }
  })
  return (
    <>
      <h1 className="text-3xl font-light mb-4">Add a dish</h1>
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-3xl">
          <form
            onSubmit={formik.handleSubmit}
          >
            {formik.touched.name && formik.errors.name 
              ? (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role='alert'>
                    <p className="font-bold">{formik.errors.name}</p>
                  </div>
                ) 
              : null
            }
            <div className="mb-4">
              <label 
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >Name</label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-none"
                type="text"
                id="name"
                placeholder="Name of dishe"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} 
              />
            </div>
            {formik.touched.price && formik.errors.price 
              ? (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role='alert'>
                    <p className="font-bold">{formik.errors.price}</p>
                  </div>
                ) 
              : null
            }
            <div className="mb-4">
              <label 
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="price"
              >Price</label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-none"
                type="number"
                id="price"
                placeholder="$20"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}  
              />
            </div>
            {formik.touched.category && formik.errors.category 
              ? (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role='alert'>
                    <p className="font-bold">{formik.errors.category}</p>
                  </div>
                ) 
              : null
            }
            <div className="mb-4">
              <label 
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="category"
              >Category</label>
              <select 
                name="category" 
                id="category" 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-none"
                value={formik.values.categoty}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur} 
              >
                <option value="">-- Select an option --</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Luch</option>
                <option value="dinner">Dinner</option>
                <option value="beverage">Beverage</option>
                <option value="dessert">Dessert</option>
                <option value="salad">Salad</option>
              </select>
            </div>
            <div className="mb-4">
              <label 
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="photo"
              >Photo</label>
              <input 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-none"
                type="file"
                id="photo"
                value={formik.values.photo}
                onChange={formik.handleChange} 
              />
            </div>
            {formik.touched.description && formik.errors.description 
              ? (
                  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role='alert'>
                    <p className="font-bold">{formik.errors.description}</p>
                  </div>
                ) 
              : null
            }
            <div className="mb-4">
              <label 
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >Description</label>
              <textarea 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-none h-40"
                id="description"
                placeholder="Write a description of the dish"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}  
              ></textarea>
            </div>
            <input 
              type="submit" 
              className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
              value="Add Dish" 
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default NewDish