export const calculatePricing = (rule) => {
    return {
        charge: rule.charge,
        days: rule.days,
        installation: rule.installation
    };
};