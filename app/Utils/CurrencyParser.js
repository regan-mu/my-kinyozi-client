export default function CurrencyFormatter(amount) {
    const formattedAmount = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
    return formattedAmount;
}