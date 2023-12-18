const TraditionalValidate=values=>{
    let errors={};
    if(!values.userName){
      errors.userName='username is required';
    }
    if(!values.email){
      errors.email='email is required';
    }
    if(!values.password){
      errors.password='password is required';
    }
    return errors

  }

  export default TraditionalValidate