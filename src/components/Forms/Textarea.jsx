

export default function Textarea({placeholder, value, onChange, ...props})
{
    return(
        <div className="form-group">
            <textarea placeholder={placeholder} value={value} onChange={onChange} type="text" {...props}></textarea>
        </div>
    )
}