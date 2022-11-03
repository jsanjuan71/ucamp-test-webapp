
function MoneyNumber({amount}) {

    function format(number, symbol = "$") {
      const numberFormat = new Intl.NumberFormat('en-US');
      return symbol + numberFormat.format(number);
    }

    return (
      <span>{format(amount)}</span>
    );
}

export default MoneyNumber;