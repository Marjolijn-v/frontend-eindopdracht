import './inputComponent.css'

function InputComponent({ inputId, inputLabel, inputType, accept, placeholder, inputName, validationRules, register, errors, className}) {
    return (
        <>
            <label htmlFor={inputId} className={inputType}>
                {inputLabel}
                <input
                    className={className}
                    type={inputType}
                    accept={accept}
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