function Button({onclick , children , className}) {
    return (
        <button onClick={onclick} className={className}>
            {children}
        </button>
    )
}

export default Button
