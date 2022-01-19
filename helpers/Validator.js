import parse from 'html-react-parser'
import moment from 'moment'
import swal from 'sweetalert'
export const LowerCase=/(.*[a-z].*)/ 
export const UpperCase=/(.*[A-Z].*)/
export const Digit=/(.*\d.*)/ 
export const Symbol=/(.*\W.*)/ 

export const PassErrors = {
    minLength: false,
    lowercase: false,
    uppercase: false,
    digit: false,
    symbol: false,
    confirm: false
}

export const PasswordValidator = (password, confirm, err, setErr )=>{

    if(password && confirm){
        setErr({
            ...err,
            minLength: password.toString().length >= 8,
            lowercase: LowerCase.test(password),
            uppercase: UpperCase.test(password),
            digit: Digit.test(password),
            symbol: Symbol.test(password),
            confirm: password.toString() === confirm.toString()
        })
    }
    else if(password){
        setErr({
            ...err,
            minLength: password.toString().length >= 8,
            lowercase: LowerCase.test(password),
            uppercase: UpperCase.test(password),
            digit: Digit.test(password),
            symbol: Symbol.test(password)
        })
    }
}

export const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)
export const parseHtml = body => parse(body)
export const firstNWord = (str, n) => str.split(' ').slice(0, n).join(' ')+'..'
export const dateFormat = date => moment(date).fromNow()
export const sweetSuccess = message => swal({
    title: message,
    icon: "success",
  });



