import React from "react";
import Link from 'next/link';

const Button = ({ text = "Bouton", url, className = "", type = "submit", onClick }) => {
	if(url)
	{
		return (
			<Link href={url} className={`button ${className}`}>
				{text}
			</Link>
		);
	}else{
		return(
			<button className={`button ${className}`} type={type} onClick={onClick}>
				{text}
			</button>
		)
	}
};

export default Button;
