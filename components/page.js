import React from 'react'
import CircularJSON from 'circular-json'

function flaten(p){
	var np = Object.assign({}, p);
	delete np.children;
	return np
}

const Page = function({title, ...props}){return(
	<html lang="en">
	<head>
		<meta charSet="UTF-8"/>
		<title>{title}</title>
		<link rel="stylesheet" href="./css/main.css"/>
	</head>
	<body 
		data-component={props.children._owner._currentElement.type.name}
		data-props = {CircularJSON.stringify(flaten(arguments[0]))}
		>
		{props.children}
	</body>
	</html>	
)}

export default Page