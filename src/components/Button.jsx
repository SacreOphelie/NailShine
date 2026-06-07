import React from "react";
import Link from 'next/link';

const Button = ({ text = "Bouton", url, className = "", type = "submit" }) => {
	if(url)
	{
		return (
			<Link href={url} className={`button ${className}`}>
				{text}
			</Link>
		);
	}else{
		return(
			<button className={`button ${className}`} type={type}>
				{text}
			</button>
		)
	}
};

export default Button;
