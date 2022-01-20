import React from 'react'

type ButtonProps = {
	children: React.ReactNode
	onClick: (event: React.MouseEvent) => void
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
	return <button onClick={onClick}>{children}</button>
}

export default Button
