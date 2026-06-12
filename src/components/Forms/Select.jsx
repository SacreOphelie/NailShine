"use client";

export default function Select({nomSelect, options, value,onChange})
{
    return(
        <div className="form-group">
            <select name={nomSelect} id={nomSelect} value={value} onChange={onChange}>
                {options?.map((option) =>(
                    <option key={option.id} value={option.id}>
                        {option.nom}
                    </option>
                ))}
            </select>
        </div>
    )
}