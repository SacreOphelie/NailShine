/* eslint-disable @next/next/no-img-element */
"use client";

export default function Select({nomSelect, options, value,onChange,placeholder = "Sélectionnez une option"})
{
    return(
        <div className="form-group">
            <img src="icones/arrow_filter.png" alt="arrow" className="arrow-icon" />
            <select name={nomSelect} id={nomSelect} value={value} onChange={onChange}>
                <option value="" disabled hidden>
                    {placeholder}
                </option>
                {options?.map((option) =>(
                    <option key={option.id} value={option.id}>
                        {option.nom}
                    </option>
                ))}
            </select>
        </div>
    )
}