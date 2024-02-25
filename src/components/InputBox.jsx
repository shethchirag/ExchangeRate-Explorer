import { useId } from "react";
import PropTypes from "prop-types";

function InputBox(props) {
  const amountInputId = useId();
  const selectFieldId = useId();
  const {
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectCurrency = "usd",
    className = "",
    amountDisable = false,
    currencyDisable = false,
  } = props;

  return (
    <div className={`${className}`}>
      <div className="InputDiv">
        <label htmlFor={amountInputId} className="styled-label">
          {label}
        </label>
        <input
          id={amountInputId}
          className="styled-input"
          type="number"
          disabled={amountDisable}
          value={amount !== 0 ? amount : ""}
          placeholder={amount !== 0 ? "" : "Enter Amount"}
          onChange={(e) =>
            onAmountChange && onAmountChange(Number(e.target.value))
          }
        />
      </div>
      <div className="InputDiv">
        <label htmlFor={selectFieldId} className="styled-label">
          Currency Type
        </label>
        <select
          id={selectFieldId}
          value={selectCurrency}
          className="styled-select"
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={currencyDisable}
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

InputBox.propTypes = {
  label: PropTypes.string,
  amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onAmountChange: PropTypes.func,
  onCurrencyChange: PropTypes.func,
  currencyOptions: PropTypes.array,
  selectCurrency: PropTypes.string,
  className: PropTypes.string,
  amountDisable: PropTypes.bool,
  currencyDisable: PropTypes.bool,
};

export default InputBox;
