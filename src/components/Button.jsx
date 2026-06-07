import React from "react";
import Link from 'next/link';

const Button = ({ text = "Bouton", url = "#", className = "" }) => {
	return (
		<Link href={url} className={`button ${className}`}>
			{text}
		</Link>
	);
};

export default Button;
