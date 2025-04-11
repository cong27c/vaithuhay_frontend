import PropsTypes from "prop-types";

function TextInput({ type = "text", name, register, message }) {
  return (
    <div>
      <input type={type} name={name} {...register} />
      {message && <p>{message}</p>}
    </div>
  );
}

TextInput.propTypes = {
  type: PropsTypes.string,
  name: PropsTypes.string.isRequired,
  message: PropsTypes.string,
  register: PropsTypes.object,
};

export default TextInput;
