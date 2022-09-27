import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import logo from '../../public/assets/images/35middle.png'
import { useState } from 'react';



function resetPassword() {
  const [input, setInput] = useState({
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState({
    password: '',
    confirmPassword: '',
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };

  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: '' };

      switch (name) {
          case 'password':
          if (!value) {
            stateObj[name] = 'Please enter New Password.';
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj['confirmPassword'] =
              'New Password and Confirm Password does not match.';
          } else {
            stateObj['confirmPassword'] = input.confirmPassword
              ? ''
              : error.confirmPassword;
          }
          break;

        case 'confirmPassword':
          if (!value) {
            stateObj[name] = 'Please enter Confirm Password.';
          } else if (input.password && value !== input.password) {
            stateObj[name] = 'New Password and Confirm Password does not match.';
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  return (
    <Main meta={<Meta title="35 Middle-app" description="reset password" />}>
      <div className='flex flex-col items-center justify-center m-20'>
      <img src={ logo } alt="35middle Logo" />
        <input 
          type="password" 
          name="password" 
          placeholder="New Password" 
          value={input.password}
          onChange={onInputChange}
          onBlur={validateInput}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          className="input input-bordered input-info w-full max-w-xs m-2 bg-gradient-to-r from-blue-200 to bule-100"></input>
          {error.password && <span className="err text-sm text-red-500">{error.password}</span>}

        <input 
          type="password" 
          name="confirmPassword" 
          placeholder="Confirm Password"  
          value={input.confirmPassword}
          onChange={onInputChange}
          onBlur={validateInput}
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
          className="input input-bordered input-info w-full max-w-xs m-2 bg-gradient-to-r from-blue-200 to bule-100"></input>
          {error.confirmPassword && (
            <span className="err text-sm text-red-500">{error.confirmPassword}</span>
          )}
      <button type="submit" className="btn btn-info mt-4">Submit</button>
        </div>
    </Main>
  );
}


export default resetPassword;