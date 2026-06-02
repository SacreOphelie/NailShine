import React from "react";
import Link from 'next/link';

const Button = ({ text = "Bouton", url = "#" }) => {
	return (
		<Link href={url} className="button">
			{text}
		</Link>
	);
};

export default Button;
