import './inputComponent.css'

function InputComponent({ inputId, inputLabel, inputType, placeholder, inputName, validationRules, register, errors, className}) {
    return (
        <>
            <label htmlFor={inputId}>
                {inputLabel}
                <input
                    className={className}
                    type={inputType}
                    id={inputId}
                    placeholder={placeholder}
                    {...register(inputName, validationRules)}
                />
                {errors[inputName] &&<p className="error-text">{errors[inputName].message}</p>}
            </label>
        </>
    );
}

export default InputComponent;