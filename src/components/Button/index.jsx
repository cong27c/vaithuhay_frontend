import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Button.module.scss";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function Button({
  type = "button",
  size = "medium",
  children,
  className = "",
  icon,
  to = "",
  href = "",
  style,
  arrowButton = false,
  SubmitButton = false,
  draculaButton = false,
  discoverButton = false,
  tabButton = false,
  disabled = false,
  loading = false,
  onClick,
}) {
  let Component = type === "submit" ? "button" : type;
  const passProps = { type };

  if (to) {
    Component = Link;
    passProps.to = to;
  }
  if (href) {
    Component = "a";
    passProps.href = href;
  } else {
    passProps.type = type;
  }

  const handleClick = () => {
    if (disabled || loading) return;
    // logic
    if (onClick) {
      onClick();
    }
  };

  return (
    <Component
      {...passProps}
      className={clsx(styles.wrapper, className, styles[size], {
        [styles.arrowButton]: arrowButton,
        [styles.SubmitButton]: SubmitButton,
        [styles.draculaButton]: draculaButton,
        [styles.discoverButton]: discoverButton,
        [styles.tabButton]: tabButton,
        [styles.disabled]: disabled || loading,
      })}
      style={style}
      onClick={handleClick}
    >
      {loading ? (
        <FontAwesomeIcon icon={faSpinner} spin />
      ) : (
        <div>
          <span>{children}</span>
          {icon && <FontAwesomeIcon className={styles.icon} icon={icon} />}
        </div>
      )}
    </Component>
  );
}

Button.propTypes = {
  type: PropTypes.oneOf(["button", "div"]),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  to: PropTypes.string,
  href: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  icon: PropTypes.object,
  style: PropTypes.object,
  arrowButton: PropTypes.bool,
  SubmitButton: PropTypes.bool,
  draculaButton: PropTypes.bool,
  tabButton: PropTypes.bool,
  discoverButton: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
