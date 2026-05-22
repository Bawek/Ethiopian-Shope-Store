import React from "react";
import Card from "./card";

const Base = (props) => {
	return (
		<div>
			<Card {...props} />
		</div>
	);
};

export default Base;
