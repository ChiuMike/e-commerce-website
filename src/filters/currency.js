export default function(num){
    const currency=new Intl.NumberFormat('en-US', { minimumFractionDigits: 0}).format(num)
    return currency;
}