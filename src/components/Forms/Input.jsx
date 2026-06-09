import {useState} from "react";
import {Eye, EyeClosed} from 'lucide-react';

export default function Input({label, type, value, checked, onChange, error = false, ...props})
{
    const [passwordVisible, setPasswordVisible] = useState(false);

    const inputType = type === "password" && passwordVisible ? 'text' : type;
    return(
        <div className="form-group">
            <label>{label}</label>
            <input
                type={inputType}
                value={value}
                checked={checked}
                onChange={onChange}
                className={error ? "input-error" : ""}
                {...props}
            />
            {type === "password" && (
                <div className="eye-mdp" onClick={() => setPasswordVisible(!passwordVisible)}>
                    {passwordVisible ? <Eye size={20} /> :  <EyeClosed size={20} />}
                </div>
            )}
        </div>
    )
}