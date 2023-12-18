import * as yup from "yup";

const RegisterSchemaValidation=yup.object(
    {
     userName:yup.string().required('username is required').min(3,'must be at least 3 characters').max(30,'must be 30 characters or less'),
     email:yup.string().required('email is required').email(),
     password:yup.string().required('password is required').min(3,'must be at least 3 characters').max(30,'must be 30 characters or less'),
    }

);


const LoginSchemaValidation=yup.object(
    {
     email:yup.string().required('email is required').email(),
     password:yup.string().required('password is required').min(3,'must be at least 3 characters').max(30,'must be 30 characters or less'),
    }
  
  );

  const sendCodeSchemaValidation=yup.object(
    {
     email:yup.string().required('email is required').email(),
    }
  
  );

  const setPasswordSchemaValidation=yup.object(
    {
     email:yup.string().required('email is required').email(),
     password:yup.string().required('password is required').min(3,'must be at least 3 characters').max(30,'must be 30 characters or less'),
    code:yup.string().required('code is required').length(4,'must be 4 numbers')
    }
  
  );

  const createOrderSchemaValidation=yup.object(
    {
      couponName:yup.string().length(5,'coupon name should be 5 characters'),
      address:yup.string().required('address is required').min(3,'must be at least 3 characters').max(30,'must be 30 characters or less'),
      phone:yup.number().integer().required('phone is required')
    }
  
  );

  const createReviewSchemaValidation=yup.object(
    {
      comment:yup.string().required('comment is required').min(3,'must be at least 3 characters').max(30,'must be 30 characters or less'),
      rating:yup.number().required('rating is required')
    }
  
  );
export {RegisterSchemaValidation,LoginSchemaValidation,sendCodeSchemaValidation,setPasswordSchemaValidation,createOrderSchemaValidation,createReviewSchemaValidation} 


