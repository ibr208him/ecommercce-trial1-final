import React from 'react'

export default function Input({type,name,id,title,value,onChange,errors,onBlur,touched}) {
  console.log(touched);
  return (
    <div className='input-group mb-3'>
    <label className='me-2 fw-bold' htmlFor={id}>{title}</label>
    <input type={type} name={name} id={id} className='form-control' value={value} onChange={onChange} onBlur={onBlur}/>
    {touched[name]&&(errors[name]&&<p className='text-danger'>{errors[name]}</p>)}
    
    </div>

  )
}
