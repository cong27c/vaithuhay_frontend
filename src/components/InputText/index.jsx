import PropTypes from "prop-types";
import styles from "./InputText.module.scss";

function InputText({
  type = "",
  register = () => ({}),
  message = "",
  placeholder = "",
  autocomplete = "off",
  ...props
}) {
  return (
    <>
      <input
        type={type === "password_confirmation" ? "password" : type}
        {...register(type)}
        placeholder={placeholder}
        autoComplete={
          autocomplete || (type === "password" ? "new-password" : "off")
        }
        {...props}
      />
      {message && <p className={styles["error-message"]}>{message}</p>}
    </>
  );
}

InputText.propTypes = {
  type: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  message: PropTypes.string,
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
};
export default InputText;
