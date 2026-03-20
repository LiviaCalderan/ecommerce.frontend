export const formatRevenue = (value) => {
    // BILLION
    if (value >= 1e9) {
        return (value / 1e9).toFixed(1) + " B"

    // MILLION
    } else if (value >= 1e6) {
        return (value / 1e6).toFixed(1) + " M"

    // THOUSAND
    } else if (value >= 1e3) {
        return (value / 1e3).toFixed(1) + " MIL"

    } else {
        return value;
    }

    
}