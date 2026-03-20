import './button.css'

function Button( {title, className, type, onClick, disabled} ) {
    return (
        <button
            className={className}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {title}
        </button>
    );

}

export default Button;