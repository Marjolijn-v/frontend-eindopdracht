import './button.css'

function Button( {title, className, type, onclick, disabled} ) {
    return (
        <button
            className={className}
            type={type}
            onClick={onclick}
            disabled={disabled}
        >
            {title}
        </button>
    );

}

export default Button;