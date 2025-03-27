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
  arrowButton = false,
  dualButton = false,
  draculaButton = false,
  tabButton = false,
  disabled = false,
  loading = false,
  onClick,
}) {
  let Component = type;
  const passProps = {};

  if (to) {
    Component = Link;
    passProps.to = to;
  }
  if (href) {
    Component = "a";
    passProps.to = to;
  }

  const handleClick = () => {
    if (disabled || loading) return;
    // logic
    onClick();
  };

  return (
    <Component
      {...passProps}
      className={clsx(styles.wrapper, className, styles[size], {
        [styles.arrowButton]: arrowButton,
        [styles.dualButton]: dualButton,
        [styles.draculaButton]: draculaButton,
        [styles.tabButton]: tabButton,
        [styles.disabled]: disabled || loading,
      })}
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
  arrowButton: PropTypes.bool,
  dualButton: PropTypes.bool,
  draculaButton: PropTypes.bool,
  tabButton: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
