export default function Input({label, type, value, checked, onChange, error = false, ...props})
{
    return(
        <div className="form-group">
            <label>{label}</label>
            <input
                type={type}
                value={value}
                checked={checked}
                onChange={onChange}
                className={error ? "input-error" : ""}
                {...props}
            />
        </div>
    )
}