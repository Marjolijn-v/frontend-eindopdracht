function Button( {title, type, onclick, disabled} ) {
    return (
        <button
            type={type}
            onClick={onclick}
            disabled={disabled}
        >
            {title}
        </button>
    );

}

export default Button;